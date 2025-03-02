# 极简用户访问跟踪系统

这个系统用于跟踪用户的来源网站和访问情况，采用极简设计，只在用户离开页面时记录数据，不返回任何业务数据给前端。

## 功能特点

- 跟踪用户来源网站（referrer）
- 按天记录唯一IP访问（同一IP每天只记录一次）
- 轻量级实现，对性能几乎无影响
- 无响应设计，接口只接收数据不返回内容
- 高峰期优化，使用内存缓冲区减少数据库访问频率

## 技术实现

系统由以下几个部分组成：

1. **客户端跟踪**：

   - `SimpleTracker` 组件：在应用中初始化跟踪功能
   - `simpleTracker.ts`：处理跟踪逻辑，只在用户离开页面时发送请求
   - 优先使用 `navigator.sendBeacon` API 发送数据

2. **服务器端API**：

   - `/api/track`：纯粹的数据接收接口
     - 同一IP每天只记录一次
     - 保存来源网站信息
     - 返回 204 状态码（无内容）
     - 使用内存缓冲区批量处理访问记录

3. **数据存储**：
   - 使用MySQL数据库存储访问数据
   - 表结构在 `schema.sql` 中定义

## 高峰期优化

系统采用了以下策略来处理高峰期的大量访问：

1. **内存缓冲区**：

   - 访问记录先存储在内存中，而不是立即写入数据库
   - 当累积到一定数量（默认50条）或经过一定时间（默认60秒）时，批量写入数据库
   - 大幅减少数据库连接次数和写入操作

2. **内存IP过滤**：

   - 使用内存中的Map和Set结构记录已访问的IP
   - 按天记录，避免重复写入数据库
   - 定期清理过期记录，避免内存泄漏

3. **优雅退出处理**：
   - 在服务关闭前确保缓冲区中的数据被保存到数据库
   - 监听SIGTERM和SIGINT信号，处理进程退出

## 使用方法

### 1. 设置数据库

执行 `src/lib/schema.sql` 中的SQL语句创建必要的表：

```sql
-- 创建访问记录表
CREATE TABLE IF NOT EXISTS visits (
  id INT AUTO_INCREMENT PRIMARY KEY,
  visitor_id VARCHAR(255) NOT NULL,
  referrer VARCHAR(1024) DEFAULT '',
  ip_address VARCHAR(45) NOT NULL,
  timestamp DATETIME NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. 在应用中添加跟踪组件

在应用的根组件（如 `layout.tsx` 或 `app.tsx`）中添加 `SimpleTracker` 组件：

```tsx
import SimpleTracker from '@/components/SimpleTracker';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <SimpleTracker />
      </body>
    </html>
  );
}
```

## 数据说明

系统会收集以下数据：

- **visitorId**：随机生成的访客唯一标识
- **referrer**：用户来源网站
- **ipAddress**：用户IP地址
- **timestamp**：访问时间

## 工作原理

1. 用户访问页面，但不立即记录数据
2. 用户离开页面时（关闭页面或切换到其他页面），发送一次请求记录访问数据
3. 服务器将访问记录添加到内存缓冲区，并检查该IP今天是否已经记录过
4. 当缓冲区达到阈值或定时器触发时，批量将数据写入数据库
5. 接口不返回任何业务数据，只返回 204 状态码（无内容）

## 配置选项

可以根据实际需求调整以下配置：

- `BUFFER_SIZE`：缓冲区大小，默认为50条记录
- `FLUSH_INTERVAL`：刷新间隔，默认为60000毫秒（1分钟）
