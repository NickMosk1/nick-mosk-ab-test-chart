import domtoimage from 'dom-to-image';
import { Nullable } from '../types';

export const handleExport = async (
  target?: Nullable<HTMLElement>,
  description: string = "file",
) => {
  console.log('handleExport called with:', { target, description });
  
  if (!target) {
    console.error('Chart element not found for export');
    return;
  };

  try {
    console.log('Starting dom-to-image conversion...');
    
    const dataUrl = await domtoimage.toPng(target, {
      quality: 1.0,
      width: target.clientWidth,
      height: target.clientHeight,
      style: {
        transform: 'none',
        backgroundColor: '#ffffff'
      }
    });
    
    console.log('dom-to-image successful, dataUrl length:', dataUrl.length);
    
    const link = document.createElement('a');
    link.download = `${description}-${new Date().toISOString().split('T')[0]}.png`;
    link.href = dataUrl;
    
    console.log('Created link, triggering download...');
    
    link.click();
    
    console.log('Download triggered successfully');
    
  } catch (error) {
    console.error('Error exporting chart:', error);
  };
};
