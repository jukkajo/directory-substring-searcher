import * as fs from 'fs';
import * as path from 'path';

interface MatchResult {
  file: string;
  line: number;
  text: string;
}

function searchFile(filePath: string, term: string): MatchResult[] {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const results: MatchResult[] = [];

  lines.forEach((line: string, index: number) => {
    if (line.includes(term)) {
      results.push({
        file: filePath,
        line: index + 1,
        text: line.trim()
      });
    }
  });

  return results;
}

function walk(dir: string, term: string, acc: MatchResult[] = []): MatchResult[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath, term, acc);
    } else if (entry.isFile()) {
      // Only scan text-like files
      if (!/(png|jpg|jpeg|gif|webp|ico|pdf)$/i.test(entry.name)) {
        acc.push(...searchFile(fullPath, term));
      }
    }
  }
  return acc;
}

function main(): void {
  const root = process.argv[2] || '.';
  const term = process.argv[3];

  if (!term) {
    console.error('Usage: npx ts-node src/index.ts <folder> <substring>');
    process.exit(1);
  }

  const results = walk(root, term);

  if (results.length === 0) {
    console.log('No matches found.');
    return;
  }

  for (const r of results) {
    console.log(`FILE: ${r.file}`);
    console.log(`LINE: ${r.line}`);
    console.log(`MATCH: ${r.text}`);
    console.log('---');
  }
}

main();
