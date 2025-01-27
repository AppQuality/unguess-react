import { Button, AccordionNew } from '@appquality/unguess-design-system';
import { useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { useBugPreviewContext } from 'src/pages/Bugs/Content/context/BugPreviewContext';
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
  const { data } = useSiblings({ cid, bugId });
  const { openAccordions, setOpenAccordions } = useBugPreviewContext();
  const isAccordionOpen = openAccordions.includes('duplicates');

  const handleAccordionChange = () => {
    if (isAccordionOpen) {
      setOpenAccordions(openAccordions.filter((item) => item !== 'duplicates'));
    } else {
      setOpenAccordions([...openAccordions, 'duplicates']);
    }
  };

  return (
    <AccordionNew
      level={3}
      key={`duplicates_accordion_${isAccordionOpen}`}
      defaultExpandedSections={isAccordionOpen ? [0, 1] : []}
      id="bug-preview-duplicates"
      onChange={handleAccordionChange}
    >
      <AccordionNew.Section>
        <AccordionNew.Header icon={<LinkIcon />}>
          <AccordionNew.Label
            label={t('__BUGS_PAGE_BUG_DETAIL_DUPLICATES_ACCORDION_TITLE')}
          />
        </AccordionNew.Header>
        <AccordionNew.Panel>
          <BugFather cid={cid} bugId={bugId} />
          <BugDuplicatesList
            maxSiblingSize={MAX_SIBLING_SIZE}
            isOpen={isOpen}
            cid={cid}
            bugId={bugId}
          />
          {!isOpen && data && data.siblings.length > MAX_SIBLING_SIZE ? (
            <Button isBasic onClick={() => setIsOpen(!isOpen)}>
              <Trans
                count={data.siblings.length - MAX_SIBLING_SIZE}
                i18nKey="__BUGS_PAGE_BUG_DETAIL_SIBLINGS_SHOW_MORE"
              >
                Show more +{{ count: data.siblings.length - MAX_SIBLING_SIZE }}
              </Trans>
            </Button>
          ) : null}
        </AccordionNew.Panel>
      </AccordionNew.Section>
    </AccordionNew>
  );
};
