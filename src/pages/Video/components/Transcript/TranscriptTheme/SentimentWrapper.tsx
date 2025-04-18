import {
  Button,
  IconButton,
  MD,
  SM,
  Tag,
  TooltipModal,
} from '@appquality/unguess-design-system';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as LeafIcon } from 'src/assets/icons/ai-icon.svg';
import { ReactComponent as CopyIcon } from 'src/assets/icons/copy-icon.svg';
import { ReactComponent as InfoIcon } from 'src/assets/icons/info.svg';
import { useCopy } from 'src/hooks/useCopy';
import { styled, useTheme } from 'styled-components';
import { ReactComponent as NegativeIcon } from '../assets/negative.svg';
import { ReactComponent as NeutralIcon } from '../assets/neutral.svg';
import { ReactComponent as PositiveIcon } from '../assets/positive.svg';
import { ReactComponent as VeryNegativeIcon } from '../assets/very_negative.svg';
import { ReactComponent as VeryPositiveIcon } from '../assets/very_positive.svg';

const useTagData = (value: number) => {
  const { t } = useTranslation();
  const theme = useTheme();

  switch (value) {
    case 1:
      return {
        text: t('__TRANSCRIPT_SENTIMENT_VALUE_VERY_NEGATIVE'),
        color: theme.palette.red[800],
        textColor: theme.palette.red[100],
        titleColor: theme.palette.red[900],
        Icon: VeryNegativeIcon,
      };
    case 2:
      return {
        text: t('__TRANSCRIPT_SENTIMENT_VALUE_NEGATIVE'),
        color: theme.palette.red[100],
        textColor: theme.palette.red[800],
        titleColor: theme.palette.red[900],
        Icon: NegativeIcon,
      };
    case 3:
      return {
        text: t('__TRANSCRIPT_SENTIMENT_VALUE_NEUTRAL'),
        color: 'transparent',
        textColor: theme.palette.grey[600],
        titleColor: theme.palette.grey[800],
        Icon: NeutralIcon,
      };
    case 4:
      return {
        text: t('__TRANSCRIPT_SENTIMENT_VALUE_POSITIVE'),
        color: theme.palette.green[10],
        textColor: theme.palette.green[600],
        titleColor: theme.palette.green[800],
        Icon: PositiveIcon,
      };
    case 5:
      return {
        text: t('__TRANSCRIPT_SENTIMENT_VALUE_VERY_POSITIVE'),
        color: theme.palette.green[800],
        textColor: theme.palette.green[50],
        titleColor: theme.palette.green[800],
        Icon: VeryPositiveIcon,
      };
    default:
      return {
        text: '',
        color: 'grey',
        textColor: 'white',
        titleColor: 'grey',
        Icon: LeafIcon,
      };
  }
};

const StyledSM = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const TagWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Component = ({ value, text }: { value: number; text: string }) => {
  const tagData = useTagData(value);
  const { t } = useTranslation();
  const copy = useCopy({
    text,
    notification: t('__SENTIMENT_TOAST_COPY_MESSAGE'),
  });
  const theme = useTheme();
  const { Icon } = tagData;
  const ref = useRef<HTMLButtonElement>(null);
  const [referenceElement, setReferenceElement] =
    useState<HTMLButtonElement | null>(null);

  return (
    <>
      <TagWrapper>
        <Tag hue={tagData.color} color={tagData.textColor} title={text}>
          <Tag.Avatar>
            <Icon style={{ color: tagData.textColor }} />
          </Tag.Avatar>
          {tagData.text}
        </Tag>
        <IconButton
          ref={ref}
          size="small"
          onClick={() => setReferenceElement(ref.current)}
        >
          <InfoIcon color={theme.palette.blue[600]} />
        </IconButton>
      </TagWrapper>
      <TooltipModal
        referenceElement={referenceElement}
        onClose={() => setReferenceElement(null)}
      >
        <TooltipModal.Title style={{ color: tagData.titleColor }}>
          <MD isBold>{tagData.text}</MD>
        </TooltipModal.Title>
        <TooltipModal.Body>
          <StyledSM isBold>{text}</StyledSM>
        </TooltipModal.Body>
        <TooltipModal.Footer>
          <div style={{ width: '100%' }}>
            <Button size="small" onClick={() => copy()}>
              <Button.StartIcon>
                <CopyIcon color={theme.palette.blue[600]} />
              </Button.StartIcon>
              Copy
            </Button>
          </div>
        </TooltipModal.Footer>
      </TooltipModal>
    </>
  );
};

export default Component;
