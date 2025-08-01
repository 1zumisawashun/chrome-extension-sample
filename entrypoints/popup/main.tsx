import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";
import "@/assets/tailwind.css";

// biome-ignore lint/style/noNonNullAssertion: reason
ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>,
);
