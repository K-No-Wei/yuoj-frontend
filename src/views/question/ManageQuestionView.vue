<script setup lang="ts">
import { onMounted, ref, h } from "vue";
import { QuestionControllerService, QuestionVO } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import * as querystring from "querystring";
import { Button, Modal } from "@arco-design/web-vue";
import { useRoute, useRouter } from "vue-router";

const show = ref(true);

const columns = [
  {
    title: "id",
    dataIndex: "id",
  },
  {
    title: "标题",
    dataIndex: "title",
  },
  {
    title: "内容",
    dataIndex: "content",
  },
  {
    title: "答案",
    dataIndex: "answer",
  },
  {
    title: "标签",
    dataIndex: "tags",
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
  },
  {
    title: "操作",
    slotName: "optional",
  },
];

const dataList = ref([]);

const total = ref(0);

const searchParams = ref({
  pageSize: 10,
  current: 1,
});

const loadData = async () => {
  const res = await QuestionControllerService.listQuestionByPageUsingPost(
    searchParams.value
  );
  if (res.code === 0) {
    console.log(res.data);
    dataList.value = res.data.records;
    total.value = res.data.total;
  } else {
    message.error("题目初始化失败");
  }
};

onMounted(() => {
  loadData();
});

const onClick = () => {
  console.log("dddd");
};
const delId = ref(0);
const doDelete = async (question: QuestionVO) => {
  if (question.id != null) {
    delId.value = question.id;
  }
  visible.value = true;
};

const router = useRouter();

const doUpdate = async (question: QuestionVO) => {
  router.push({
    path: "/update/question",
    query: {
      id: question.id,
    },
  });
};

const visible = ref(false);

const handleOk = async () => {
  const res = await QuestionControllerService.deleteQuestionUsingPost({
    id: delId.value,
  });
  if (res.code === 0) {
    message.success("删除成功");
  } else {
    message.error("删除失败" + res.message);
  }
  //todo 自动更新
  loadData();
  visible.value = false;
};
const handleCancel = () => {
  visible.value = false;
};
</script>

<template>
  <div id="manageQuestionView">
    <a-table
      :pagination="{
        showTotal: true,
        pageSize: searchParams.pageSize,
        current: searchParams.current,
        total,
      }"
      :columns="columns"
      :data="dataList"
    >
      <template #optional="{ record }">
        <a-button type="primary" @click="doUpdate(record)">修改</a-button>
        <a-button status="danger" @click="doDelete(record)">删除</a-button>
      </template>
    </a-table>

    <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
      <template #title> 删除 </template>
      <div>
        确认是否删除id为<span style="color: red">{{ delId }}</span>
        的记录
      </div>
    </a-modal>
  </div>
</template>

<style scoped>
/*div#addQuestionView {*/
/*  width: 70%;*/
/*  margin: auto;*/
/*}*/
</style>
