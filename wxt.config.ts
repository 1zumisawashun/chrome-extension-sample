import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "wxt";

/**
 * See: 
 * https://wxt.dev/api/config.html
 * https://wxt.dev/guide/essentials/frontend-frameworks.html#multiple-apps
 * https://wxt.dev/guide/essentials/project-structure.html
 */
export default defineConfig({
	srcDir: 'src',
	modules: ["@wxt-dev/module-react"],
	vite: () => ({
		plugins: [tailwindcss()],
	}),
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
