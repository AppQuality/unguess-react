import { MD, UnorderedList } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { PurchasablePlanRules } from 'src/features/api';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.space.md};
  > div {
    background-color: ${({ theme }) => theme.palette.grey[100]};
    border-radius: 8px;
    border: 1px solid ${({ theme }) => theme.palette.grey[200]};
    padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  }
  ${MD} {
    color: ${({ theme }) => theme.palette.teal[700]};
    margin-bottom: ${({ theme }) => theme.space.xs};
  }
`;

export const PurchasablePlanRulesGuide = ({
  failedRules,
}: {
  failedRules: PurchasablePlanRules[];
}) => {
  const { t } = useTranslation();

  const getRuleDescription = (rule: PurchasablePlanRules) => {
    switch (rule) {
      case 'number_of_modules':
        return t('__PLAN_RULE_NUMBER_OF_MODULES');
      case 'module_type':
        return t('__PLAN_RULE_MODULE_TYPE');
      case 'number_of_testers':
        return t('__PLAN_RULE_NUMBER_OF_TESTERS');
      case 'number_of_tasks':
        return t('__PLAN_RULE_NUMBER_OF_TASKS');
      case 'task_type':
        return t('__PLAN_RULE_TASK_TYPE');
      default:
        return rule;
    }
  };

  return (
    <Wrapper data-qa="purchasable-plan-rules">
      <div>
        <MD isBold>{t('__PLAN_RULES_CHANGED_LIST')}</MD>
        <UnorderedList>
          {failedRules.map((rule) => (
            <li key={rule}>{getRuleDescription(rule)}</li>
          ))}
        </UnorderedList>
      </div>
      <div>
        <MD isBold>{t('__PLAN_RULES_WHAT_MEANS')}</MD>
        <UnorderedList>
          <li>{t('__PLAN_RULES_WHAT_MEANS_DESCRIPTION_1')}</li>
          <li>{t('__PLAN_RULES_WHAT_MEANS_DESCRIPTION_2')}</li>
          <li>{t('__PLAN_RULES_WHAT_MEANS_DESCRIPTION_3')}</li>
        </UnorderedList>
      </div>
    </Wrapper>
  );
};
