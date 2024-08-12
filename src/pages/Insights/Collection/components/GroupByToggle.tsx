import {
  getColor,
  IconButton,
  Tooltip,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';
import { ReactComponent as UngroupedFill } from '@zendeskgarden/svg-icons/src/16/grid-2x2-fill.svg';
import { appTheme } from 'src/app/theme';
import { ReactComponent as GroupedFill } from 'src/assets/icons/layers_icon.svg';
import { ReactComponent as GroupedFillGrey } from 'src/assets/icons/layers_icon-grey.svg';
import { useInsightContext } from '../../InsightContext';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

export const GroupByToggle = () => {
  const { t } = useTranslation();
  const { groupObservationsBy, setGroupObservationsBy } = useInsightContext();

  return (
    <Wrapper>
      <Tooltip
        size="small"
        type="light"
        content={t('__INSIGHTS_PAGE_COLLECTION_GROUP_BY_USECASE')}
      >
        <IconButton
          onClick={() => setGroupObservationsBy('usecase-grapes')}
          isPrimary={groupObservationsBy === 'usecase-grapes'}
        >
          {groupObservationsBy === 'usecase-grapes' ? (
            <GroupedFill />
          ) : (
            <GroupedFillGrey />
          )}
        </IconButton>
      </Tooltip>
      <Tooltip
        size="small"
        type="light"
        content={t('__INSIGHTS_PAGE_COLLECTION_UNGROUP')}
      >
        <IconButton
          onClick={() => setGroupObservationsBy(undefined)}
          isPrimary={typeof groupObservationsBy === 'undefined'}
        >
          <UngroupedFill
            color={
              groupObservationsBy === 'usecase-grapes'
                ? getColor(appTheme.colors.neutralHue, 600)
                : 'white'
            }
          />
        </IconButton>
      </Tooltip>
    </Wrapper>
  );
};
