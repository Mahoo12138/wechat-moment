# WeChat Moment Generator (朋友圈截图生成器)

基于 React + Tailwind CSS 构建的高保真微信朋友圈截图生成工具。
支持像素级还原 iOS 微信 UI，实时预览，高度可配置。

## ✨ 功能特性 (Features)

*   **📷 像素级还原**: 精确模拟 iOS 微信朋友圈界面，包括字体（PingFang SC）、颜色、图标和布局细节。
*   **📱 多设备支持**: 内置 iPhone 14/15/16/17 全系列机型尺寸与分辨率适配。
*   **⚡ 实时预览**: 左侧/中心实时展示效果，右侧/底部抽屉便捷配置，所见即所得。
*   **🎨 高度客制化**:
    *   **用户信息**: 自定义昵称、头像（支持上传）。
    *   **正文内容**: 支持纯文本、多图九宫格（1-9张）、发布时间、定位、来源（如“部分可见”）。
    *   **互动区**:
        *   **点赞**: 支持添加多个点赞头像（自动堆叠）。
        *   **评论**: 支持添加多条评论，包含头像、昵称、回复内容，支持嵌套回复样式。
    *   **系统状态栏**: 可调节时间、电量百分比、信号强度、WiFi 开关，图标动态变化。
*   **💻📱 响应式设计**:
    *   **桌面端**: 左右分栏布局，高效操作。
    *   **移动端**: 预览为主，底部抽屉式配置面板，随时随地修改。
*   **🖼️ 图片导出**: 一键生成高清截图 (基于 html2canvas)。

## 🛠 技术栈 (Tech Stack)

*   **核心框架**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) + [Vite](https://vitejs.dev/)
*   **样式方案**: [Tailwind CSS](https://tailwindcss.com/) + Custom Config
*   **UI 组件库**: [shadcn/ui](https://ui.shadcn.com/) (Radix UI)
*   **状态管理**: [Zustand](https://github.com/pmndrs/zustand)
*   **图标库**: [Lucide React](https://lucide.dev/) + Custom SVG Components
*   **截图生成**: [html2canvas](https://html2canvas.hertzen.com/)
*   **移动端交互**: [Vaul](https://github.com/emilkowalski/vaul) (Drawer Component)

## 🚀 快速开始 (Getting Started)

1.  **克隆项目**
    ```bash
    git clone https://github.com/mahoo12138/wechat-moment.git
    cd wechat-moment
    ```

2.  **安装依赖**
    ```bash
    pnpm install
    # 或者 npm install / yarn install
    ```

3.  **启动开发服务器**
    ```bash
    pnpm dev
    ```
    打开浏览器访问 `http://localhost:5173` 即可看到应用。

4.  **构建生产版本**
    ```bash
    pnpm build
    ```

## 📂 目录结构

```text
src/
├── assets/          # 静态资源 (字体, 图标, 默认头像)
├── components/
│   ├── editor/      # 编辑器配置组件 (表单, 输入框等)
│   ├── preview/     # 预览区组件 (模拟手机壳, 朋友圈条目, 状态栏)
│   ├── icons/       # 自定义 SVG 图标组件 (电池, 信号等)
│   └── ui/          # Shadcn UI 基础组件
├── constants/       # 常量定义 (设备尺寸数据等)
├── store/           # Zustand 全局状态管理
├── types/           # TypeScript 类型定义
└── pages/           # 页面组件 (EditorPage)
```

## 📝 待办事项 / 计划

- [x] 基础 UI 搭建与还原
- [x] 状态栏图标动态组件化
- [x] 评论/点赞头像支持上传
- [x] 移动端适配 (Drawer)
- [ ] 支持更多主题 (深色模式完善)
- [ ] 视频内容模拟支持
- [ ] 导出长图功能

---

*本项目仅供学习交流使用，请勿用于非法用途。*
