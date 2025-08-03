import { Save } from "lucide-react";
import type { FC } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export const Setting: FC = () => {
	const [settings, setSettings] = useState({
		surveyTitle: "",
		targetResponses: 0,
		fetchInterval: 10, // デフォルトは10分
		formUrl: "",
		spreadsheetUrl: "",
		totalInvited: 0,
	});

	const handleSaveSettings = () => {};
	return (
		<div className="space-y-4">
			<h2 className="text-lg font-bold text-gray-800 mb-4">設定</h2>

			<div className="space-y-2">
				<Label htmlFor="survey-title">アンケートタイトル</Label>
				<Input
					id="survey-title"
					value={settings.surveyTitle}
					onChange={(e) =>
						setSettings({ ...settings, surveyTitle: e.target.value })
					}
					placeholder="アンケートのタイトルを入力"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="target-responses">目標回答数</Label>
				<Input
					id="target-responses"
					type="number"
					value={settings.targetResponses}
					onChange={(e) =>
						setSettings({
							...settings,
							targetResponses: Number.parseInt(e.target.value) || 0,
						})
					}
					placeholder="目標とする回答数を入力"
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="fetch-interval">データ更新間隔</Label>
				<Select
					value={settings.fetchInterval.toString()}
					onValueChange={(value) =>
						setSettings({ ...settings, fetchInterval: Number.parseInt(value) })
					}
				>
					<SelectTrigger>
						<SelectValue placeholder="更新間隔を選択" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="1">1分</SelectItem>
						<SelectItem value="5">5分</SelectItem>
						<SelectItem value="10">10分</SelectItem>
						<SelectItem value="15">15分</SelectItem>
						<SelectItem value="30">30分</SelectItem>
						<SelectItem value="60">1時間</SelectItem>
					</SelectContent>
				</Select>
			</div>

			<div className="space-y-2">
				<Label htmlFor="form-url">Google Form URL</Label>
				<Input
					id="form-url"
					value={settings.formUrl}
					onChange={(e) =>
						setSettings({ ...settings, formUrl: e.target.value })
					}
					placeholder="https://forms.google.com/..."
				/>
			</div>

			<div className="space-y-2">
				<Label htmlFor="spreadsheet-url">Google Spreadsheet URL</Label>
				<Input
					id="spreadsheet-url"
					value={settings.spreadsheetUrl}
					onChange={(e) =>
						setSettings({ ...settings, spreadsheetUrl: e.target.value })
					}
					placeholder="https://docs.google.com/spreadsheets/..."
				/>
			</div>

			<Button
				onClick={handleSaveSettings}
				className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
			>
				<Save className="h-4 w-4 mr-2" />
				設定を保存
			</Button>

			<div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-600">
				<div className="font-medium mb-1">現在の設定:</div>
				<div>• 目標: {settings.targetResponses.toLocaleString()}件</div>
				<div>• 更新間隔: {settings.fetchInterval}分</div>
				<div>• 母数: {settings.totalInvited}%</div>
			</div>
		</div>
	);
};
