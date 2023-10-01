<template>
  <Editor
    :mode="mode"
    :value="value"
    :plugins="plugins"
    @change="handleChange"
  />
</template>

<script setup lang="ts">
import gfm from "@bytemd/plugin-gfm";
import { Editor } from "@bytemd/vue-next";
import highlight from "@bytemd/plugin-highlight";
import { withDefaults, defineProps, ref } from "vue";

const plugins = [gfm(), highlight()];

interface Props {
  value: string;
  mode: string;
  handleChange: (v: string) => void;
}

const props = withDefaults(defineProps<Props>(), {
  value: () => "",
  mode: () => "split",
  handleChange: (v: string) => {
    console.log(v);
  },
});
// const value = ref("");
// const handleChange = (v: string) => {
//   value.value = v;
// };
</script>
