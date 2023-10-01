<script setup lang="ts">
import * as monaco from "monaco-editor";
import { onMounted, ref, toRaw } from "vue";
import { defineProps, withDefaults } from "vue/dist/vue";

const codeEditorRef = ref();
const codeEditor = ref();

interface Props {
  value: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  handleChange: (v: string) => {
    console.log(v);
  },
});

// const value = ref("hello");

const fillValue = () => {
  console.log("test");
  toRaw(codeEditor.value).setValue("cscscs");
};

//渲染
onMounted(() => {
  if (!codeEditorRef.value) {
    return;
  }
  codeEditor.value = monaco.editor.create(codeEditorRef.value, {
    value: props.value,
    language: "java",
    automaticLayout: true,
    colorDecorators: true,
    minimap: {
      enabled: true,
    },
    readOnly: false,
    theme: "vs-dark",
  });
  codeEditor.value.onDidChangeModelContent(() => {
    // console.log(toRaw(codeEditor.value).getValue());
    props.handleChange(toRaw(codeEditor.value).getValue());
  });
});
</script>

<template>
  <div id="container" ref="codeEditorRef" style="min-height: 400px"></div>
</template>

<style scoped></style>
