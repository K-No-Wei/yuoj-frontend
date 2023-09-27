import { createApp } from "vue";
import ArcoVue from "@arco-design/web-vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "@arco-design/web-vue/dist/arco.css";
import "@/access";

createApp(App).use(ArcoVue).use(store).use(router).mount("#app");
