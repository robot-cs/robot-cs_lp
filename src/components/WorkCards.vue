<template>
  <div class="works">
    <div
      v-for="(value, index) in worksData"
      :key="index"
      class="work"
      :id="`work-${index}`"
      @click="clickHandler(index)"
    >
      <img :src="value.poster" :alt="value.title" />
      <h3>{{ value.title }}</h3>
    </div>
    <dialog class="workdetail" ref="dialogObj" closedby="any">
      <button class="closebtn" @click="clearHandler">
        <span v-html="XIcon.html" />
      </button>
      <h3>{{ detailvalue && detailvalue.title }}</h3>
      <div v-if="detailvalue && detailvalue.video">
        <video
          :src="detailvalue.video"
          controls
          controlslist="nodownload noremoteplayback"
          preload="auto"
        />
      </div>
    </dialog>
  </div>
</template>
<script setup lang="ts">
import worksData from "../data/works.json";
import { icon, library } from "@fortawesome/fontawesome-svg-core";
import { faX } from "@fortawesome/free-solid-svg-icons";
library.add(faX);
const XIcon = icon(faX);
import { ref } from "vue";

const detailvalue = ref<any | null>(null);
const dialogObj = ref<HTMLDialogElement | null>(null);
function clickHandler(num: number) {
  detailvalue.value = worksData[num];
  if (dialogObj.value) dialogObj.value.showModal();
}
function clearHandler() {
  detailvalue.value = null;
  if (dialogObj.value) dialogObj.value.close();
}
</script>
<style scoped>
.works {
  display: grid;
  grid-template-columns: auto auto auto;
  gap: 16px 24px;
  justify-content: center;
  margin: 32px 0;
}
.work {
  position: relative;
  overflow: hidden;
  width: 300px;
  height: 300px;
  border-radius: 16px;
  border: 2px solid gray;
  img {
    max-width: 100%;
  }
  h3 {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    text-align: center;
    background: var(--background);
    margin: 0;
    padding: 16px 0;
  }
}
.work:hover {
  transform: translateY(-4px);
  box-shadow: 2px 2px 4px dimgray;
  cursor: pointer;
}
.workdetail {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: 0;
  height: 90%;
  width: 70%;
  overflow: hidden;
  border-radius: 32px;
  border: 3px solid darkgray;
  animation: slidein 1s ease;
  h3 {
    font-size: 32px;
    padding: 4px 0;
    margin: 8px 64px;
    border-bottom: 2px solid dimgray;
  }
  div {
    width: 100%;
    height: 90%;
    height: -webkit-fill-available;
  }
  video {
    display: block;
    height: max-content;
    object-fit: contain;
    max-width: 90%;
    max-height: 90%;
    margin: 0 auto;
  }
  .closebtn {
    position: absolute;
    top: 0;
    right: 0;
    border-radius: 999px;
    margin: 8px;
    border: 1px solid gray;
    font-size: 32px;
    padding: 6px 4px;
  }
}
dialog::backdrop {
  background-color: rgba(255, 255, 255, 0.2); /* 農大カラー（緑）の半透明 */
  backdrop-filter: blur(3px);
}
@media screen and (max-width: 1000px) {
  .works {
    grid-template-columns: auto auto;
  }
}
@media screen and (max-width: 650px) {
  .works {
    grid-template-columns: auto;
  }
  .workdetail h3 {
    font-size: 24px;
    margin: 8px 32px;
  }
  .workdetail .closebtn {
    font-size: 24px;
  }
}
@keyframes slidein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
