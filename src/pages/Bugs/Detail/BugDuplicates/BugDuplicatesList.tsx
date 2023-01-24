import { theme as globalTheme } from 'src/app/theme';
import styled from 'styled-components';

import { MD, Paragraph } from '@appquality/unguess-design-system';
import { useSiblings } from './useSiblings';
import { ReactComponent as SiblingIconSmall } from './icons/siblings-small.svg';
import { BugItem } from './BugItem';

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

export const BugDuplicatesList = ({
  cid,
  isOpen,
  maxSiblingSize,
}: {
  cid: number;
  isOpen: boolean;
  maxSiblingSize?: number;
}) => {
  const { data, isLoading, isFetching, isError } = useSiblings({ cid });
  if (isLoading || isFetching || isError || !data || !data.siblings.length)
    return null;

  return (
    <>
      <MD isBold style={{ marginBottom: globalTheme.space.xxs }}>
        <SiblingIconSmall
          style={{
            width: globalTheme.fontSizes.sm,
            marginRight: globalTheme.space.xxs,
            color: globalTheme.palette.grey[600],
          }}
        />{' '}
        Title ({data.siblings.length})
      </MD>
      <StyledParagraph style={{ marginBottom: globalTheme.space.xxs }}>
        subtitle
      </StyledParagraph>
      {data.siblings
        .slice(0, isOpen ? data.siblings.length : maxSiblingSize)
        .map((item) => (
          <BugItem
            key={item.id}
            bugId={item.id}
            title={item.title.compact}
            pills={[
              ...(item.title.context ? item.title.context : []),
              `${item.os.name} ${item.os.version}`,
              item.device,
            ]}
          />
        ))}
    </>
  );
};
