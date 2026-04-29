import { defineConfig } from "astro/config";

import vue from "@astrojs/vue";

export default defineConfig({
  // GitHub Pagesでリポジトリ名がURLに入る場合に必要
  site: "https://robot-cs.github.io",
  base:"/robot-cs_lp",


  integrations: [vue()],
});