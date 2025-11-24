import domtoimage from 'dom-to-image';
import { Nullable } from '../types';

export const handleExport = async (
  target?: Nullable<HTMLElement>,
  description: string = "file",
) => {
  if (!target) {
    console.error('Chart element not found for export');
    return;
  }

  try {
    const dataUrl = await domtoimage.toPng(target, {
      quality: 1.0,
      width: target.clientWidth,
      height: target.clientHeight,
      style: {
        transform: 'none',
        backgroundColor: '#ffffff'
      }
    });
    
    const link = document.createElement('a');
    link.download = `${description}-${new Date().toISOString().split('T')[0]}.png`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error('Error exporting chart:', error);
  }
};
