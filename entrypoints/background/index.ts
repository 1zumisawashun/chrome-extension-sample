// タブ全てを監視する
export default defineBackground(() => {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "document-picture-in-picture",
      title: "Open Picture-in-Picture Window",
    });
  });
  chrome.contextMenus.onClicked.addListener((onClickData, tab) => {
    if (onClickData.menuItemId === "document-picture-in-picture") {
      chrome.tabs.sendMessage(tab?.id!, { type: "OPEN_PIP" });
    }
  });
});
