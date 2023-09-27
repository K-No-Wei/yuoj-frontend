<template>
  <div id="userlayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header"> </a-layout-header>
      <a-layout-content class="content">
        <a-space class="content-1">
          <div class="logo">
            <img
              src="https://cdnjson.com/images/2023/02/13/avatar.jpg"
              alt=""
            />
          </div>
          <div>KOJ</div>
        </a-space>
        <div class="content-2">
          <router-view />
        </div>
      </a-layout-content>
      <a-layout-footer class="footer">KOJ在线判题</a-layout-footer>
    </a-layout>
  </div>
</template>

<script></script>

<style scoped>
#userlayout .content {
  text-align: center;
  position: absolute;
  left: 50%;
  top: 40%;
  transform: translate(-50%, -50%);
}

#userlayout .content .logo img {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.content-1 {
  text-align: center;
  align-items: center;
  margin: 30px;
}

#userlayout .footer {
  background: #efefef;
  padding: 16px;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
