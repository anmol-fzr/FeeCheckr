import React from "react";
import ReactDOM from "react-dom/client";
import { Router } from "./Router";
import { Provider } from "@/components";
import "./styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<Provider>
			<Router />
		</Provider>
	</React.StrictMode>,
);
