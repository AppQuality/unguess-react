import { components } from 'src/common/schema';

export type FormBody = {
  status: string;
  modules: components['schemas']['Module'][];
};
