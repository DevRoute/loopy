import fs from 'fs';
import path from 'path';
import ImageKit from 'imagekit';
import sharp from 'sharp'; // 导入sharp库
import https from 'https'; // 用于下载图片
import http from 'http'; // 用于下载图片
import { execSync } from 'child_process'; // 用于执行Git命令

// 1. 配置ImageKit（建议使用环境变量）
const imagekit = new ImageKit({
  publicKey: 'public_h9ZFPjgNpRdmG8c991K3HiBQ++',
  privateKey: 'private_AKV7fPUpZPp2ajjSeTWpXI85iYU=',
  urlEndpoint: 'https://ik.imagekit.io/moment',
});

// 2. 配置参数
// 移除这里的rootDir声明，因为我们在下面重新定义了

// 显示帮助信息
function showHelp() {
  console.log(`
使用方法: node scripts/replace-image-urls.mjs [选项]

选项:
  --force         强制替换所有图片（包括已经在ImageKit上的）
  --replace-all   替换所有图片（与--force相同）
  --path <目录>   指定要处理的目录路径（默认处理Git变更的文件）
  --file <文件>   指定要处理的单个文件
  --untracked     包含未跟踪的文件
  --help          显示此帮助信息

示例:
  node scripts/replace-image-urls.mjs                      # 处理Git变更的Markdown文件
  node scripts/replace-image-urls.mjs --force              # 处理Git变更的Markdown文件，强制替换所有图片
  node scripts/replace-image-urls.mjs --path ./content     # 处理content目录下的所有Markdown文件
  node scripts/replace-image-urls.mjs --untracked          # 处理Git变更的文件，包括未跟踪的文件
  node scripts/replace-image-urls.mjs --file ./content/zh/javascript/ot.mdx  # 处理指定的文件
`);
  process.exit(0);
}

// 解析命令行参数
const args = process.argv.slice(2);
const forceReplace = args.includes('--force'); // 是否强制替换所有图片
const replaceAll = args.includes('--replace-all'); // 是否替换所有图片（包括已经在ImageKit上的）
const showHelpFlag = args.includes('--help'); // 是否显示帮助信息
const includeUntracked = args.includes('--untracked'); // 是否包含未跟踪的文件

// 获取指定路径参数
let rootDir = null;
const pathIndex = args.indexOf('--path');
if (pathIndex !== -1 && pathIndex + 1 < args.length) {
  rootDir = args[pathIndex + 1];
}

// 获取指定文件参数
let specificFile = null;
const fileIndex = args.indexOf('--file');
if (fileIndex !== -1 && fileIndex + 1 < args.length) {
  specificFile = args[fileIndex + 1];
}

// 显示帮助信息
if (showHelpFlag) {
  showHelp();
}

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.webp'];
const mdFileExtensions = ['.md', '.markdown', '.mdx'];
const MAX_RETRIES = 3; // 最大重试次数
const RETRY_DELAY = 1000; // 重试延迟（毫秒）
const TIMEOUT = 60000; // 请求超时时间（毫秒）- 增加到60秒

// 添加URL缓存，避免重复上传相同的图片
const urlCache = new Map();

// 检查URL是否来自ImageKit
function isImageKitUrl(url) {
  return url.includes('ik.imagekit.io/moment');
}

// 3. 递归获取所有Markdown文件
function getMarkdownFiles(dir, fileList = []) {
  try {
    const stat = fs.statSync(dir);

    // 如果是文件且是markdown文件，直接添加
    if (stat.isFile()) {
      if (mdFileExtensions.includes(path.extname(dir).toLowerCase())) {
        fileList.push(dir);
      }
      return fileList;
    }

    // 如果是目录，则遍历目录内容
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
      const filePath = path.join(dir, file);
      const fileStat = fs.statSync(filePath);

      if (fileStat.isDirectory()) {
        getMarkdownFiles(filePath, fileList);
      } else if (mdFileExtensions.includes(path.extname(file).toLowerCase())) {
        fileList.push(filePath);
      }
    });

    return fileList;
  } catch (error) {
    console.error(`Error processing path ${dir}:`, error.message);
    return fileList;
  }
}

