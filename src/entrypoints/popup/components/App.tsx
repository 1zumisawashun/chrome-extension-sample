import type { FC } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dashboard } from "./Dashboard";
import { Setting } from "./Setting";

export const App: FC = () => {
	return (
		<div className="w-80 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-[400px]">
			<Tabs defaultValue="dashboard" className="w-full">
				<TabsList className="grid w-full grid-cols-2">
					<TabsTrigger value="dashboard" className="flex items-center gap-2">
						ダッシュボード
					</TabsTrigger>
					<TabsTrigger value="settings" className="flex items-center gap-2">
						設定
					</TabsTrigger>
				</TabsList>
				<TabsContent value="dashboard" className="mt-0">
					<Dashboard />
				</TabsContent>
				<TabsContent value="settings" className="mt-0">
					<Setting />
				</TabsContent>
			</Tabs>
		</div>
	);
};
