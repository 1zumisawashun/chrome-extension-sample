import { useEffect, useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "./App.css";
import { COLOR, FONT_SIZE } from "../utils/constants";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchDataPeriodically = async () => {
      try {
        const url = import.meta.env.WXT_GAS_URL;
        const response = await fetch(url);
        const data = await response.json();
        console.log("Fetched data:", data);
        setCount(data.count);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // 初回実行
    fetchDataPeriodically();

    // 5秒毎に実行
    const interval = setInterval(fetchDataPeriodically, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []); // 依存配列を追加してコンポーネントマウント時のみ実行

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
      <p>{count}</p>
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
