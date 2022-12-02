export interface SunburstData {
  name: string;
  label?: string;
  children?: SunburstData[];
  value?: number;
  [key: string]: SunburstData[keyof SunburstData] | string | number | boolean;
}