// 4. 解析Markdown中的图片
function parseImages(content, filePath) {
  const imageRegex = /!\[.*?\]\((.*?)\)/g;
  const images = [];
  let match;

  while ((match = imageRegex.exec(content)) !== null) {
    const imagePath = match[1];

    if (/^(http|\/\/)/.test(imagePath)) {
      // 处理网络图片
      images.push({
        isRemote: true,
        url: imagePath.startsWith('//') ? 'https:' + imagePath : imagePath,
        replaceToken: match[0],
      });
    } else {
      // 处理本地图片
      const absolutePath = path.resolve(path.dirname(filePath), imagePath);

      if (
        fs.existsSync(absolutePath) &&
        allowedExtensions.includes(path.extname(absolutePath).toLowerCase())
      ) {
        images.push({
          isRemote: false,
          original: imagePath,
          absolute: absolutePath,
          replaceToken: match[0],
        });
      }
    }
  }

  return images;
}

// 5. 上传图片到ImageKit
async function uploadToImageKit(filePath, originalPath, isBuffer = false, fileName = null) {
  try {
    let file;

    // 使用sharp将图片转换为webp格式
    if (isBuffer) {
      // 如果是buffer（远程图片），使用sharp转换为webp
      file = await sharp(filePath).webp().toBuffer();
      // 确保文件名以.webp结尾
      if (fileName) {
        const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.')) || fileName;
        fileName = `${nameWithoutExt}.webp`;
      } else {
        fileName = `image-${Date.now()}.webp`;
      }
    } else {
      // 如果是本地文件，也使用sharp转换为webp
      file = await sharp(filePath).webp().toBuffer();
      const extension = path.extname(filePath);
      const nameWithoutExt = path.basename(filePath, extension);
      fileName = `${nameWithoutExt}.webp`;
    }

    const folderPath = isBuffer
      ? '/md-images/remote'
      : '/md-images/' + path.dirname(originalPath).replace(process.cwd(), '');

    const response = await imagekit.upload({
      file: file,
      fileName: fileName,
      folder: folderPath,
    });

    return response.url;
  } catch (error) {
    console.error(`上传失败: ${fileName || filePath}`, error);
    return null;
  }
}

// 6. 下载网络图片（带重试机制）
async function downloadImage(url, retries = 0) {
  try {
    // 直接使用原始 URL，不再使用替代服务
    console.log(`尝试下载: ${url}`);

    // 使用 Node.js 原生 HTTPS/HTTP 下载
    return await downloadWithHttp(url);
  } catch (error) {
    console.error(`下载图片失败: ${url}`, error);

    // 实现重试逻辑
    if (retries < MAX_RETRIES) {
      console.log(`重试下载 (${retries + 1}/${MAX_RETRIES}): ${url}`);
      await sleep(RETRY_DELAY);

      return downloadImage(url, retries + 1);
    }

    // 所有方法都失败
    console.log(`所有下载尝试都失败: ${url}`);

    return null;
  }
}

