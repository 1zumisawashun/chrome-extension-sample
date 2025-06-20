import { useEffect, useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "./App.css";
import { COLOR, FONT_SIZE } from "../utils/constants";

function App() {
  const [color, setColor] = useState(COLOR.RED);
  const [fontSize, setFontSize] = useState(FONT_SIZE.M);
  const [isEnabledStreaming, setIsEnabledStreaming] = useState(false);

  const handleColor = async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        type: "set-color",
        color: COLOR.RED,
      });
      console.log("Color changed to:", response);
    } catch (error) {
      console.error("Error setting color:", error);
    }
  };

  const handleFontSize = async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        type: "set-font-size",
        fontSize: FONT_SIZE.L,
      });
      console.log("Font size changed to:", response);
    } catch (error) {
      console.error("Error setting font size:", error);
    }
  };

  const handleIsEnabledStreaming = async () => {
    try {
      const response = await chrome.runtime.sendMessage({
        type: "set-is-enabled-streaming",
        isEnabledStreaming: true,
      });
      console.log("Is enabled streaming changed to:", response);
    } catch (error) {
      console.error("Error setting is enabled streaming:", error);
    }
  };

  const reset = async () => {
    await chrome.storage.local.clear();
  };

  function fetchData() {
    chrome.storage.local.get(null, (data) => {
      setColor(data.color);
      setFontSize(data.fontSize);
      setIsEnabledStreaming(data.isEnabledStreaming);
    });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div>
        <a href="https://wxt.dev" target="_blank">
          <img src={wxtLogo} className="logo" alt="WXT logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>WXT + React</h1>

      <button onClick={handleColor}>Color: {color}</button>
      <button onClick={handleFontSize}>Font Size: {fontSize}</button>
      <button onClick={handleIsEnabledStreaming}>
        Is Enabled Streaming: {`${isEnabledStreaming}`}
      </button>
      <button onClick={reset}>Reset</button>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the WXT and React logos to learn more
      </p>
    </>
  );
}

export default App;
