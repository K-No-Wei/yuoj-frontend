<template>
  <div id="basiclayout">
    <a-layout style="height: 400px">
      <a-layout-header class="header"><GlobalHeader /></a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">knowei网站</a-layout-footer>
    </a-layout>
  </div>
</template>

<script>
import GlobalHeader from "@/components/GlobalHeader.vue";

export default {
  components: { GlobalHeader },
};
</script>

<style scoped>
#basiclayout .header {
  margin-bottom: 16px;
  box-shadow: #eee 1px 1px 5px;
}
#basiclayout .content {
  background: linear-gradient(to, right, #eee, #fff);
}

#basiclayout .footer {
  background: #efefef;
  padding: 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
