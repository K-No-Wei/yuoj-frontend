<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import MdEditor from "@/components/MdEditor.vue";
import { QuestionControllerService } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRoute, useRouter } from "vue-router";

let form = ref({
  answer: "",
  content: "",
  judgeCase: [
    {
      input: "1",
      output: "1",
    },
  ],
  judgeConfig: {
    memoryLimit: 1000,
    stackLimit: 1000,
    timeLimit: 1000,
  },
  tags: [],
  title: "",
});

const handleAdd = () => {
  form.value.judgeCase.push({
    input: "",
    output: "",
  });
};
const handleDelete = (index: number) => {
  form.value.judgeCase.splice(index, 1);
};

const route = useRoute();
const updatePage = route.path.includes("update");

/**
 * 根据题目id获取数据
 */
const loadData = async () => {
  const id = route.query.id;
  if (!id) {
    return;
  }
  const res = await QuestionControllerService.getQuestionByIdUsingGet(
    id as any
  );
  if (res.code === 0) {
    form.value = res.data as any;
    console.log(form.value);
    if (!form.value.judgeCase) {
      form.value.judgeCase = [];
    }
    if (!form.value.judgeConfig) {
      form.value.judgeConfig = {
        memoryLimit: 1000,
        stackLimit: 1000,
        timeLimit: 1000,
      };
    }
  } else {
    message.error("加载失败" + res.message);
  }
};
const addQuestion = async () => {
  if (updatePage) {
    const res = await QuestionControllerService.updateQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("更新成功");
    } else {
      message.success("更新失败:" + res.message);
    }
  } else {
    const res = await QuestionControllerService.addQuestionUsingPost(
      form.value
    );
    if (res.code === 0) {
      message.success("创建成功");
    } else {
      message.success("创建失败:" + res.message);
    }
  }
};

onMounted(() => {
  loadData();
});
const onAnswer = (v: string) => {
  form.value.answer = v;
};
const onContent = (v: string) => {
  form.value.content = v;
};
</script>

<template>
  <div id="addQuestionView">
    <a-form :model="form" label-align="left">
      <a-form-item field="title" label="标题">
        <a-input v-model="form.title" placeholder="输入标题" />
      </a-form-item>
      <a-form-item
        field="content"
        tooltip="Please enter username"
        label="题目内容"
      >
        <MdEditor :value="form.content" :handle-change="onContent" />
      </a-form-item>

      <a-form-item field="answer" label="答案">
        <MdEditor :value="form.answer" :handle-change="onAnswer" />
      </a-form-item>

      <a-form-item field="tag" label="标签">
        <a-input-tag v-model="form.tags" />
      </a-form-item>

      <a-form-item label="题目配置" :content-flex="false" :merge-props="false">
        <a-space direction="vertical" style="min-width: 480px">
          <a-form-item field="judgeConfig.timeLimit" label="时间限制">
            <a-input-number
              v-model="form.judgeConfig.timeLimit"
              placeholder="请输入时间限制"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.stackLimit" label="堆栈限制">
            <a-input-number
              v-model="form.judgeConfig.stackLimit"
              placeholder="请输入堆栈限制"
            />
          </a-form-item>
          <a-form-item field="judgeConfig.memoryLimit" label="内存限制">
            <a-input-number
              v-model="form.judgeConfig.memoryLimit"
              placeholder="请输入内存限制"
            />
          </a-form-item>
        </a-space>
      </a-form-item>
      <a-form-item label="测试用例" :content-flex="false" :merge-props="false">
        <a-form-item
          v-for="(judgeCaseItem, index) of form.judgeCase"
          :key="index"
          no-style
        >
          <a-space direction="vertical" style="min-width: 500px">
            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输入用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.input"
                placeholder="请输入输入用例"
              />
            </a-form-item>

            <a-form-item
              :field="`form.judgeCase[${index}].input`"
              :label="`输出用例-${index}`"
              :key="index"
            >
              <a-input
                v-model="judgeCaseItem.output"
                placeholder="请输入输出用例"
              />
            </a-form-item>
            <a-button status="danger" @click="handleDelete(index)"
              >删除</a-button
            >
          </a-space>
        </a-form-item>
        <div style="margin-top: 16px">
          <a-button type="outline" status="success" @click="handleAdd()"
            >新增测试用例</a-button
          >
        </div>
      </a-form-item>
      <a-form-item>
        <a-button @click="addQuestion" status="normal" style="width: 200px"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<style scoped>
div#addQuestionView {
  width: 70%;
  margin: auto;
}
</style>
