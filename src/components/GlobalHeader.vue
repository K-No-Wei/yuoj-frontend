<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<template>
  <a-row id="globalHeader" class="grid-demo" align="center" :wrap="false">
    <a-col flex="auto">
      <a-menu
        mode="horizontal"
        :selected-keys="selectKeys"
        @menu-item-click="doMenuClick"
      >
        <a-menu-item
          key="0"
          :style="{ padding: 0, marginRight: '38px' }"
          disabled
        >
          <div class="title-bar">
            <img
              src="https://cdnjson.com/images/2023/02/13/avatar.jpg"
              class="logo"
            />
            <div class="title">K OJ</div>
          </div>
        </a-menu-item>
        <a-menu-item v-for="item in visibleRoutes" :key="item.path">{{
          item.name
        }}</a-menu-item>
      </a-menu>
    </a-col>
    <a-col flex="100px">
      <div>{{ store.state.user?.loginUser?.userName ?? "未登入" }}</div>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { computed, ref } from "vue";
import { useStore } from "vuex";
import checkAccess from "@/access/checkAccess";
import accessEnum from "@/access/accessEnum";

const router = useRouter();
const selectKeys = ref(["/"]);
const store = useStore();

// setTimeout(() => {
//   store.dispatch("user/getLoginUser", {
//     userName: "鱼皮",
//     userRole: accessEnum.ADMIN,
//   });
// }, 3000);

const visibleRoutes = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return routes.filter((item, _index) => {
    if (item.meta?.hideInMenu) {
      return false;
    }

    //根据权限过滤菜单
    if (
      !checkAccess(store.state.user.loginUser, item?.meta?.access as string)
    ) {
      return false;
    }
    return true;
  });
});

//获取路由信息
// eslint-disable-next-line @typescript-eslint/no-unused-vars
router.afterEach((to, _from, _failure) => {
  selectKeys.value = [to.path];
});

const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>

<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: #444;
  margin-left: 14px;
}
.logo {
  height: 48px;
}
</style>
