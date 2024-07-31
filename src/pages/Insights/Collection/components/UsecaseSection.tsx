import { Accordion, LG, SM, Tag, XL } from '@appquality/unguess-design-system';
import { v4 as uuidv4 } from 'uuid';
import { useMemo, useState } from 'react';
import { styled } from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Grape as GrapeType } from 'src/features/api';
import { ReactComponent as TitleIcon } from '@zendeskgarden/svg-icons/src/12/copy-stroke.svg';
import { appTheme } from 'src/app/theme';
import { ReactComponent as ObservationsIcon } from '@zendeskgarden/svg-icons/src/12/tag-stroke.svg';
import { ObservationCard } from '../ObservationCard';
import { CardGrid } from './CardGrid';
import { Grape } from './AccordionSection';

interface UsecaseSectionProps {
  usecaseId: number;
  usecaseTitle: string;
  grapes: GrapeType[];
  ungrouped: GrapeType['observations'];
}

const StyledSection = styled.section`
  margin-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

export const UsecaseSection = ({
  usecaseId,
  usecaseTitle,
  grapes,
  ungrouped,
}: UsecaseSectionProps) => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const memoizedGrapes = useMemo(
    () =>
      grapes.map((grape) => ({
        ...grape,
        internalId: uuidv4(),
      })),
    [grapes]
  );
  const observationsCount = useMemo(
    () =>
      grapes.reduce(
        (acc, grape) => acc + grape.observations.length,
        ungrouped.length
      ),
    [ungrouped, memoizedGrapes]
  );

  const UsecaseTitle = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: ${({ theme }) => theme.space.md};
  `;

  return (
    <StyledSection>
      <UsecaseTitle style={{ marginBottom: appTheme.space.sm }}>
        <XL style={{ flex: '1 0 auto' }}>
          <h3>{usecaseTitle}</h3>
        </XL>
        <div style={{ flex: '0 0 auto' }}>
          <Tag style={{ marginRight: '4px' }} isRound hue="" size="medium">
            <TitleIcon />
          </Tag>{' '}
          <SM isBold style={{ display: 'inline', marginRight: '20px' }}>
            {grapes.length}{' '}
          </SM>
          <Tag style={{ marginRight: '4px' }} isRound hue="" size="medium">
            <ObservationsIcon />
          </Tag>{' '}
          <SM isBold style={{ display: 'inline' }}>
            {observationsCount} obs
          </SM>
        </div>
      </UsecaseTitle>

      <Accordion
        id={usecaseId.toString()}
        level={3}
        isExpandable
        defaultExpandedSections={[]}
        onChange={() => setIsOpen(!isOpen)}
        isBare
      >
        {memoizedGrapes.length > 0 && (
          <>
            <LG
              isBold
              color={appTheme.palette.grey[600]}
              style={{ marginBottom: appTheme.space.md }}
            >
              {t('INSIGHT_PAGE_COLLECTION_USECASE_SUBTITTLE')}
            </LG>
            {memoizedGrapes.map((grape) => (
              <Grape isOpen={isOpen} key={grape.internalId} grape={grape} />
            ))}
          </>
        )}
        {ungrouped.length > 0 && (
          <>
            <LG
              isBold
              color={appTheme.palette.grey[600]}
              style={{ marginBottom: appTheme.space.md }}
            >
              {t('INSIGHT_PAGE_COLLECTION_UNGROUPED_USECASE_SUBTITTLE')}
            </LG>
            <CardGrid>
              {ungrouped.map((observation) => (
                <ObservationCard
                  key={observation.id}
                  observation={observation}
                />
              ))}
            </CardGrid>
          </>
        )}
      </Accordion>
    </StyledSection>
  );
};
