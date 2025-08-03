import { dateFormatter } from "./formatters";

export const URL = {
	googleAppsScript: import.meta.env.WXT_GAS_URL,
	googleForm: import.meta.env.WXT_GOOGLE_FORM_URL,
	googleSpreadsheet: import.meta.env.WXT_GOOGLE_SPREADSHEET_URL,
};

export const INIT_RESPONSE = {
	count: 0,
	lastUpdated: dateFormatter(new Date(), "YYYY/MM/DD HH:mm:ss"),
};

export const INIT_SETTING = {
	title: "タイトル",
	fetchInterval: 10000,
	totalInvited: 100,
};
