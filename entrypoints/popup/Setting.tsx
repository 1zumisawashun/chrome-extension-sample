import { Save } from "lucide-react";
import { type ChangeEvent, type FC, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { INIT_SETTING } from "./constants";

export const Setting: FC = () => {
	const [setting, setSetting] = useState(INIT_SETTING);
	const [savedData, setSavedData] = useState(INIT_SETTING);

	useEffect(() => {
		chrome.storage.local.get(["setting"]).then((result) => {
			setSetting(result.setting ?? INIT_SETTING);
			setSavedData(result.setting ?? INIT_SETTING);
		});
	}, [setSetting, setSavedData]);

	const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
		const title = e.target.value ?? "";
		setSetting({ ...setting, title });
	};

	const handleTotalInvited = (e: ChangeEvent<HTMLInputElement>) => {
		const totalInvited = Number.parseInt(e.target.value) || 0;
		setSetting({ ...setting, totalInvited });
	};

	const handleFetchInterval = (value: string) => {
		const fetchInterval = Number.parseInt(value) || 10000;
		setSetting({ ...setting, fetchInterval });
	};

	const handleSave = () => {
		chrome.storage.local.set({ setting });
		setSavedData(setting);
	};

	return (
		<Card className="shadow-lg border-0 gap-4">
			<CardContent className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="title">タイトル</Label>
					<Input
						id="title"
						value={setting.title}
						onChange={handleTitle}
						placeholder="タイトルを入力してください"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="total-invited">回答者数</Label>
					<Input
						id="total-invited"
						type="number"
						value={setting.totalInvited}
						onChange={handleTotalInvited}
						placeholder="回答者数を入力してください"
					/>
				</div>

				<div className="space-y-2">
					<Label htmlFor="fetch-interval">更新間隔</Label>
					<Select
						value={setting.fetchInterval.toString()}
						onValueChange={handleFetchInterval}
					>
						<SelectTrigger className="w-full">
							<SelectValue placeholder="更新間隔を選択してください" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1000">1秒</SelectItem>
							<SelectItem value="5000">5秒</SelectItem>
							<SelectItem value="10000">10秒</SelectItem>
							<SelectItem value="15000">15秒</SelectItem>
							<SelectItem value="30000">30秒</SelectItem>
							<SelectItem value="60000">60秒</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<Button
					onClick={handleSave}
					className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
				>
					<Save className="h-4 w-4 mr-2" />
					設定を保存
				</Button>

				<div className="p-3 bg-gray-100 rounded-lg text-xs text-gray-600">
					<div className="font-medium mb-1">▼ 現在の設定</div>
					<div>- タイトル: {savedData.title}</div>
					<div>- 回答者数: {savedData.totalInvited}人</div>
					<div>- 更新間隔: {savedData.fetchInterval / 1000}秒</div>
				</div>
			</CardContent>
		</Card>
	);
};