// 下载图片（支持 HTTP 和 HTTPS）
async function downloadWithHttp(url) {
  return new Promise((resolve, reject) => {
    const parsedUrl = new URL(url);
    const protocol = parsedUrl.protocol === 'https:' ? https : http;

    // 创建临时文件流来接收数据
    const tempFilePath = path.join(process.cwd(), `.temp-${Date.now()}`);
    const file = fs.createWriteStream(tempFilePath);

    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        Accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
        'Cache-Control': 'no-cache',
        Referer: 'https://github.com/',
      },
      timeout: TIMEOUT,
      rejectUnauthorized: false,
    };

    protocol
      .get(options, (response) => {
        if (response.statusCode !== 200) {
          console.error(`下载失败，状态码: ${response.statusCode}`);
          file.close();
          fs.unlink(tempFilePath, () => {});
          reject(`下载失败，状态码: ${response.statusCode}`);

          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close(() => {
            // 文件下载完成后，读取文件内容到 buffer
            fs.readFile(tempFilePath, (err, buffer) => {
              // 删除临时文件
              fs.unlink(tempFilePath, () => {});

              if (err || buffer.length === 0) {
                console.error('读取下载文件失败或文件为空');
                reject('下载失败');

                return;
              }

              console.log(`下载成功，大小: ${buffer.length} 字节`);

              // 从响应头或URL推断文件扩展名
              let extension = '.jpg'; // 默认扩展名
              const contentType = response.headers['content-type'];

              // 根据内容类型确定扩展名
              if (contentType) {
                if (contentType.includes('png')) extension = '.png';
                else if (contentType.includes('gif')) extension = '.gif';
                else if (contentType.includes('webp')) extension = '.webp';
                else if (contentType.includes('jpeg') || contentType.includes('jpg'))
                  extension = '.jpg';
              } else {
                // 尝试从URL推断扩展名
                const urlExt = path.extname(parsedUrl.pathname).toLowerCase();

                if (urlExt && allowedExtensions.includes(urlExt)) {
                  extension = urlExt;
                }
              }

              const fileName = `image-${Date.now()}${extension}`;
              resolve({ buffer, fileName });
            });
          });
        });
      })
      .on('error', (err) => {
        console.error(`下载错误: ${err.message}`);
        file.close();
        fs.unlink(tempFilePath, () => {});
        reject(`下载错误: ${err.message}`);
      })
      .on('timeout', () => {
        console.error('下载超时');
        file.close();
        fs.unlink(tempFilePath, () => {});
        reject('下载超时');
      });
  });
}

// 修改 sleep 函数的实现
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 获取Git变更的Markdown文件
function getGitChangedMarkdownFiles() {
  try {
    // 获取Git变更的文件列表
    const gitOutput = execSync('git diff --name-only HEAD').toString().trim();
    const stagedOutput = execSync('git diff --name-only --staged').toString().trim();

    let untrackedOutput = '';
    if (includeUntracked) {
      // 如果包含未跟踪的文件，则获取未跟踪的文件列表
      untrackedOutput = execSync('git ls-files --others --exclude-standard').toString().trim();
    }

    // 合并变更、暂存和未跟踪的文件列表
    const changedFiles = [
      ...new Set([
        ...gitOutput.split('\n').filter(Boolean),
        ...stagedOutput.split('\n').filter(Boolean),
        ...untrackedOutput.split('\n').filter(Boolean),
      ]),
    ];

    // 过滤出Markdown文件
    return changedFiles.filter(
      (file) =>
        file && mdFileExtensions.includes(path.extname(file).toLowerCase()) && fs.existsSync(file),
    );
  } catch (error) {
    console.error('获取Git变更文件失败:', error.message);
    return [];
  }
}

