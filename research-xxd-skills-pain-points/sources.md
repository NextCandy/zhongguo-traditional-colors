# 来源索引

| 来源 | 类型 | URL | 支撑的判断 | 可信度/限制 |
| --- | --- | --- | --- | --- |
| Nielsen Norman Group - Mood Boards in UX | 实战方法 | https://www.nngroup.com/articles/mood-boards/ | `xxd-color-brief` 需要先把模糊视觉语言转成共同方向，再进入选色。 | 高；偏 UX 方法，不是中国传统色专门资料。 |
| Atlassian Design System - Color | 一手规范 | https://atlassian.design/foundations/color/ | UI 用色应围绕角色、层级、状态和可读性，而不是无序 swatches。 | 高；产品 UI 适用性强。 |
| Atlassian Design Tokens | 一手规范 | https://atlassian.design/tokens/design-tokens/ | `xxd-ui-token` 要输出语义 token，而不是只交付 HEX。 | 高；偏产品系统。 |
| Design Tokens Format Module | 一手规范 | https://tr.designtokens.org/format/ | token 要考虑跨工具、跨平台结构，不应混合原始色和组件状态。 | 高；规范仍需结合具体工具落地。 |
| Figma Variables Guide | 一手文档 | https://help.figma.com/hc/en-us/articles/15339657135383-Guide-to-variables-in-Figma | Figma 变量和 modes 支撑浅深色模式与设计系统交付。 | 高；Figma 生态适用。 |
| W3C WCAG Contrast Minimum | 一手规范 | https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html | `xxd-accessible-color` 必须给出对比度阈值和 ratio，而不是凭感觉判断。 | 高；可访问性核心来源。 |
| W3C WCAG Use of Color | 一手规范 | https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html | 状态、选择、错误、图表不能只靠颜色传递信息。 | 高；适用 UI 和图表。 |
| ColorBrewer - Scheme Types | 一手工具说明 | https://colorbrewer2.org/learnmore/schemes.html | `xxd-data-viz` 要区分分类、顺序、发散，而不是复用海报配色。 | 高；地图/图表色经典来源。 |
| IBM Carbon Data Visualization Color Palettes | 一手规范 | https://carbondesignsystem.com/data-visualization/color-palettes/ | 图表色要考虑系列区分、背景、可读性和高亮。 | 高；偏企业产品和数据界面。 |
| Pantone - Understanding Different Color Spaces | 一手文档 | https://www.pantone.com/articles/color-fundamentals/understanding-different-color-spaces | `xxd-print-packaging` 不能承诺 HEX 等于印刷效果，必须考虑 RGB、CMYK、spot/Pantone 与设备色空间差异。 | 高；生产环节仍需打印方参数和实物打样。 |
