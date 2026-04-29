import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

// パスの設定
const BLOG_DIR = path.resolve('../src/content/blog');
const OUTPUT_FILE = path.resolve('../src/data/bloglist.json'); // publicに置くとURLでアクセス可能

function generateBlogJson() {
  // 1. ディレクトリ内のファイル一覧を取得
  const files = fs.readdirSync(BLOG_DIR).filter(file => file.endsWith('.md') || file.endsWith('.mdx'));

  // 2. 各ファイルを解析してデータを取り出す
  const blogList = files.map(file => {
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content); // フロントマターの解析

    return {
      slug: file.replace(/\.mdx?$/, ''),
      title: data.title || 'Untitled',
      description: data.description || 'No description',
      created: data.created,
      updated: data.updated || undefined,
      tag:data.tag??undefined
      // 必要に応じてタグや画像パスなどを追加
    };
  });
  const tags=[];
  for(let file of files){
    const filePath = path.join(BLOG_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content); // フロントマターの解析

    if(!data.tag)continue;
    for(let tag of data.tag){
      if(!tags.includes(tag))tags.push(tag);
    }
  }

  // 3. 日付順にソート（新しい順）
  blogList.reverse().sort((a, b) => new Date(b.created) - new Date(a.created));

  const result={blog:blogList,tags:tags};

  // 4. JSONとして書き出し
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(result, null, 2));

  console.log(`✅ Success: ${blogList.length} posts saved to ${OUTPUT_FILE}`);
}

generateBlogJson();