import { toPng } from "html-to-image";
import { Nullable } from "@/shared/types";

export const handleExport = async (
  target?: Nullable<HTMLElement>,
  description: string = "file",
) => {
  if (!target) {
    console.error('Chart element not found for export');
    return;
  };

  try {
    const dataUrl = await toPng(target, {
      quality: 1.0,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
      cacheBust: true,
      style: { transform: 'none' },
    });

    const link = document.createElement('a');
    link.download = `${description}-${new Date().toISOString().split('T')[0]}.png`;
    link.href = dataUrl;
    link.click();

    console.log('Chart exported successfully:', target);
  } catch (error) {
    console.error('Error exporting chart:', error);
  };
};
