type Format = "YYYY/MM/DD HH:mm:ss" | "YYYY年M月";

export const dateFormatter = (date: Date, format: Format): string => {
	switch (format) {
		case "YYYY/MM/DD HH:mm:ss":
			return date.toLocaleDateString("ja-JP", {
				year: "numeric",
				month: "2-digit",
				day: "2-digit",
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit",
			});
		case "YYYY年M月":
			return date.toLocaleDateString("ja-JP", {
				year: "numeric",
				month: "long",
			});

		default:
			throw new Error(`Unsupported format: ${format}`);
	}
};
