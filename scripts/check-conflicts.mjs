import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const bad = ['<'.repeat(7), '='.repeat(7), '>'.repeat(7)];
const skipDirectories = new Set(['node_modules', '.next', '.git']);
const findings = [];

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });

  await Promise.all(entries.map(async (entry) => {
    const fullPath = path.join(directory, entry.name);

    if (entry.isDirectory()) {
      if (!skipDirectories.has(entry.name)) {
        await walk(fullPath);
      }
      return;
    }

    if (!entry.isFile()) {
      return;
    }

    let contents;
    try {
      contents = await readFile(fullPath, 'utf8');
    } catch {
      return;
    }

    const lines = contents.split(/\r?\n/);
    lines.forEach((line, index) => {
      if (bad.some((marker) => line.includes(marker))) {
        findings.push(`${fullPath}:${index + 1}`);
      }
    });
  }));
}

await walk(process.cwd());

if (findings.length > 0) {
  console.error('Merge conflict markers found:');
  findings.forEach((finding) => console.error(`- ${finding}`));
  process.exit(1);
}

console.log('No merge conflict markers found.');
