import { Clock, ExternalLink, RefreshCw, Users } from "lucide-react";
import { type FC, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { INIT_RESPONSE, INIT_SETTING, URL } from "../helpers/constants";
import { dateFormatter } from "../helpers/formatters";
import { Odometer } from "./Odometer";

export const Dashboard: FC = () => {
	const [response, setResponse] = useState(INIT_RESPONSE);
	const [setting, setSetting] = useState(INIT_SETTING);
	const [isPending, setIsPending] = useState(false);

	const fetchResponse = useCallback(async () => {
		const response = await fetch(URL.googleAppsScript);
		const json = await response.json();
		const data = {
			count: json.responseCount as number,
			lastUpdated: dateFormatter(new Date(), "YYYY/MM/DD HH:mm:ss"),
		};
		return data;
	}, []);

	useEffect(() => {
		chrome.storage.local.get(["response"]).then((result) => {
			setResponse(result.response ?? INIT_RESPONSE);
		});
		chrome.storage.local.get(["setting"]).then((result) => {
			setSetting(result.setting ?? INIT_SETTING);
		});
	}, []);

	useEffect(() => {
		const fetchDataPeriodically = async () => {
			try {
				const data = await fetchResponse();
				setResponse(data);
				chrome.storage.local.set({ response: data });
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		const interval = setInterval(fetchDataPeriodically, setting.fetchInterval);

		return () => {
			clearInterval(interval);
		};
	}, [fetchResponse, setting.fetchInterval]);

	const progressbar = (() => {
		const progress = (response.count / setting.totalInvited) * 100;
		const width = `${Math.min(progress, 100)}%`;
		const display = `${Math.round(progress)}%`;
		return { width, display };
	})();

	const handleRefetch = async () => {
		setIsPending(true);
		try {
			const data = await fetchResponse();
			setResponse(data);
			chrome.storage.local.set({ response: data });
		} catch (error) {
			console.error("Error refetching data:", error);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<Card className="shadow-lg border-0 gap-4">
			<CardHeader className="gap-0">
				<div className="flex items-center justify-between">
					<CardTitle className="text-lg font-bold text-gray-800 leading-tight">
						{setting?.title}
					</CardTitle>
				</div>
			</CardHeader>
			<CardContent className="space-y-4">
				<div className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-4">
					<div className="flex items-center justify-center gap-2 mb-1">
						<Users className="h-5 w-5" />
						<span className="text-sm font-medium">アンケート回答数</span>
					</div>
					<div className="text-3xl font-bold">
						<Odometer value={response.count} format="(.ddd),dd" />
					</div>
				</div>

				<div className="space-y-2">
					<div className="flex justify-between text-sm text-gray-600">
						<span>進捗状況</span>
						<span>{progressbar.display}</span>
					</div>
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div
							className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
							style={{ width: progressbar.width }}
						/>
					</div>
				</div>

				<div className="flex items-center gap-2 text-xs text-gray-500">
					<Clock className="h-3 w-3" />
					<span>最終更新: {response.lastUpdated}</span>
				</div>

				<div className="grid grid-cols-2 gap-2 pt-2">
					<Button
						variant="outline"
						size="sm"
						onClick={handleRefetch}
						disabled={isPending}
						className="flex items-center gap-1 bg-transparent"
					>
						<RefreshCw
							className={`h-3 w-3 ${isPending ? "animate-spin" : ""}`}
						/>
						更新
					</Button>
					<Button
						variant="outline"
						size="sm"
						onClick={() => window.open(URL.googleSpreadsheet, "_blank")}
						className="flex items-center gap-1"
					>
						<ExternalLink className="h-3 w-3" />
						詳細
					</Button>
				</div>

				<Button
					className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
					onClick={() => window.open(URL.googleForm, "_blank")}
				>
					フォームを開く
				</Button>
			</CardContent>
		</Card>
	);
};
