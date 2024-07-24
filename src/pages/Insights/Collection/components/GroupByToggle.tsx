import {
  getColor,
  IconButton,
  Tooltip,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { GetCampaignsByCidObservationsApiArg } from 'src/features/api';
import { styled } from 'styled-components';
import { ReactComponent as GroupedStroke } from '@zendeskgarden/svg-icons/src/16/rearrange-stroke.svg';
import { ReactComponent as GroupedFill } from '@zendeskgarden/svg-icons/src/16/rearrange-fill.svg';
import { ReactComponent as UngroupedStroke } from '@zendeskgarden/svg-icons/src/16/grid-2x2-stroke.svg';
import { ReactComponent as UngroupedFill } from '@zendeskgarden/svg-icons/src/16/grid-2x2-fill.svg';
import { appTheme } from 'src/app/theme';

interface Props {
  groupBy: GetCampaignsByCidObservationsApiArg['groupBy'];
  setGroupBy: (value: GetCampaignsByCidObservationsApiArg['groupBy']) => void;
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.space.md};
  gap: ${({ theme }) => theme.space.sm};
`;

export const GroupByToggle = ({ groupBy, setGroupBy }: Props) => {
  const { t } = useTranslation();

  return (
    <Wrapper>
      <Tooltip content={t('__INSIGHTS_PAGE_COLLECTION_GROUP_BY_USECASE')}>
        <IconButton
          onClick={() => setGroupBy('usecase-grapes')}
          isPrimary={groupBy === 'usecase-grapes'}
        >
          {groupBy === 'usecase-grapes' ? (
            <GroupedStroke />
          ) : (
            <GroupedFill color={getColor(appTheme.colors.neutralHue, 600)} />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip content={t('__INSIGHTS_PAGE_COLLECTION_UNGROUP')}>
        <IconButton
          onClick={() => setGroupBy(undefined)}
          isPrimary={typeof groupBy === 'undefined'}
        >
          <UngroupedFill
            color={
              groupBy === 'usecase-grapes'
                ? getColor(appTheme.colors.neutralHue, 600)
                : 'white'
            }
          />
        </IconButton>
      </Tooltip>
    </Wrapper>
  );
};
