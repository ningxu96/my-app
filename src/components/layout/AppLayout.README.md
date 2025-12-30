# AppLayout 组件文档

## 📋 概述

`AppLayout` 是一个基于 Figma 设计的通用布局组件，适用于 Next.js 16 App Router + TypeScript + Ant Design 技术栈。

## 🎨 设计对应关系

### Figma 节点到组件的映射

| Figma 区域 | 组件部分 | 说明 |
|-----------|---------|------|
| 左侧主导航栏 (宽 60px) | `<Sider>` (第一层) | 深色主题，包含 Logo 和主菜单图标 |
| 左侧二级导航 (宽 176px) | `<Sider>` (第二层) | 浅色主题，显示当前模块的子菜单 |
| 顶部工具栏 (高 48px) | `<Header>` | 包含公告、搜索、工具图标和用户信息 |
| 主内容区 | `<Content>` | 渲染 `children`，背景色 #f5f5f5 |
| 右下角客服按钮 | 浮动按钮 | 固定定位，渐变背景 |

## 📦 组件结构

```
AppLayout
├── 左侧主导航 Sider (60px)
│   ├── Logo 区域
│   └── 主菜单 (首页、任务、学员等)
├── 左侧二级导航 Sider (176px)
│   ├── 模块标题
│   ├── 二级菜单
│   └── 收起按钮
├── Layout (主容器)
│   ├── Header (顶部工具栏)
│   │   ├── 左侧公告
│   │   └── 右侧工具栏
│   │       ├── 搜索框
│   │       ├── 消息通知
│   │       ├── 工具图标
│   │       └── 用户头像
│   └── Content (内容区)
│       └── {children}
└── 右下角客服按钮
```

## 🚀 使用方法

### 1. 基本使用

```tsx
import AppLayout from "@/components/layout/AppLayout";

export default function MyPage() {
  return (
    <AppLayout>
      <div style={{ padding: "20px" }}>
        <h1>页面标题</h1>
        <p>页面内容...</p>
      </div>
    </AppLayout>
  );
}
```

### 2. 全局布局（推荐）

在 `app/layout.tsx` 中使用：

```tsx
import AppLayout from "@/components/layout/AppLayout";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <AntdRegistry>
          <AppLayout>{children}</AppLayout>
        </AntdRegistry>
      </body>
    </html>
  );
}
```

### 3. 特定页面使用

在某个具体页面中使用：

```tsx
// app/students/exam-management/page.tsx
import AppLayout from "@/components/layout/AppLayout";
import ExamList from "@/components/exam/ExamList";

export default function ExamManagementPage() {
  return (
    <AppLayout>
      <ExamList />
    </AppLayout>
  );
}
```

## 🎯 核心特性

### ✅ 已实现功能

1. **三栏布局**
   - 60px 主导航 + 176px 二级导航 + 内容区
   - 二级导航支持收起/展开

2. **顶部工具栏**
   - 公告区域
   - 搜索框
   - 消息通知（带徽标）
   - 工具图标组
   - 用户头像下拉菜单

3. **左侧导航**
   - 主导航：9 个菜单项（首页、任务、线索等）
   - 二级导航：5 个菜单项（辅导班管理、考试管理等）
   - 支持选中状态高亮

4. **响应式设计**
   - 固定定位的侧边栏
   - 粘性定位的顶部栏
   - 自适应内容区

5. **客服按钮**
   - 右下角浮动
   - 渐变背景
   - 悬停动画

### ⚙️ 可配置项

组件内部提供了以下可定制的常量：

```tsx
// 主导航菜单项
const primaryMenuItems = [...];

// 二级导航菜单项
const secondaryMenuItems = [...];

// 用户下拉菜单
const userMenuItems = [...];
```

## 🔧 自定义指南

### 修改菜单项

在 `AppLayout.tsx` 中找到对应的菜单配置：

```tsx
const primaryMenuItems: MenuProps["items"] = [
  {
    key: "home",
    icon: <HomeOutlined />,
    label: "首页",
  },
  // 添加或修改菜单项
];
```

