import { useEffect, useState } from "react";
import reactLogo from "@/assets/react.svg";
import wxtLogo from "/wxt.svg";
import "./App.css";
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-default.css";

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
      <Odometer value={count} format="(.ddd),dd" />
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
