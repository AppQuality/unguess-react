import { Accordion, LG, Button } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { theme as globalTheme } from 'src/app/theme';
import { useSiblings } from './useSiblings';
import { BugDuplicatesList } from './BugDuplicatesList';
import { BugFather } from './BugFather';
import { ReactComponent as LinkIcon } from './icons/linked.svg';

export const BugDuplicates = ({
  cid,
  bugId,
}: {
  cid: number;
  bugId: number;
}) => {
  const MAX_SIBLING_SIZE = 3;
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const { data, isLoading, isFetching, isError } = useSiblings({ cid, bugId });

  if (isLoading || isFetching || isError || !data) return null;

  return (
    <Accordion level={3} style={{ padding: 0 }}>
      <Accordion.Section>
        <Accordion.Header>
          <Accordion.Label style={{ padding: 0 }}>
            <LG isBold>
              <LinkIcon
                style={{
                  color: globalTheme.palette.grey[600],
                  marginRight: globalTheme.space.xs,
                }}
              />
              {t('__BUGS_PAGE_BUG_DETAIL_DUPLICATES_ACCORDION_TITLE')}
            </LG>
          </Accordion.Label>
        </Accordion.Header>
        <Accordion.Panel
          style={{ padding: 0, paddingTop: globalTheme.space.sm }}
        >
          <BugFather cid={cid} bugId={bugId} />
          <BugDuplicatesList
            maxSiblingSize={MAX_SIBLING_SIZE}
            isOpen={isOpen}
            cid={cid}
            bugId={bugId}
          />
          {!isOpen && data.siblings.length > MAX_SIBLING_SIZE ? (
            <Button isBasic onClick={() => setIsOpen(!isOpen)}>
              <Trans key="__BUGS_PAGE_BUG_DETAIL_SIBLINGS_SHOW_MORE">
                Show more +{{ number: data.siblings.length - MAX_SIBLING_SIZE }}
              </Trans>
            </Button>
          ) : null}
        </Accordion.Panel>
      </Accordion.Section>
    </Accordion>
  );
};
