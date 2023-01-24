import { Accordion, LG, Button } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { useSiblings } from './useSiblings';
import { BugDuplicatesList } from './BugDuplicatesList';
import { BugFather } from './BugFather';

export const BugDuplicates = ({ cid }: { cid: number }) => {
  const MAX_SIBLING_SIZE = 3;
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
          <BugDuplicatesList
            maxSiblingSize={MAX_SIBLING_SIZE}
            isOpen={isOpen}
            cid={cid}
          />
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
