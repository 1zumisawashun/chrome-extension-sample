import "./style.css";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import { PictureInPictureHandler } from "./documentPictureInPictureHandler.ts";

// ある意味、contentとbackgroundはservice workerみたいな感じか
// content scriptはDOMにアクセスできるが、backgroundはできない感じ

// 対象のタブを選択する必要があるのか
export default defineContentScript({
  matches: [
    "https://app.slack.com/*",
    // "https://zenn.dev/*",
    "https://www.google.com/*",
    "https://meet.google.com/*",
  ],
  // cssInjectionMode: "ui",
  async main(ctx) {
    chrome.runtime.onMessage.addListener((msg) => {
      if (msg.type === "OPEN_PIP") {
        const body = document.querySelector("html");
        console.log(body, "body");
        if (!body) return;
        PictureInPictureHandler.createWindow(body);
      }
    });
    // document.addEventListener("click", handleClick);
    // const ui = await createShadowRootUi(ctx, {
    //   name: "wxt-react-example",
    //   position: "inline",
    //   anchor: "body",
    //   append: "first",
    //   onMount: (container) => {
    //     const wrapper = document.createElement("div");
    //     container.append(wrapper);
    //     console.log("Mounting React app in shadow DOM...");
    //     const root = ReactDOM.createRoot(wrapper);
    //     root.render(<App />);
    //     return { root, wrapper };
    //   },
    //   onRemove: (elements) => {
    //     elements?.root.unmount();
    //     elements?.wrapper.remove();
    //   },
    // });
    // ui.mount();
  },
});
