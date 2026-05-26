export type UploadFileType =
  | 'document'
  | 'presentation'
  | 'image'
  | 'pdf'
  | 'zip'
  | 'spreadsheet'
  | 'generic';

export const getFileType = (file: File): UploadFileType => {
  const { type, name } = file;

  if (type.startsWith('image/')) return 'image';
  if (type === 'application/pdf') return 'pdf';
  if (type.includes('zip') || name.endsWith('.zip')) return 'zip';
  if (
    type.includes('sheet') ||
    type.includes('excel') ||
    name.endsWith('.csv')
  ) {
    return 'spreadsheet';
  }
  if (
    type.includes('presentation') ||
    name.endsWith('.ppt') ||
    name.endsWith('.pptx')
  ) {
    return 'presentation';
  }
  if (type.startsWith('audio/') || type.startsWith('video/')) return 'generic';

  return 'document';
};
