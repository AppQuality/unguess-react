import { Anchor, LG, MD } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

const Title = styled(LG)`
  margin-bottom: ${({ theme }) => theme.space.xxs};
  color: ${({ theme }) => theme.palette.blue[600]};
`;
const Text = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[700]};
`;

export const MethodologyNote = ({
  title,
  text,
}: {
  title: string;
  text: string;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();
  const CHARS_LIMIT = 85;

  return (
    <>
      <Title isBold>{title}</Title>
      {text.length < CHARS_LIMIT && <Text>{text}</Text>}

      {text.length > CHARS_LIMIT && (
        <>
          <Text>
            {isExpanded ? text : `${text.substring(0, CHARS_LIMIT)}...`}
          </Text>
          <Anchor onClick={() => setIsExpanded(!isExpanded)}>
            {isExpanded
              ? t('__CAMPAIGN_PAGE_METHODOLOGY_SHOW_LESS')
              : t('__CAMPAIGN_PAGE_METHODOLOGY_SHOW_MORE')}
          </Anchor>
        </>
      )}
    </>
  );
};
