import {
  getColor,
  IconButton,
  SM,
  Tooltip,
} from '@appquality/unguess-design-system';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info-icon.svg';
import styled from 'styled-components';

const ExpertReviewWarningStyled = styled.div`
  &:before {
    content: '';
    flex-shrink: 0;
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background-color: ${(p) => p.theme.palette.yellow[500]};
  }
  font-size: ${({ theme }) => theme.fontSizes.sm};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  color: ${(p) => getColor(p.theme.colors.warningHue, 700)};
`;

export const ExpertReviewWarning = (
  props: React.ComponentProps<typeof ExpertReviewWarningStyled>
) => {
  const { t } = useTranslation();

  return (
    <ExpertReviewWarningStyled {...props}>
      <SM as="span">{t('__PLAN_PAGE_EXPERT_REVIEW_WARNING')}</SM>
      <Tooltip
        appendToNode={document.body}
        type="light"
        content={t('__PLAN_PAGE_EXPERT_REVIEW_TOOLTIP_CONTENT')}
      >
        <IconButton>
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </ExpertReviewWarningStyled>
  );
};
