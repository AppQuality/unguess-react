import { components } from 'src/common/schema';

export type BankType = {
  name: components['schemas']['OutputServiceProviders'][number]['name'];
  isOther: components['schemas']['OutputServiceProviders'][number]['isOther'];
};
