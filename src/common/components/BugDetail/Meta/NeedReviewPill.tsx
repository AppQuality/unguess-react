import { Tooltip } from '@appquality/unguess-design-system';
import { IconPill } from 'src/common/components/pills/IconPill';
import { ReactComponent as NeedReviewIcon } from 'src/assets/icons/pill-icon-need-review.svg';
import { useTranslation } from 'react-i18next';
import { InfoTitle } from './InfoTitle';

export const NeedReviewPill = () => {
  const { t } = useTranslation();
  return (
    <Tooltip
      appendToNode={document.body}
      type="light"
      content={t('__BUGS_PAGE_BUG_DETAIL_NEED_REVIEW_TOOLTIP')}
    >
      <span>
        <IconPill
          size="medium"
          iconPosition="right"
          title={
            <InfoTitle>{t('__BUGS_PAGE_BUG_DETAIL_NEED_REVIEW')}</InfoTitle>
          }
          icon={<NeedReviewIcon />}
        />
      </span>
    </Tooltip>
  );
};
