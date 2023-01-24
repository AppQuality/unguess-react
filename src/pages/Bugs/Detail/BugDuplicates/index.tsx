import { BugCard } from 'src/pages/Campaign/widgets/BugCard';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import {
  Accordion,
  LG,
  MD,
  Paragraph,
  Span,
  Button,
} from '@appquality/unguess-design-system';
import { Pill } from 'src/common/components/pills/Pill';
import { useState } from 'react';
import { useSiblings } from './useSiblings';
import { ReactComponent as FatherIcon } from './icons/father.svg';
import { ReactComponent as SiblingIcon } from './icons/sibling.svg';
import { ReactComponent as SiblingIconSmall } from './icons/siblings-small.svg';
import { ReactComponent as FatherIconSmall } from './icons/father-small.svg';

const StyledParagraph = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const StyledBugCard = styled(BugCard)`
  margin-bottom: ${({ theme }) => theme.space.base * 4}px;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: default;
`;
const BugCardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const BugCardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
`;

const BugItem = ({
  isFather,
  bugId,
  title,
  pills,
}: {
  isFather?: boolean;
  bugId: number;
  title: string;
  pills: string[];
}) => {
  const a = 1;
  return (
    <StyledBugCard borderColor={globalTheme.palette.grey[500]}>
      {() => (
        <>
          {isFather ? <FatherIcon /> : <SiblingIcon />}
          <BugCardInfo style={{ marginLeft: globalTheme.space.sm }}>
            <BugCard.TopTitle>ID {bugId}</BugCard.TopTitle>
            <BugCard.Title>
              <BugCardContent>
                <Span>{title}</Span>
              </BugCardContent>
            </BugCard.Title>
            {pills ? (
              <BugCard.Footer>
                {pills.map((pill) => (
                  <Pill>{pill}</Pill>
                ))}
              </BugCard.Footer>
            ) : null}
          </BugCardInfo>
        </>
      )}
    </StyledBugCard>
  );
};

const BugFather = ({ cid }: { cid: number }) => {
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

const MAX_SIBLING_SIZE = 3;
const BugSiblingsOrChildren = ({
  cid,
  isOpen,
}: {
  cid: number;
  isOpen: boolean;
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
        .slice(0, isOpen ? data.siblings.length : MAX_SIBLING_SIZE)
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

export const BugDuplicates = ({ cid }: { cid: number }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isFetching, isError } = useSiblings({ cid });

  if (isLoading || isFetching || isError || !data) return null;

  return (
    <Accordion level={3} style={{ padding: 0 }}>
      <Accordion.Section>
        <Accordion.Header>
          <Accordion.Label style={{ padding: 0 }}>
            <LG isBold>Title</LG>
          </Accordion.Label>
        </Accordion.Header>
        <Accordion.Panel style={{ padding: 0 }}>
          <BugFather cid={cid} />
          <BugSiblingsOrChildren isOpen={isOpen} cid={cid} />
          {!isOpen && data.siblings.length > MAX_SIBLING_SIZE ? (
            <Button isBasic onClick={() => setIsOpen(!isOpen)}>
              Open +{data.siblings.length - MAX_SIBLING_SIZE}
            </Button>
          ) : null}
        </Accordion.Panel>
      </Accordion.Section>
    </Accordion>
  );
};
