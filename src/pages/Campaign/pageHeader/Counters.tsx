import { Counter } from '@appquality/unguess-design-system';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { Campaign } from 'src/features/api';

const Pipe = styled.span`
  /** Vertical Separator */
  border-left: 1px solid ${({ theme }) => theme.palette.grey[300]};
  height: ${({ theme }) => theme.space.lg};
  margin-right: ${({ theme }) => theme.space.sm};
  display: inline;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    width: 100%;
    height: 0;
    margin: 0;
  }
`;

export const Counters: FC<{ campaign: Campaign }> = ({ campaign }) => {
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
      }}
    >
      <div>
        <Counter status="functional">{campaign.type.name}</Counter>
        <Counter status="progress">{campaign.type.name}</Counter>
        <Counter status="completed">{campaign.type.name}</Counter>
        <Counter status="incoming">{campaign.type.name}</Counter>
        <Counter status="experiential">{campaign.type.name}</Counter>
        <Pipe />
        <Counter status="functional">
          {t('__DASHABOARD_COUNTER_LABEL_FUNCTIONAL')}
        </Counter>
      </div>
      <div>bottone</div>
    </div>
  );
};
