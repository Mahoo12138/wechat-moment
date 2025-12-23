# 微信朋友圈截图生成器 - 技术架构文档

## 1. 架构设计

```mermaid
graph TD
    A[用户浏览器 (Desktop)] --> B[React SPA应用]
    B --> C[TanStack Router]
    B --> D[TanStack Query]
    B --> E[Shadcn UI组件库]
    B --> F[截图生成引擎]
    
    subgraph "前端层"
        B
        C
        D
        E
        F
    end
```

## 2. 技术栈描述

- 前端框架: React@18 + TypeScript
- 路由管理: @tanstack/react-router@1
- 状态管理: zustand (用于本地状态) + @tanstack/react-query@5 (如有异步需)
- UI组件库: shadcn/ui + tailwindcss@3
- 构建工具: Vite
- 截图功能: html2canvas
- 初始化工具: vite-init

## 3. 路由定义

| 路由 | 用途 |
|------|------|
| / | 欢迎页面，产品功能介绍 |
| /editor | 编辑生成页面，左侧实时预览，右侧配置表单 |

## 4. 核心组件架构

### 4.1 页面组件结构
- **WelcomePage**: 欢迎页，包含产品Hero Section，功能特性展示，开始使用按钮。
- **EditorPage**: 编辑页，采用左右分栏布局。
    - **LeftPanel**: 实时预览区域 (手机仿真器外壳)。
    - **RightPanel**: 配置表单区域 (Tabs分类配置)。

### 4.2 业务组件结构
- **PreviewDevice**: 手机外壳组件，包裹朋友圈内容。
- **MomentItem**: 朋友圈单条内容展示组件。
- **ConfigForm**: 配置表单容器。
    - **UserConfig**: 用户信息配置 (头像、昵称)。
    - **ContentConfig**: 内容配置 (文本、图片)。
    - **InteractionConfig**: 互动配置 (点赞、评论)。
    - **SystemConfig**: 系统状态栏配置 (时间、电量、信号)。
- **ScreenshotGenerator**: 截图生成控制组件。

## 5. 数据模型设计

### 5.1 朋友圈数据结构 (State)
```typescript
interface WeChatMomentState {
  user: {
    avatar: string;
    nickname: string;
  };
  moment: {
    text: string;
    images: string[]; // local urls
    time: string;
    location?: string;
    source?: string; // 来源，如"部分可见"
  };
  interactions: {
    likes: string[]; // list of nicknames
    comments: Comment[];
  };
  system: {
    time: string;
    batteryLevel: number;
    signalStrength: number;
    wifi: boolean;
  };
}

interface Comment {
  id: string;
  user: string;
  content: string;
  replyTo?: string;
}
```

## 6. 技术实现要点

### 6.1 实时预览
- 使用 Zustand 进行全局状态管理，右侧表单修改直接更新 Store，左侧组件订阅 Store 实现实时渲染。

### 6.2 截图生成
- 利用 html2canvas 对 PreviewDevice 内部的内容区域进行截图。
- 支持导出 PNG/JPG。

### 6.3 布局设计
- **Desktop Only**: 
    - 整体布局为全屏应用。
    - 左侧预览区固定宽度或比例，居中显示手机模拟器。
    - 右侧配置区可滚动，提供详细的表单项。

## 7. 项目目录结构

```
src/
├── components/
│   ├── ui/           # shadcn基础UI组件
│   ├── preview/      # 预览区组件
│   └── editor/       # 编辑区组件
├── pages/            # 路由页面 (Welcome, Editor)
├── store/            # Zustand store
├── hooks/            # 自定义Hooks
├── utils/            # 工具函数
├── types/            # TypeScript类型定义
├── assets/           # 静态资源
└── lib/              # 第三方库配置
```

## 8. 部署考虑
- 静态站点托管 (Vercel/Netlify/GitHub Pages)
