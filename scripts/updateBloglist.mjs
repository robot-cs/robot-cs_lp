import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';

// --- パス解決のロジックを修正 ---
// 1. このスクリプトファイル自体の絶対パスを取得
const __filename = fileURLToPath(import.meta.url);
// 2. scripts フォルダのパスを取得
const __dirname = path.dirname(__filename);
// 3. プロジェクトのルート（scriptsの一つ上）を特定
const PROJECT_ROOT = path.resolve(__dirname, '..');

// 全てのパスを PROJECT_ROOT を起点に結合する
const BLOG_DIR = path.join(PROJECT_ROOT, 'src/content/blog');
const OUTPUT_FILE = path.join(PROJECT_ROOT, 'src/data/bloglist.json');
// --------------------------------

function generateBlogJson() {
  // ディレクトリが存在するかチェック（防御策）
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`❌ Error: Directory not found: ${BLOG_DIR}`);
    process.exit(1);
  }

  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

  const blogList = files.map(file => {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);

    return {
      slug: file.replace(/\.mdx?$/, ''),
      title: data.title || 'Untitled',
      description: data.description || 'No description',
      created: data.created,
      updated: data.updated || undefined,
      tag: data.tag ?? undefined
    };
  });

  const tags = [];
  // タグの収集（blogList作成時に一緒にやると効率的ですが、一旦ロジックは維持）
  for (const file of files) {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);

    if (!data.tag || !Array.isArray(data.tag)) continue;
    for (const tag of data.tag) {
      if (!tags.includes(tag)) tags.push(tag);
    }
  }

  // 日付順にソート（新しい順）
  blogList.sort((a, b) => new Date(b.created) - new Date(a.created));

  const result = { blog: blogList, tags: tags };

  // 出力先ディレクトリがない場合は作成
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));

  console.log(`✅ Success: ${blogList.length} posts saved to ${OUTPUT_FILE}`);
}

generateBlogJson();