import { SM, Tooltip, Tag } from '@appquality/unguess-design-system';
import { ReactComponent as NeedReviewIcon } from 'src/assets/icons/pill-icon-need-review.svg';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';

export const NeedReviewTag = () => {
  const { t } = useTranslation();
  return (
    <Tooltip
      appendToNode={document.body}
      type="light"
      content={t('__BUGS_PAGE_BUG_DETAIL_NEED_REVIEW_TOOLTIP')}
    >
      <div>
        <SM tag="span" style={{ marginRight: appTheme.space.xxs }}>
          {t('__BUGS_PAGE_BUG_DETAIL_NEED_REVIEW')}
        </SM>
        <Tag hue="rgba(0,0,0,0)" isRound>
          <NeedReviewIcon />
        </Tag>
      </div>
    </Tooltip>
  );
};
