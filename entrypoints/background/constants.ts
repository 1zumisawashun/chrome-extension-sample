export const STORAGE = {
	Comment: "comment",
	Color: "color",
	FontSize: "fontSize",
	IsEnabledStreaming: "isEnabledStreaming",
};

export type Storage = typeof STORAGE;
export type StorageKeys = keyof Storage;

export const FONT_SIZE = {
	XS: 0.25,
	S: 0.5,
	M: 1,
	L: 2,
	XL: 4,
};

export type FontSize = typeof FONT_SIZE;
export type FontSizeKeys = keyof FontSize;

export const COLOR = {
	BLACK: "#000000",
	WHITE: "#FFFFFF",
	RED: "#FF0000",
	GREEN: "#00FF00",
	BLUE: "#0000FF",
	YELLOW: "#FFFF00",
	CYAN: "#00FFFF",
	MAGENTA: "#FF00FF",
};

export type Color = typeof COLOR;
export type ColorKeys = keyof Color;

/*
  NOTE: When the focused tab is on google slide full screen mode,
        target node is the specific div, whose z-index is max value
        as the same as the value of streamed comments

  SEE: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context
  */
export const GOOGLE_SLIDE_SELECTOR =
	"body > div.punch-full-screen-element.punch-full-window-overlay";

export type GoogleSlideSelector = typeof GOOGLE_SLIDE_SELECTOR;
export type GoogleSlideSelectorKeys = keyof GoogleSlideSelector;

export const THREAD = "div.z38b6"; // スレッドのセレクタ
export const MESSAGE = ".ptNLrf > div:first-child"; // メッセージのセレクタ
