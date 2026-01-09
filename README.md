# TypeScript Substring Searcher

Recursively searches all files in a folder and its subfolders for a given substring and reports:
- filename
- line number
- matching line text

## Requirements
- Node.js 18+
- npm

## Install

```bash
npm install
```

## Run (with ts-node)

```bash
npx ts-node src/index.ts <folder> <substring>
```

example:

```bash
npx ts-node src/index.ts ../../Desktop/Fanlified/frontend/src/components/ "react-router"
```

## Build to JavaScript

```bash
npm run build
node dist/index.js <folder> <substring>
```

## Notes

- Node types are included via `@types/node` and `tsconfig.json` (`types: ["node"]`), fixing earlier compile errors.
- Binary and image files are skipped by extension pattern.
- Output is plain text and script is safe to commit to git.

## Git

Initialize and push:

```bash
git init
git add .
git commit -m "feat: substring searcher tool"
git branch -M main
git remote add origin <YOUR_REPO_URL>
git push -u origin main
```
