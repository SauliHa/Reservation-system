import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./i18n"; // Import the i18n configuration
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<I18nextProvider i18n={i18n}>
			<App />
		</I18nextProvider>
	</React.StrictMode>
);
