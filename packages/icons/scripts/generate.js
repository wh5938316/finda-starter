import { transform as svgrTransform } from '@svgr/core';
import camelcase from 'camelcase';
import { deleteAsync } from 'del';
import { mkdir, readdir, readFile, writeFile } from 'fs/promises';
import path from 'path';
import { defaultTemplate } from './template.js';

const transform = async (svg, componentName) => {
  let component = await svgrTransform(
    svg,
    {
      plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
      icon: true,
      typescript: true,
      dimensions: false,
      template: defaultTemplate,
      expandProps: false,
    },
    { componentName },
  );
  return component;
};

async function getIcons() {
  let files = await readdir(`./icons`);

  return Promise.all(
    files
      .filter((file) => path.extname(file) === '.svg')
      .map(async (file) => ({
        svg: await readFile(`./icons/${file}`, 'utf8'),
        componentName: `${camelcase(file.replace(/\.svg$/, ''), {
          pascalCase: true,
        })}Icon`,
      })),
  );
}

async function buildIcons() {
  let indexOutDir = `./src`;
  let outDir = `./src/icons`;

  await mkdir(outDir, { recursive: true });

  let icons = await getIcons();
  let components = icons.map((item) => item.componentName);

  let exportContent = components
    .map((componentName) => `import ${componentName} from "./icons/${componentName}";`)
    .join('\n');
  exportContent += '\n';
  exportContent += `export {${components.join(', ')}}`;

  await Promise.all(
    icons.flatMap(async ({ componentName, svg }) => {
      let content = await transform(svg, componentName);

      return [
        writeFile(`${outDir}/${componentName}.tsx`, content, 'utf8'),
        writeFile(`${indexOutDir}/index.tsx`, exportContent, 'utf8'),
      ];
    }),
  );
}

function main() {
  console.log(`Building icons...`);

  Promise.all([deleteAsync('./src/icons/*'), deleteAsync('./src/index.tsx')])
    .then(() => Promise.all([buildIcons()]))
    .then(() => console.log(`Finished building package.`));
}

main();
