/** biome-ignore-all lint/complexity/useLiteralKeys: reason */
type Props = {
	message: string;
	fontSize: number;
	color: string;
};

/**
 * TODO:
 * 外部参照は読み込まれないので、必要な場合は関数内で定義するか、引数で渡す必要があるぽい
 * ここはscrapingされているのでservice workerではなくcontent scriptで実行される？console.logがブラウザに出力されている
 * 一度でもスレッドを開かないと、MutationObserverが発火しないので、最初にスレッドを開く必要がある
 * アクティブタブにコメントをstreamする実装は別途必要そう
 */
export const injectComment = async ({ message, color, fontSize }: Props) => {
	const GOOGLE_SLIDE_SELECTOR =
		"body > div.punch-full-screen-element.punch-full-window-overlay";

	const screenHeight = window.innerHeight;
	const screenWidth = window.innerWidth;

	const comment = document.createElement("span");
	comment.textContent = message;

	const googleSlideNode = document.querySelector(GOOGLE_SLIDE_SELECTOR);
	const targetNode = googleSlideNode || document.body;

	targetNode.appendChild(comment);

	const letterSize = screenHeight * 0.05 * fontSize;

	const footerHeight = 88;
	const scrollTopHeight = window.pageYOffset;
	const randomHeight = Math.floor(
		(screenHeight - letterSize - footerHeight) * Math.random(),
	);
	const topPosition = scrollTopHeight + randomHeight;

	const commentStyle = {
		left: `${screenWidth}px`,
		top: `${topPosition}px`,
		fontSize: `${letterSize}px`,
		color: color,
	};

	comment.style["left"] = commentStyle["left"];
	comment.style["top"] = commentStyle["top"];
	comment.style["fontSize"] = commentStyle["fontSize"];
	comment.style["color"] = commentStyle["color"];
	comment.style["position"] = "absolute";
	comment.style["zIndex"] = "2147483647";
	comment.style["whiteSpace"] = "nowrap";
	comment.style["lineHeight"] = "initial";

	const streamCommentUI = comment.animate(
		{
			left: `${-comment.offsetWidth}px`,
		},
		{
			duration: 6000,
			easing: "linear",
		},
	);

	streamCommentUI.ready.then(() => console.log("Comment animation ready"));

	streamCommentUI.onfinish = () => {
		targetNode.removeChild(comment);
	};
};
