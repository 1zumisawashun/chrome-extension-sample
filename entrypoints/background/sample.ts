import { STORAGE } from "./constants";
import { injectComment } from "./inject-comment";

/**
 * TODO:
 * 挙動がわかりにくかったので、こちらのコードを参考にして進めた https://github.com/wxt-dev/examples/tree/main/examples/basic-messaging
 * addListenerの戻り値はtrueにしないといけないぽい
 * chrome.scripting.executeScriptはservice worker上でjsを挿入する感じ
 * injectCommentの引数を渡す場合はargs経由でないとバグる。そういった制約があるのかもしれない
 * 画面共有はscreen capture apiを使うのでそれ用のpopupを用意すれば良さそう？
 * それか妥協案としてfocusタブを全て対象にして文字を流すとかならいけそう。正攻法で対応は無理そう
 */
export default defineBackground(() => {
	// WIPなので後ほど対応する
	chrome.tabs.query({}, async (tabs) => {
		tabs.forEach((tab) => {
			if (!tab.id) return;

			chrome.scripting.executeScript({
				target: { tabId: tab.id },
				func: (messageType) => {
					console.log(messageType, "messageType");
					const orig = navigator.mediaDevices.getDisplayMedia;

					navigator.mediaDevices.getDisplayMedia = async function (...args) {
						const stream = await orig.apply(this, args);
						console.log("getDisplayMedia called", stream);
						chrome.runtime.sendMessage({ type: messageType });
						return stream;
					};
				},
				args: ["tab-shared"],
			});
		});
	});

	chrome.runtime.onMessage.addListener(
		async (request, sender, _sendResponse) => {
			console.log("request:", request);
			console.log("sender:", sender);

			if (chrome.runtime.lastError) {
				console.error("Runtime error:", chrome.runtime.lastError);
				return true;
			}
			if (request?.type === "tab-shared") {
				console.log("tab-shared request received");
			}
			if (request?.type === "set-color") {
				chrome.storage.local.set({ [STORAGE.Color]: request.color });
				return true;
			}
			if (request?.type === "set-font-size") {
				chrome.storage.local.set({ [STORAGE.FontSize]: request.fontSize });
				return true;
			}
			if (request?.type === "set-is-enabled-streaming") {
				chrome.storage.local.set({
					[STORAGE.IsEnabledStreaming]: request.isEnabledStreaming,
				});
				return true;
			}
			if (request?.type === "chat-message") {
				chrome.tabs.query(
					{ active: true, currentWindow: true },
					async (tabs) => {
						const tabId = tabs.at(0)?.id;
						if (!tabId) return;

						chrome.scripting.executeScript({
							target: { tabId },
							func: injectComment,
							args: [
								{
									message: request.message,
									fontSize: request.fontSize,
									color: request.color,
								},
							],
						});
					},
				);
				return true;
			}
			console.log("no matching request type found", request);
			return true;
		},
	);
});
