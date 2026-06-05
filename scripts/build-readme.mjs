import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const manifestPath = path.join(root, "assets/data/images.js");
const readmePath = path.join(root, "README.md");
const columns = 4;

async function loadManifest() {
  const source = await fs.readFile(manifestPath, "utf8");
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(source, sandbox, { filename: manifestPath });
  return {
    project: sandbox.window.TRADITIONAL_COLOR_PROJECT,
    images: sandbox.window.TRADITIONAL_COLOR_IMAGES,
  };
}

function galleryRows(images) {
  const rows = [];

  for (let index = 0; index < images.length; index += columns) {
    const rowImages = images.slice(index, index + columns);
    const links = rowImages
      .map((image) => {
        const thumb = `thumbnails/color-card-${image.id}.jpg`;
        const alt = `Traditional Color ${image.id}`;
        return `  <a href="${image.path}"><img src="${thumb}" width="180" alt="${alt}"></a>`;
      })
      .join("\n");

    rows.push(`<p align="center">\n${links}\n</p>`);
  }

  return rows.join("\n\n");
}

function renderReadme(project, images) {
  const totalMb = Math.round(project.totalBytes / 1024 / 1024);

  return `# 中国传统配色

一个用于展示、学习和复用中华传统色的开放图片项目。当前仓库收录 ${project.count} 张传统色色卡图片，每张色卡包含色名、HEX、RGB、CMYK、配色推荐和气质关键词；README 使用轻量缩略图完整展示，点击任意缩略图可打开高清 PNG 原图。

## 在线访问

- [GitHub Pages 在线浏览](https://nevertoday.github.io/zhongguo-traditional-colors/)
- [完整图片包 Release 下载](https://github.com/nevertoday/zhongguo-traditional-colors/releases/tag/v0.1.0)

## 下载

- [下载全部高清图片 ZIP](https://github.com/nevertoday/zhongguo-traditional-colors/releases/latest/download/${project.archiveName})
- 单张高清图：点击下方任意缩略图即可打开对应 PNG。

> 原图约 ${totalMb}MB，ZIP 文件作为 GitHub Release 附件提供，不直接提交进仓库。

## 项目定位

中国传统色不只是一组漂亮色值，也连接着器物、织染、矿物颜料、诗词意象、节气物候和审美秩序。本项目希望把这些资料整理成一个可以直接浏览、下载、引用和二次开发的公共色彩资料馆。

适合用于：

- 设计灵感、品牌配色、界面主题和视觉实验。
- 传统文化、色彩教育、美术教学和内容创作。
- 前端项目、素材站、颜色工具和开放数据整理。
- 色名、色值、配色关系和视觉语气的持续校勘。

## 项目结构

\`\`\`text
images/       高清 PNG 原图，共 ${project.count} 张
thumbnails/   README 预览缩略图，共 ${project.count} 张
docs/         README 使用的项目说明图片
assets/       静态站点样式、脚本和图片清单
scripts/      图片清单、README 和打包脚本
downloads/    本地生成的下载压缩包，不建议提交到 Git
\`\`\`

## 快速开始

\`\`\`bash
npm run manifest
npm run readme
npm run start
\`\`\`

然后访问：

\`\`\`text
http://localhost:5173
\`\`\`

也可以直接部署到 GitHub Pages。为了让浏览器端 ZIP 打包正常读取图片，请通过本地服务器或线上静态站访问，不建议直接用 \`file://\` 打开。

## 更新图片清单

新增、删除或替换 \`images/\` 中的图片后，运行：

\`\`\`bash
npm run manifest
npm run readme
\`\`\`

这会重新生成 \`assets/data/images.js\` 和 README 预览图廊。新增图片时请同时补充对应 \`thumbnails/\` 缩略图。

## 预览

<!-- gallery:start -->
${galleryRows(images)}

<!-- gallery:end -->

## 支持作者

这个传统色图片合集会继续保持免费开源。如果它帮你节省了整理、参考和使用传统色卡的时间，也愿意支持后续维护，可以扫描下面的 Buy Me a Coffee 二维码请作者喝杯咖啡。完全自愿；反馈、Star 和 issue 同样有帮助。

<img src="docs/images/buy-me-a-coffee-qr.png" alt="Buy Me a Coffee 支持二维码" width="220">

## 联系作者

可以通过作者 X 主页联系：[@xiaoxiaodong01](https://x.com/xiaoxiaodong01)。

## 贡献

欢迎提交 Issue 或 Pull Request。新增色卡、修正色值、补充来源、优化页面和完善文档都很有价值。开始前请阅读 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可

本项目使用 [MIT License](LICENSE) 开源。

请注意：传统色色值在不同资料、屏幕、印刷和材质中可能存在差异。本项目提供的是开放整理和学习资料，实际生产使用前应结合媒介校验。
`;
}

const { project, images } = await loadManifest();
await fs.writeFile(readmePath, renderReadme(project, images), "utf8");
