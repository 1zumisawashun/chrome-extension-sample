import { defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  manifest: {
    permissions: [
      "storage",
      "scripting",
      "activeTab",
      "tabs",
      "contextMenus",
      "webNavigation",
    ],
    host_permissions: ["https://script.google.com/*"],
  },
});
