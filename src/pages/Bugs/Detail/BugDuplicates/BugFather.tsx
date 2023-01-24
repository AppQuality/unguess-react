import { theme as globalTheme } from 'src/app/theme';
import styled from 'styled-components';

import { MD, Paragraph } from '@appquality/unguess-design-system';
import { useSiblings } from './useSiblings';
import { ReactComponent as FatherIconSmall } from './icons/father-small.svg';
import { BugItem } from './BugItem';

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

export const BugFather = ({ cid }: { cid: number }) => {
  const { data, isLoading, isFetching, isError } = useSiblings({ cid });
  if (isLoading || isFetching || isError || !data || !data.father) return null;
  return (
    <>
      <MD isBold style={{ marginBottom: globalTheme.space.xxs }}>
        <FatherIconSmall
          style={{
            width: globalTheme.fontSizes.sm,
            marginRight: globalTheme.space.xxs,
            color: globalTheme.palette.grey[600],
          }}
        />
        Title
      </MD>
      <StyledParagraph style={{ marginBottom: globalTheme.space.xxs }}>
        subtitle
      </StyledParagraph>
      <BugItem
        isFather
        bugId={data.father.id}
        title={data.father.title.compact}
        pills={[
          ...(data.father.title.context ? data.father.title.context : []),
          `${data.father.os.name} ${data.father.os.version}`,
          data.father.device,
        ]}
      />
    </>
  );
};
