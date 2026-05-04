import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// --- パス解決のロジック ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PROJECT_ROOT = path.resolve(__dirname, '..');

// 読み込むJSONファイルの正確なパスを指定（bloglist.jsonを読み込む場合）
const BLOG_LIST_PATH = path.join(PROJECT_ROOT, 'src/data/bloglist.json');

// JSONファイルを読み込んでパースする
const blogData = JSON.parse(fs.readFileSync(BLOG_LIST_PATH, 'utf-8'));

function getNextNewstitle() {
    // 既存のslugを抽出（数値・文字列が混ざってもいいようにtoStringしておく）
    const nowslugs = blogData.blog.map((value) => value.slug.toString());
    
    let i = 1;
    while (true) {
        if (!nowslugs.includes(i.toString())) break;
        i++;
    }
    return i.toString();
}

// GitHub Actionsの出力用に標準出力へ書き出す
const nextSlug = getNextNewstitle();
console.log(`SLUG=${nextSlug}`);