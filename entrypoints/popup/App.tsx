import { useEffect, useState, FC } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, ExternalLink, Users, Clock } from "lucide-react";
import { dateFormatter } from "./formatter";
import { Odometer } from "./Odometer";

const URL = {
  googleAppsScript: import.meta.env.WXT_GAS_URL,
  googleForm: import.meta.env.WXT_GOOGLE_FORM_URL,
  googleSpreadsheet: import.meta.env.WXT_GOOGLE_SPREADSHEET_URL,
};

const YEAR_MONTH = dateFormatter(new Date(), "YYYY年M月");
const LAST_UPDATED = dateFormatter(new Date(), "YYYY/MM/DD HH:mm:ss");

export const App: FC = () => {
  const [responseCount, setResponseCount] = useState(0);
  const [lastUpdated, setLastUpdated] = useState(LAST_UPDATED);
  const [isPending, setIsPending] = useState(false);

  useEffect(() => {
    const fetchDataPeriodically = async () => {
      try {
        const response = await fetch(URL.googleAppsScript);
        const json = await response.json();
        setResponseCount(json.responseCount);
        setLastUpdated(dateFormatter(new Date(), "YYYY/MM/DD HH:mm:ss"));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // NOTE: 仮決めで5秒ごとにデータを取得する
    const interval = setInterval(fetchDataPeriodically, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleRefetch = async () => {
    setIsPending(true);
    try {
      const response = await fetch(URL.googleAppsScript);
      const json = await response.json();
      setResponseCount(json.responseCount);
      setLastUpdated(dateFormatter(new Date(), "YYYY/MM/DD HH:mm:ss"));
    } catch (error) {
      console.error("Error refetching data:", error);
    } finally {
      setIsPending(false);
    }
  };

  const progressPercentage = (() => {
    // NOTE: 月次共有会に招待された人数
    const totalInvited = 300;
    const progress = (responseCount / totalInvited) * 100;
    const width = `${Math.min(progress, 100)}%`;
    const display = `${Math.round(progress)}%`;
    return { width, display };
  })();

  return (
    <div className="w-80 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-[400px]">
      <Card className="shadow-lg border-0 gap-4">
        <CardHeader className="gap-0">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-gray-800 leading-tight">
              月次共有会
            </CardTitle>
            <Badge
              variant="default"
              className="bg-blue-100 text-blue-800 hover:bg-blue-100"
            >
              {YEAR_MONTH} 実施
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg p-4">
            <div className="flex items-center justify-center gap-2 mb-1">
              <Users className="h-5 w-5" />
              <span className="text-sm font-medium">アンケート回答数</span>
            </div>
            <div className="text-3xl font-bold">
              <Odometer value={responseCount} format="(.ddd),dd" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>進捗状況</span>
              <span>{progressPercentage.display}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                style={{ width: progressPercentage.width }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Clock className="h-3 w-3" />
            <span>最終更新: {lastUpdated}</span>
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
    </div>
  );
};