// 7. 主流程
async function main() {
  console.log('开始处理图片替换...');

  let mdFiles;

  if (specificFile) {
    // 如果指定了文件，则只处理该文件
    console.log(`处理指定文件: ${specificFile}`);
    if (
      fs.existsSync(specificFile) &&
      mdFileExtensions.includes(path.extname(specificFile).toLowerCase())
    ) {
      mdFiles = [specificFile];
    } else {
      console.log(`指定的文件不存在或不是Markdown文件: ${specificFile}`);
      return { totalFiles: 0, processedFiles: 0 };
    }
  } else if (rootDir) {
    // 如果指定了目录，则处理该目录下的所有Markdown文件
    console.log(`指定目录: ${rootDir}`);
    mdFiles = getMarkdownFiles(rootDir);
  } else {
    // 否则处理Git变更的文件
    console.log('处理Git变更的文件');
    if (includeUntracked) {
      console.log('包含未跟踪的文件');
    }
    mdFiles = getGitChangedMarkdownFiles();
  }

  console.log(`强制替换: ${forceReplace || replaceAll ? '是' : '否'}`);
  console.log(`找到的Markdown文件: ${mdFiles.length}个`);

  if (mdFiles.length === 0) {
    console.log('没有找到需要处理的Markdown文件');
    return { totalFiles: 0, processedFiles: 0 };
  }

  // 统计信息
  const stats = {
    totalFiles: mdFiles.length,
    processedFiles: 0,
    totalImages: 0,
    uploadedImages: 0,
    failedImages: 0,
    skippedImages: 0,
    cachedImages: 0,
    alreadyOnImageKit: 0,
  };

  for (const filePath of mdFiles) {
    console.log(`处理文件: ${filePath}`);

    let content = fs.readFileSync(filePath, 'utf8');
    const images = parseImages(content, filePath);
    console.log(`在文件 ${filePath} 中找到 ${images.length} 张图片`);

    stats.totalImages += images.length;

    const replacements = [];

    // 上传所有图片
    for (const image of images) {
      let imageUrl;

      if (image.isRemote) {
        // 检查URL是否已经是ImageKit的URL
        if (isImageKitUrl(image.url) && !forceReplace && !replaceAll) {
          console.log(`图片已在ImageKit上，跳过: ${image.url}`);
          stats.alreadyOnImageKit++;
          continue;
        }

        // 检查缓存中是否已有此URL的上传结果
        if (urlCache.has(image.url)) {
          imageUrl = urlCache.get(image.url);
          console.log(`使用缓存的URL: ${image.url} -> ${imageUrl}`);
          stats.cachedImages++;
        } else {
          // 处理网络图片
          console.log(`下载网络图片: ${image.url}`);

          const downloadResult = await downloadImage(image.url);

          if (downloadResult) {
            imageUrl = await uploadToImageKit(
              downloadResult.buffer,
              filePath,
              true,
              downloadResult.fileName,
            );

            if (imageUrl) {
              console.log(`已下载并重新上传: ${image.url} -> ${imageUrl}`);
              stats.uploadedImages++;
              // 缓存结果
              urlCache.set(image.url, imageUrl);
            } else {
              console.log(`下载成功但上传失败: ${image.url}`);
              stats.failedImages++;
            }
          } else {
            console.log(`无法下载图片，保留原始URL: ${image.url}`);
            stats.skippedImages++;
            // 如果下载失败，保留原始URL
            continue;
          }
        }
      } else {
        // 检查缓存中是否已有此本地图片的上传结果
        const cacheKey = `local:${image.absolute}`;

        if (urlCache.has(cacheKey)) {
          imageUrl = urlCache.get(cacheKey);
          console.log(`使用缓存的本地图片URL: ${image.absolute} -> ${imageUrl}`);
          stats.cachedImages++;
        } else {
          // 处理本地图片
          imageUrl = await uploadToImageKit(image.absolute, filePath);

          if (imageUrl) {
            console.log(`已上传本地图片: ${image.absolute} -> ${imageUrl}`);
            stats.uploadedImages++;
            // 缓存结果
            urlCache.set(cacheKey, imageUrl);
          } else {
            console.log(`上传本地图片失败: ${image.absolute}`);
            stats.failedImages++;
          }
        }
      }

      if (imageUrl) {
        replacements.push({
          original: image.replaceToken,
          new: `![](${imageUrl})`,
        });
      }
    }

    // 替换内容
    if (replacements.length > 0) {
      replacements.forEach((r) => {
        content = content.split(r.original).join(r.new);
      });

      // 写回文件
      fs.writeFileSync(filePath, content);
      console.log(`已更新文件: ${filePath}`);
    }

    stats.processedFiles++;
  }

  // 打印执行成功的总结
  console.log('\n========== 执行完成 ==========');
  console.log(`处理文件数: ${stats.processedFiles}/${stats.totalFiles}`);
  console.log(`处理图片总数: ${stats.totalImages}`);
  console.log(`成功上传图片: ${stats.uploadedImages}`);
  console.log(`使用缓存图片: ${stats.cachedImages}`);
  console.log(`已在ImageKit上的图片: ${stats.alreadyOnImageKit}`);
  console.log(`上传失败图片: ${stats.failedImages}`);
  console.log(`跳过的图片: ${stats.skippedImages}`);
  console.log('==============================\n');

  return stats;
}

main()
  .then((stats) => {
    console.log('程序执行成功!', stats);
    process.exit(0);
  })
  .catch((error) => {
    console.error('程序执行出错:', error);
    process.exit(1);
  });
