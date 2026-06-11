import { readFileSync } from 'node:fs';

const pages = ['index.html', 'style-lab.html', 'palettes.html', 'skills.html'];
const expectedNavLabels = ['浏览色卡', '场景试色', '配色灵感', 'Skills', '下载 ZIP', '怎么用'];
const oldPaletteChrome = [
  'palette-header',
  'palette-brand',
  'palette-nav',
  'palette-tools',
  'palette-menu-toggle',
];

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

function innerHtml(source, selector) {
  const match = source.match(selector);
  return match?.[1] || '';
}

function navLabels(source) {
  const nav = innerHtml(source, /<nav class="site-nav" id="site-nav"[^>]*>([\s\S]*?)<\/nav>/);
  return [...nav.matchAll(/<a\b[^>]*>([\s\S]*?)<\/a>/g)]
    .map((match) => match[1].replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
}

for (const page of pages) {
  const source = readFileSync(page, 'utf8');

  if (!source.includes('<header class="site-header">')) {
    fail(`${page}: missing site-header`);
  }
  if (!source.includes('class="site-nav" id="site-nav"')) {
    fail(`${page}: missing shared site-nav`);
  }
  if (!source.includes('<footer class="site-footer">')) {
    fail(`${page}: missing site-footer`);
  }
  if (!source.includes('data-theme-label')) {
    fail(`${page}: missing shared theme label`);
  }
  if ((source.match(/data-footer-color/g) || []).length !== 12) {
    fail(`${page}: footer spectrum should have 12 color buttons`);
  }

  const labels = navLabels(source);
  if (labels.join('|') !== expectedNavLabels.join('|')) {
    fail(`${page}: nav labels differ: ${labels.join(' / ')}`);
  }

  if (page === 'palettes.html') {
    for (const token of oldPaletteChrome) {
      if (source.includes(token)) fail(`${page}: still contains old ${token}`);
    }
  }
}

if (!process.exitCode) {
  console.log(`Shared chrome verified for ${pages.length} pages.`);
}
