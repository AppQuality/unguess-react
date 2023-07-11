import { Button, Title, Editor } from '@appquality/unguess-design-system';
// import { ReactComponent as BugIcon } from 'src/assets/icons/bugs-icon.svg';
import { ReactComponent as BugIcon } from 'src/assets/icons/edit-icon.svg';
import styled from 'styled-components';
import { AnimatedContainer } from 'src/common/components/animatedContainer';
import { appTheme } from 'src/app/theme';
import { ManualResponse } from 'src/features/backoffice';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const StyledDiv = styled.div`
  > div:focus {
    box-shadow: none;
    outline: none;
  }
  > div {
    padding: 0;
  }
`;

export const ManualDetails = ({
  manual,
}: {
  manual: NonNullable<ManualResponse['data']>['attributes'] & { id: number };
}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/campaigns/${manual.campaignId}/bugform`);
  };
  const { t } = useTranslation();

  return (
    <AnimatedContainer>
      {/* Title */}
      <Title
        style={{
          marginBottom: appTheme.space.md,
          fontSize: appTheme.fontSizes.xxl,
        }}
      >
        {manual.title}
      </Title>

      {/* Editor */}
      <StyledDiv>
        <Editor editable={false}>{manual.content}</Editor>
      </StyledDiv>

      <Button
        isAccent
        style={{ marginTop: appTheme.space.md }}
        onClick={handleClick}
        isPrimary
      >
        <Button.StartIcon>
          <BugIcon fill={appTheme.palette.white} />
        </Button.StartIcon>
        {t('__PUBLIC_MANUAL_CTA_GOTO_BUG_FORM')}
      </Button>
    </AnimatedContainer>
  );
};
