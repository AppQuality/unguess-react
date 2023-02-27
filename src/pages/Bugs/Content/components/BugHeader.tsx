import {
  IconButton,
  theme as globalTheme,
  Tooltip,
  Tag,
} from '@appquality/unguess-design-system';
import { useAppDispatch } from 'src/app/hooks';
import { ReactComponent as CloseIcon } from 'src/assets/icons/close-icon.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/external-link-icon.svg';
import { ReactComponent as FatherIcon } from 'src/assets/icons/bug-type-unique.svg';
import { Bug } from 'src/features/api';
import { selectBug } from 'src/features/bugsPage/bugsPageSlice';
import styled from 'styled-components';
import { ShareButton } from 'src/common/components/BugDetail/ShareBug';
import { Link } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useTranslation } from 'react-i18next';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  padding: 0 ${globalTheme.space.lg};
  padding-top: ${globalTheme.space.lg};
  position: sticky;
  top: 0;
  background-color: white;
  width: 100%;
  z-index: ${globalTheme.levels.front};
`;

const ActionDetailPreview = styled.div`
  margin-left: auto;
`;

export default ({
  bug,
}: {
  bug: Bug & {
    reporter: {
      tester_id: number;
      name: string;
    };
  };
}) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <Container>
      <Tag isRegular hue="rgba(0,0,0,0)">
        {!bug.duplicated_of_id && (
          <Tag.Avatar>
            <FatherIcon
              style={{
                color: globalTheme.palette.grey[500],
                marginRight: globalTheme.space.xxs,
              }}
            />
          </Tag.Avatar>
        )}
        ID
        <Tag.SecondaryText isBold>{bug.id}</Tag.SecondaryText>
      </Tag>
      <ActionDetailPreview>
        <Link
          to={useLocalizeRoute(`campaigns/${bug.campaign_id}/bugs/${bug.id}`)}
        >
          <Tooltip
            content={t('__BUGS_PAGE_VIEW_BUG_TOOLTIP')}
            size="large"
            type="light"
            placement="bottom-end"
            hasArrow={false}
          >
            <IconButton size="small">
              <LinkIcon />
            </IconButton>
          </Tooltip>
        </Link>

        <ShareButton bug={bug} />

        <Tooltip
          content={t('__BUGS_PAGE_CLOSE_DETAILS_TOOLTIP')}
          size="large"
          type="light"
          placement="bottom-end"
          hasArrow={false}
        >
          <IconButton
            size="small"
            onClick={() => {
              dispatch(
                selectBug({
                  bug_id: undefined,
                })
              );
            }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </ActionDetailPreview>
    </Container>
  );
};
