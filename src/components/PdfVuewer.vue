<template>
  <div class="pdf-container">
    <VuePdfEmbed :source="props.url" :page="page" class="pdf" />
  </div>
  <div class="pagecontroller">
    <button @click="movePage(-1)" :disabled="page <= 1" class="backbtn">
      <span v-html="leftAngle.html" />
    </button>
    <select name="pagenum" class="pageselect" v-model="page">
      <option
        v-for="i in new Array(props.pagelen).fill(0).map((_, idx) => idx + 1)"
        :value="i"
      >
        {{ i }}
        <span style="font-size: 50%"> / {{ props.pagelen }}</span>
      </option>
    </select>
    <button
      @click="movePage(1)"
      :disabled="page >= props.pagelen"
      class="forwardbtn"
    >
      <span v-html="rightAngle.html" />
    </button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import VuePdfEmbed from "vue-pdf-embed";
import { icon, library } from "@fortawesome/fontawesome-svg-core";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
library.add(faAngleLeft, faAngleRight);
const leftAngle = icon(faAngleLeft);
const rightAngle = icon(faAngleRight);
interface Props {
  url: string;
  pagelen: number | 100;
}
const props = defineProps<Props>();
const page = ref<number>(1);

function movePage(num: number) {
  if (page.value + num < 1) return;
  if (page.value + num > props.pagelen) return;
  page.value += num;
}
</script>
<style scoped>
.pagecontroller {
  text-align: center;
}
.pdf-container {
  margin: 16px;
  padding: 16px;
  border: 2px solid black;
  border-radius: 16px;
  background: radial-gradient(white, gainsboro);
  width: min(100%, 700px);
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
  overflow: hidden;
}
.pdf {
  display: block;
  width: 100%;
  max-width: 100%;
}
.pdf :deep(.vue-pdf-embed),
.pdf :deep(canvas),
.pdf :deep(img),
.pdf :deep(svg) {
  max-width: 700px !important;
  width: 100% !important;
  height: auto !important;
}
.backbtn,
.forwardbtn {
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  margin: 8px;
  background: white;
  color: var(--theme);
  border: 2px solid var(--theme);
  cursor: pointer;
  box-shadow: 2px 2px 5px darkgray;
  transition: background ease 0.3s;
  font-size: 20px;
}
.backbtn:hover,
.forwardbtn:hover {
  background: var(--theme);
  color: white;
}
.backbtn:disabled,
.forwardbtn:disabled {
  background: #dddddd;
  color: white;
  border-color: #aaaaaa;
}
.pageselect {
  font-size: 20px;
  padding: 6px;
  border-radius: 4px;
  background: #f3f3f9;
  border: 2px solid var(--theme);
  cursor: pointer;
}

@media (max-width: 720px) {
  .pdf-container {
    margin: 0;
    padding: 0;
    border: none;
    border-radius: 0;
    background: transparent;
    width: 100%;
    max-width: 100%;
  }

  .pdf {
    width: 100%;
  }
}
</style>
