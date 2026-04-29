<template>
  <section id="news" class="news">
    <h2>News</h2>
    <ul class="news_content">
      <li
        v-for="(value, index) in filteringnews(pagenate)"
        :key="index"
        class="news_item"
      >
        <span class="date">{{ value.date }}</span>
        <a v-if="value.link" :href="value.link" target="_blank" class="content">
          {{ value.content }}
        </a>
        <span v-if="!value.link" class="content">{{ value.content }}</span>
      </li>
    </ul>
    <div class="pagebtns">
      <button @click="pagenate = 1" :class="pagenate == 1 ? 'active' : ''">
        1
      </button>
      <button @click="pagenate = 2" :class="pagenate == 2 ? 'active' : ''">
        2
      </button>
      <button @click="pagenate = 3" :class="pagenate == 3 ? 'active' : ''">
        3
      </button>
      <button @click="pagenate = 4" :class="pagenate == 4 ? 'active' : ''">
        4
      </button>
    </div>
  </section>
</template>
<script setup lang="ts">
import type { NewsType } from "../../types";
import { ref } from "vue";
import newsData from "../../data/news.json";
const props = defineProps<{ max: number }>();
const max_news = props.max;

const pagenate = ref<number>(1);
const maxpage = Math.ceil(newsData.length / max_news);

function filteringnews(page: number): NewsType[] {
  return newsData.filter(
    (_value, index) =>
      max_news * (pagenate.value - 1) <= index &&
      index < max_news * pagenate.value,
  );
}
</script>
<style scoped>
.news {
  max-width: 60%;
  font-family: sans-serif;
  margin: 52px auto 60px auto;
  h2 {
    font-size: 36px;
    font-weight: bold;
    text-align: center;
    padding-top: 24px;
    margin-bottom: 0;
  }
}
.news_item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid rgb(238, 238, 238);
  font-size: 19px;
  .date {
    font-size: 0.9em;
    color: rgb(136, 136, 136);
    font-weight: bold;
    min-width: 100px;
  }
  .content {
    font-size: 1em;
    color: rgb(51, 51, 51);
    line-height: 1.4;
  }
}
.pagebtns {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  button {
    font-size: 18px;
    padding: 10px 12px;
    cursor: pointer;
    border: 1px solid #ccc;
    background: #fff;
  }
  .active {
    background: #000;
    color: #fff;
    border-color: #000;
  }
}
@media screen and (max-width: 720px) {
  .news {
    max-width: 95%;
  }
  .news_item {
    font-size: 16px;
  }
  .pagebtns button {
    font-size: 16px;
  }
}
</style>
