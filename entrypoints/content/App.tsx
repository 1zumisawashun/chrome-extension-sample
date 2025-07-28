import { type FC, useEffect } from "react";
import {
	COLOR,
	type ColorKeys,
	FONT_SIZE,
	type FontSizeKeys,
	MESSAGE,
	THREAD,
} from "../background/constants";

type Response = {
	isEnabledStreaming: boolean;
	fontSize: FontSizeKeys;
	color: ColorKeys;
};

let prevMessageNodesLength: number = 0;

/**
 * TODO:
 * MutationObserverをもうちょい調査してみる
 * storage.setの時browserだとバグった。これは利用しているブラウザが影響していそう
 * popupはbrowserか？一旦全部chromeにしている
 * DOM層は不要ぽいので後でhooksに分離する
 */
const observer = new MutationObserver(async (mutations: MutationRecord[]) => {
	try {
		const addedNode = Array.from(mutations.at(0)?.addedNodes ?? []).at(0);
		if (addedNode?.nodeType !== Node.ELEMENT_NODE) return;

		const response: Partial<Response> = await chrome.storage.local.get(null);
		const { isEnabledStreaming, fontSize, color } = response;
		if (!isEnabledStreaming) return;

		const thread = document.querySelector(THREAD);
		if (!thread) return;

		const messageNodes = thread.querySelectorAll(MESSAGE);
		// NOTE: mutationが2重で発火することがあるので前回のmessageNodesの数と比較して変化があった場合のみ処理を行う
		if (messageNodes.length === prevMessageNodesLength) return;
		prevMessageNodesLength = messageNodes.length;

		const latestMessageNode = Array.from(messageNodes).at(-1);
		const message = (latestMessageNode as HTMLElement).innerText;
		if (!message) return;

		void chrome.runtime.sendMessage({
			type: "chat-message",
			message,
			fontSize: fontSize ?? FONT_SIZE.M,
			color: color ?? COLOR.GREEN,
		});
	} catch (e) {
		console.error(e);
	}
});

export const App: FC = () => {
	useEffect(() => {
		observer.observe(document.body, { subtree: true, childList: true });
		return () => observer.disconnect();
	}, []);

	return null;
};
