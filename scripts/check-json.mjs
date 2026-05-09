import { readFile } from 'node:fs/promises';

const files = [
  'package.json',
  'tsconfig.json',
  '.eslintrc.json',
  'config/laguna-athletics.json'
];

for (const file of files) {
  try {
    JSON.parse(await readFile(file, 'utf8'));
    console.log(`Valid JSON: ${file}`);
  } catch (error) {
    console.error(`Invalid JSON: ${file}`);
    console.error(error instanceof Error ? error.message : String(error));
    process.exit(1);
  }
}
