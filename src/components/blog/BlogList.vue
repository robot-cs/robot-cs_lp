<template>
  <section class="search">
    <div class="tags">
      <div class="selecting">
        タグ検索：
        <p v-for="(value, index) in selectingTags" :key="index" class="onetag">
          {{ value }}<span @click="removeTag(value)">×</span>
        </p>
        <button
          class="plusbtn"
          @click="() => (istagselectopen = !istagselectopen)"
        >
          {{ !istagselectopen ? "＋" : "ー" }}
        </button>
      </div>
      <select
        class="tagselect"
        name="tag"
        v-model="selectingTags"
        multiple
        v-show="istagselectopen"
      >
        <option v-for="(value, index) in allTags" :key="index" :value="value">
          {{ value }}
        </option>
      </select>
      <div
        class="tagcover"
        v-show="istagselectopen"
        @click="istagselectopen = false"
      ></div>
    </div>
    <select name="sorting" class="sort" v-model="selectvalue">
      <option value="updated_DESC">最終更新日が新しい順</option>
      <option value="updated_ASC">最終更新日が古い順</option>
      <option value="created_DESC">作成日が新しい順</option>
      <option value="created_ASC">作成日が古い順</option>
      <option value="title">タイトル</option>
    </select>
  </section>
  <section class="posts">
    <a
      v-for="value in optimizedPosts"
      :key="value.slug"
      class="post"
      :href="useLink(blogURL + value.slug)"
      :id="`blog-${value.slug}`"
    >
      <p class="date">
        {{ dateToStr(new Date(value.updated ?? value.created)) }}
        <span v-if="value.updated" v-html="penIcon.html" />
      </p>
      <h3>{{ value.title }}</h3>
      <div class="tags">
        <span
          v-if="value.tag"
          v-for="(value2, index2) in value.tag"
          :key="index2"
          class="tag"
          >{{ value2 }}</span
        >
      </div>
    </a>
  </section>
</template>
<script setup lang="ts">
import { useLink } from "../../utils/link";
import blogData from "../../data/bloglist.json";
import { icon, library } from "@fortawesome/fontawesome-svg-core";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { ref, onMounted, watch } from "vue";
library.add(faPen);
const penIcon = icon(faPen);

const blogURL = "blog/";

const allPosts = blogData.blog;
const allTags = blogData.tags;
const selectingTags = ref<string[]>([]);
const selectvalue = ref<string>("updated_DESC");
const istagselectopen = ref<boolean>(false);
let pagenate = 1;
const pageLength = 20;
let optimizedPosts = ref(
  allPosts.filter(
    (_value, index) =>
      pageLength * (pagenate - 1) <= index && pageLength * pagenate,
  ),
);
onMounted(() => {
  const params = new URLSearchParams(window.location.search);
  console.log(window.location.href);
  if (params.get("sort")) {
    selectvalue.value = params.get("sort") ?? "updated_DESC";
    refilterandsort();
  }
  if (params.get("tag")) {
    selectingTags.value = params.get("tag")?.split("_") ?? [];
    refilterandsort();
  }
});
watch(selectvalue, refilterandsort);
watch(selectingTags, refilterandsort);

function dateToStr(date: Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const isThisyear = y === new Date().getFullYear();

  return `${isThisyear ? "" : y + "/"}${m}/${d}`;
}
function setQuery(key: string, value?: string) {
  const url = new URL(window.location.href);
  if (value) {
    url.searchParams.set(key, value);
  } else {
    url.searchParams.delete(key);
  }
  history.replaceState(null, "", url);
}
function removeTag(txt: string) {
  if (selectingTags.value.includes(txt)) {
    selectingTags.value = selectingTags.value.filter((value) => value !== txt);
  }
}

function refilterandsort() {
  const sorttxt: string = selectvalue.value;
  let taggedPosts = allPosts;
  if (selectingTags.value.length > 0) {
    setQuery("tag", selectingTags.value.join("_"));
    for (let selecttag of selectingTags.value) {
      taggedPosts = taggedPosts.filter((value) => {
        if (!value.tag) return false;
        return value.tag.includes(selecttag);
      });
    }
  } else {
    setQuery("tag");
  }
  switch (sorttxt) {
    case "updated_DESC":
      optimizedPosts.value = taggedPosts.sort(
        (a, b) =>
          new Date(b.updated ?? b.created).getTime() -
          new Date(a.updated ?? a.created).getTime(),
      );
      setQuery("sort");
      break;
    case "updated_ASC":
      optimizedPosts.value = taggedPosts.sort(
        (a, b) =>
          new Date(a.updated ?? a.created).getTime() -
          new Date(b.updated ?? b.created).getTime(),
      );
      setQuery("sort", "updated_ASC");
      break;
    case "created_DESC":
      optimizedPosts.value = taggedPosts.sort(
        (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
      );
      setQuery("sort", "created_DESC");
      break;
    case "created_ASC":
      optimizedPosts.value = taggedPosts.sort(
        (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime(),
      );
      setQuery("sort", "created_ASC");
      break;
    case "title":
      optimizedPosts.value = taggedPosts.sort((a, b) =>
        a.title.localeCompare(b.title, "ja"),
      );
      setQuery("sort", "title");
      break;
    default:
      optimizedPosts.value = taggedPosts.sort(
        (a, b) =>
          new Date(b.updated ?? b.created).getTime() -
          new Date(a.updated ?? a.created).getTime(),
      );
      setQuery("sort");
      break;
  }
  optimizedPosts.value.filter(
    (_value, index) =>
      pageLength * (pagenate - 1) <= index && pageLength * pagenate,
  );
}
</script>
<style scoped>
.posts {
  max-width: 720px;
  margin: 24px auto;
  padding: 0 24px;
}
.post {
  padding: 8px 16px;
  border-bottom: 1.5px gray solid;
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
.search {
  max-width: 720px;
  margin: 8px auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 16px;
  .sort {
    padding: 8px 12px;
    font-size: 14px;
    color: dimgray;
    border-radius: 8px;
    border: 2px solid darkgray;
  }
}
.onetag {
  display: inline-block;
  background: whitesmoke;
  padding: 4px 8px;
  border-radius: 8px;
  margin: 0;
  margin-right: 8px;
  span {
    margin-left: 8px;
  }
}
.plusbtn {
  padding: 4px 8px;
  border-radius: 8px;
  border: 2px solid darkgray;
  color: dimgray;
  background: whitesmoke;
  margin: 4px 8px;
}
.tagselect {
  position: absolute;
  height: 50%;
  color: dimgray;
  font-size: 16px;
  padding: 8px;
  border-radius: 8px;
  border: 2px solid darkgray;
  z-index: 20;
  option {
    padding: 8px;
    cursor: pointer;
  }
}
.tagcover {
  content: "";
  position: absolute;
  width: 100dvw;
  height: 100dvh;
  user-select: none;
  z-index: 10;
}
</style>
