import { Accordion, LG, Tag } from '@appquality/unguess-design-system';
import { v4 as uuidv4 } from 'uuid';
import { useMemo } from 'react';
import { styled } from 'styled-components';
import { Grape as GrapeType } from 'src/features/api';
import { Grape } from './Grape';
import { ObservationCard } from './ObservationCard';
import { CardGrid } from './CardGrid';

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
      <UsecaseTitle>
        <LG style={{ flex: '1 0 auto' }}>
          <h3>{usecaseTitle}</h3>
        </LG>
        <div style={{ flex: '0 0 auto' }}>
          <Tag hue="" size="small" /> <small>{grapes.length} tit</small>{' '}
          <Tag hue="" size="small" /> <small>{observationsCount} obs</small>
        </div>
      </UsecaseTitle>
      <Accordion
        id={usecaseId.toString()}
        level={3}
        isExpandable
        defaultExpandedSections={[]}
        isBare
      >
        {memoizedGrapes.map((grape) => (
          <Grape key={grape.internalId} grape={grape} />
        ))}
        <CardGrid>
          {ungrouped.map((observation) => (
            <ObservationCard key={observation.id} observation={observation} />
          ))}
        </CardGrid>
      </Accordion>
    </StyledSection>
  );
};
