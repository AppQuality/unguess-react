import { SunburstData } from './types';

const getChildrenValue = (data: SunburstData): number => {
  if (data.value) {
    return data.value;
  }

  if (data.children) {
    return data.children.reduce((acc, item) => acc + getChildrenValue(item), 0);
  }
  return 0;
};

export { getChildrenValue };
