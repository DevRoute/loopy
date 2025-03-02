import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { execSync } from 'child_process';
import https from 'https';

// 获取当前文件的目录
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 图片的 URL - 尝试不同的格式
const originalUrl =
  'https://raw.githubusercontent.com/xun082/md/main/blogs.images20250210155102.png';
const possibleUrls = [
  originalUrl,
  originalUrl.replace(/blogs\.images(\d+)\.png/, 'blogs.images/$1.png'),
  // 尝试不同的日期格式
  'https://raw.githubusercontent.com/xun082/md/main/blogs.images/2025-02-10-152511.png',
  'https://raw.githubusercontent.com/xun082/md/main/blogs.images/202502101525.png',
  // 尝试不同的文件夹
  'https://raw.githubusercontent.com/xun082/md/main/images/20250210152511.png',
  'https://raw.githubusercontent.com/xun082/md/main/assets/20250210152511.png',
  // 尝试不同的分支
  'https://raw.githubusercontent.com/xun082/md/master/blogs.images/20250210152511.png',
];

// 本地保存路径
const savePath = path.join(__dirname, 'downloaded_image.png');

// 使用 Node.js 原生 HTTPS 下载
async function downloadWithHttps(url, savePath) {
  return new Promise((resolve) => {
    console.log(`尝试使用 HTTPS 下载: ${url}`);

    const file = fs.createWriteStream(savePath);

    https
      .get(
        url,
        {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            Accept: 'image/webp,image/apng,image/*,*/*;q=0.8',
            'Cache-Control': 'no-cache',
          },
          timeout: 30000,
          rejectUnauthorized: false,
        },
        (response) => {
          if (response.statusCode === 200) {
            response.pipe(file);

            file.on('finish', () => {
              file.close();
              console.log(`HTTPS 下载成功: ${url}`);
              resolve(true);
            });
          } else {
            console.log(`HTTPS 下载失败，状态码: ${response.statusCode}`);
            file.close();
            fs.unlink(savePath, () => {});
            resolve(false);
          }
        },
      )
      .on('error', (err) => {
        console.error(`HTTPS 下载错误: ${err.message}`);
        file.close();
        fs.unlink(savePath, () => {});
        resolve(false);
      })
      .on('timeout', () => {
        console.error('HTTPS 下载超时');
        file.close();
        fs.unlink(savePath, () => {});
        resolve(false);
      });
  });
}

// 使用 curl 下载
async function downloadWithCurl(url, savePath) {
  try {
    console.log(`尝试使用 curl 下载: ${url}`);

    execSync(
      `curl -L -s -S -o "${savePath}" --connect-timeout 30 --max-time 60 --retry 3 --retry-delay 2 "${url}"`,
      { timeout: 60000 },
    );

    if (fs.existsSync(savePath)) {
      const stats = fs.statSync(savePath);
      if (stats.size > 0) {
        console.log(`curl 下载成功，文件大小: ${stats.size} 字节`);
        return true;
      }
    }
    return false;
  } catch (error) {
    console.error('curl 下载失败:', error.message);
    return false;
  }
}

// 使用 GitHub API 下载
async function downloadWithGitHubAPI(url, savePath) {
  try {
    // 解析 GitHub URL
    const match = url.match(/raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)\/([^\/]+)\/(.+)/);
    if (!match) return false;

    const [, owner, repo, branch, filePath] = match;
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}?ref=${branch}`;

    console.log(`尝试使用 GitHub API 下载: ${apiUrl}`);

    const response = await axios.get(apiUrl, {
      headers: {
        Accept: 'application/vnd.github.v3.raw',
        'User-Agent': 'Mozilla/5.0',
      },
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(savePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => {
        console.log('GitHub API 下载成功');
        resolve(true);
      });
      writer.on('error', (err) => {
        console.error('保存文件失败:', err);
        reject(err);
      });
    });
  } catch (error) {
    console.error('GitHub API 下载失败:', error.message);
    return false;
  }
}

// 主函数
async function main() {
  try {
    console.log('开始尝试下载图片...');

    // 尝试所有可能的 URL
    for (const url of possibleUrls) {
      console.log(`\n尝试 URL: ${url}`);

      // 方法 1: 使用 Node.js HTTPS
      const httpsSuccess = await downloadWithHttps(url, savePath);
      if (httpsSuccess) {
        console.log(`成功使用 HTTPS 下载图片到: ${savePath}`);
        return;
      }

      // 方法 2: 使用 curl
      const curlSuccess = await downloadWithCurl(url, savePath);
      if (curlSuccess) {
        console.log(`成功使用 curl 下载图片到: ${savePath}`);
        return;
      }

      // 方法 3: 使用 GitHub API
      const apiSuccess = await downloadWithGitHubAPI(url, savePath);
      if (apiSuccess) {
        console.log(`成功使用 GitHub API 下载图片到: ${savePath}`);
        return;
      }
    }

    console.error('所有下载方法和 URL 都失败');

    // 最后的备用方案：尝试直接从仓库克隆
    console.log('\n尝试克隆整个仓库...');
    const tempDir = path.join(__dirname, 'temp_repo');

    try {
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }

      execSync(`git clone --depth 1 https://github.com/xun082/md.git "${tempDir}"`, {
        stdio: 'inherit',
        timeout: 120000,
      });

      // 尝试查找图片
      const possiblePaths = [
        path.join(tempDir, 'blogs.images', '20250210152511.png'),
        path.join(tempDir, 'blogs.images20250210152511.png'),
        // 可以添加更多可能的路径
      ];

      for (const imgPath of possiblePaths) {
        if (fs.existsSync(imgPath)) {
          console.log(`在仓库中找到图片: ${imgPath}`);
          fs.copyFileSync(imgPath, savePath);
          console.log(`已复制图片到: ${savePath}`);
          return;
        }
      }

      console.error('在克隆的仓库中未找到图片');
    } catch (error) {
      console.error('克隆仓库失败:', error.message);
    } finally {
      // 清理临时目录
      if (fs.existsSync(tempDir)) {
        fs.rmSync(tempDir, { recursive: true, force: true });
      }
    }
  } catch (error) {
    console.error('主程序出错:', error);
  }
}

// 调用主函数
main();
