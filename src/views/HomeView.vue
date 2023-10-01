<template>
  <div>
    <MdEditor :value="mdValue" :handle-change="mdHandleChange" />
    <CodeEditor :value="codeValue" :handle-change="codeHandleChange" />
    <h1>标题</h1>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import CodeEditor from "@/components/CodeEditor.vue";
const codeValue = ref("");
const mdValue = ref("");
const mdHandleChange = (v: string) => {
  mdValue.value = v;
  console.log(v);
};
const codeHandleChange = (v: string) => {
  codeValue.value = v;
  console.log(v);
};
</script>
