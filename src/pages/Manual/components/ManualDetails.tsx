import { Title, Editor } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { AnimatedContainer } from 'src/common/components/animatedContainer';
import { appTheme } from 'src/app/theme';
import { ManualResponse } from 'src/features/backoffice';

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
}) => (
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
  </AnimatedContainer>
);
