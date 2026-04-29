<template>
  <h1>Blog</h1>
  <section class="search"></section>
  <section class="posts">
    <a
      v-for="(value, index) in optimizedPosts"
      :key="index"
      class="post"
      :href="useLink(blogURL + value.id)"
      :id="`blog-${value.id}`"
    >
      <p class="date">
        {{ dateToStr(value.data.updated ?? value.data.created) }}
        <span v-if="value.data.updated" set:html="{penIcon.html}" />}
      </p>
      <h3>{value.data.title}</h3>
      <div class="tags" v-if="value.data.tag">
        <span class="tag" v-for="(tag, idx) in value.data.tag" :key="idx">{{
          tag
        }}</span
        >)}
      </div>
    </a>
    )) }
  </section>
</template>
<script setup lang="ts">
import { getCollection } from "astro:content";
import { useLink } from "../../utils/link";
import { icon, library } from "@fortawesome/fontawesome-svg-core";
import { faPen } from "@fortawesome/free-solid-svg-icons";
library.add(faPen);
const penIcon = icon(faPen);

const blogURL = "blog/";

const allPosts = await getCollection("blog");
let optimizedPosts = allPosts;

function dateToStr(date: Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const isThisyear = y === new Date().getFullYear();

  return `${isThisyear ? "" : y + "/"}${m}/${d}`;
}
</script>
<style scoped>
.posts {
  max-width: 720px;
  margin: 24px auto;
}
.post {
  border-radius: 16px;
  padding: 8px 16px;
  border: 1.5px gray solid;
  background: rgb(238, 239, 240);
  margin-bottom: 8px;
  display: block;
  text-decoration: none;
  .date {
    color: gray;
    font-size: 14px;
    span {
      font-size: 12px;
    }
  }
  h3 {
    color: black;
  }
  .tag {
    display: inline-block;
    background: lightgray;
    margin: 4px 8px 0 0;
    padding: 4px 8px;
    font-size: 14px;
    color: rgb(99, 99, 99);
    border-radius: 4px;
  }
}
.post > * {
  margin: 0;
}
.post:hover {
  box-shadow: 2px 2px 4px gray;
  transform: translate(-2px, -2px);
  h3 {
    color: indigo;
  }
}
</style>
