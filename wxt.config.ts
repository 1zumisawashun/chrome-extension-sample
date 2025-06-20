import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    /**
     * TODO:
     * scriptingを追加するとどうなるかは未確認
     * */
    permissions: ["storage", "scripting", "activeTab", "tabs", "tabCapture"],
  },
});