### 修改主题色

Figma 设计中的主题色为 `#2266FF`，已应用在：
- 用户头像背景
- 选中菜单项（通过 Ant Design 主题继承）

如需全局修改主题，在 `ConfigProvider` 中配置：

```tsx
import { ConfigProvider } from "antd";

<ConfigProvider
  theme={{
    token: {
      colorPrimary: "#2266FF",
    },
  }}
>
  <AppLayout>{children}</AppLayout>
</ConfigProvider>
```

### 添加路由跳转

在事件处理函数中添加路由跳转逻辑：

```tsx
import { useRouter } from "next/navigation";

const router = useRouter();

const handlePrimaryMenuClick: MenuProps["onClick"] = ({ key }) => {
  setSelectedPrimaryKey(key);
  
  // 根据 key 进行路由跳转
  const routes: Record<string, string> = {
    home: "/",
    students: "/students",
    tasks: "/tasks",
    // ...
  };
  
  if (routes[key]) {
    router.push(routes[key]);
  }
};
```

### 连接用户状态

将用户信息从外部传入：

```tsx
export interface AppLayoutProps {
  children: React.ReactNode;
  user?: {
    name: string;
    avatar?: string;
  };
}

const AppLayout: React.FC<AppLayoutProps> = ({ children, user }) => {
  // 使用 user 数据渲染头像和用户名
};
```

## 📐 布局尺寸

| 元素 | 尺寸 | 说明 |
|-----|------|------|
| 主导航宽度 | 60px | 固定宽度 |
| 二级导航宽度 | 176px | 可收起 |
| 顶部栏高度 | 48px | 固定高度 |
| 内容区左边距 | 236px | 60 + 176 |
| 内容区背景 | #f5f5f5 | 浅灰色 |

## 🎨 颜色规范

| 用途 | 颜色值 | 说明 |
|-----|--------|------|
| 主题色 | #2266FF | 按钮、选中状态 |
| 主导航背景 | #001529 | Ant Design 深色主题 |
| 二级导航背景 | #FFFFFF | 白色 |
| 内容区背景 | #F5F5F5 | 浅灰 |
| 边框色 | #F0F0F0 | 分割线 |
| 文本主色 | rgba(0,0,0,0.85) | 标准黑 |
| 文本辅色 | rgba(0,0,0,0.65) | 次要文字 |

## 📝 TypeScript 类型

```tsx
export interface AppLayoutProps {
  children: React.ReactNode;
}
```

## 🔌 依赖要求

```json
{
  "dependencies": {
    "react": "^18.0.0",
    "next": "^14.0.0 || ^15.0.0 || ^16.0.0",
    "antd": "^5.0.0",
    "@ant-design/icons": "^5.0.0"
  }
}
```

## ⚠️ 注意事项

1. **SSR 友好**
   - 组件使用 `"use client"` 指令
   - 不直接操作 `window` 或 `document`
   - 可安全用于 Next.js App Router

2. **样式隔离**
   - 使用内联样式，避免全局 CSS 污染
   - 如需提取样式，建议使用 CSS Modules

3. **性能优化**
   - 菜单配置为常量，避免重复创建
   - 状态管理使用 `useState`，可升级为全局状态

4. **扩展性**
   - 菜单配置可提取到外部文件
   - 支持通过 props 传入自定义配置

## 🐛 常见问题

### Q: 如何隐藏二级导航？

A: 可以通过条件渲染控制：

```tsx
{showSecondaryNav && (
  <Sider>
    {/* 二级导航内容 */}
  </Sider>
)}
```

### Q: 如何修改内容区的内边距？

A: 在使用组件时添加自定义样式：

```tsx
<AppLayout>
  <div style={{ padding: "24px" }}>
    {/* 内容 */}
  </div>
</AppLayout>
```

### Q: 如何集成权限控制？

A: 在菜单配置中添加权限判断：

```tsx
const primaryMenuItems = menuConfig.filter(item => 
  hasPermission(item.permission)
);
```

## 📄 License

MIT
