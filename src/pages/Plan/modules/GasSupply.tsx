// src/pages/Plan/modules/BankGeneric.tsx

import { useTranslation } from 'react-i18next';
import React from 'react';
import { CheckboxModuleFactory } from './CheckboxModuleFactory';

const GasSupply: React.FC = () => {
  const { t } = useTranslation();
  return (
    <CheckboxModuleFactory
      type="gas_supply"
      moduleLabel={t('__PLAN_PAGE_MODULE_BANK_LABEL')}
      title={t('__PLAN_PAGE_MODULE_BANK_TITLE')}
      allLabel={t('__PLAN_PAGE_MODULE_BANK_ALL_LABEL')}
      allHint={t('__PLAN_PAGE_MODULE_BANK_ALL_LABEL_HINT')}
      otherPlaceholder={t('__PLAN_PAGE_MODULE_OTHER_BANK_TEXTAREA_PLACEHOLDER')}
      options={[
        { label: 'Enel Energia', value: 'Enel Energia' },
        { label: 'Eni Plenitude', value: 'Eni Plenitude' },
        { label: 'A2A Energia', value: 'A2A Energia' },
        { label: 'Other providers', value: 'other', isOther: true },
      ]}
    />
  );
};

export default GasSupply;
