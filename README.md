# KGR 关键词分析工具

一个用于分析关键词竞争度的实用工具，基于KGR (Keyword Golden Ratio) 方法论进行分析。

## 📝 项目简介

KGR分析工具帮助SEO从业者和内容创作者快速评估关键词的竞争程度。通过计算 allintitle 搜索结果数与月搜索量的比率，为关键词选择提供数据支持。

### 🎯 核心功能

- KGR值计算：`KGR = allintitle搜索结果数 / 月搜索量`
- 竞争度评估标准：
  - KGR < 0.25：建议操作 🟢
  - KGR 0.25-1.00：可以尝试 🔵
  - KGR > 1.00：竞争较大 🟡

## 🚀 快速开始

### 安装依赖

```bash
npm install
# 或
yarn install
```

### 运行项目

```bash
npm run dev
# 或
yarn dev
```

### 构建项目

```bash
npm run build
# 或
yarn build
```

## 💻 使用指南

1. 输入要分析的关键词
2. 填入 Google 搜索中 allintitle: 的结果数量
3. 填入关键词的月搜索量
4. 系统将自动计算 KGR 值并给出竞争度分析

## 🛠 技术栈

- React
- Tailwind CSS
- shadcn/ui 组件库
- Recharts (可视化)

## 📋 项目结构

```
src/
├── components/
│   └── KGRCalculator/
│       ├── index.jsx
│       └── styles.css
├── utils/
│   └── calculations.js
└── App.jsx
```

## 🎨 特性

- 实时计算和反馈
- 直观的视觉指示
- 响应式设计
- 专业的竞争度分析

## 🌟 使用场景

1. **新词分析**：
   - 评估新出现关键词的竞争程度
   - 发现早期机会

2. **蓝海词发现**：
   - 识别高搜索量但低竞争的关键词
   - 挖掘潜在价值词

## 🔄 未来规划

- [ ] 添加批量分析功能
- [ ] 集成数据导出功能
- [ ] 添加历史记录功能
- [ ] 增加趋势分析图表

## 📈 应用优势

1. 快速评估关键词价值
2. 发现市场机会
3. 优化内容策略
4. 提高SEO效率

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request 来帮助改进项目。

## 📄 许可证

MIT License

## 🙏 致谢

感谢所有为这个项目提供建议和反馈的用户。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- Issue 提交
- Pull Request
- Email: [your-email@example.com]

## ⚠️ 免责声明

本工具仅供参考，具体关键词策略还需结合实际情况综合考虑。搜索结果数据可能会随时间变化，请以实际查询结果为准。
