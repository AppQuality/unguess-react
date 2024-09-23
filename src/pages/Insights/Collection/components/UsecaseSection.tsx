import { MD, Span, Tag, XL } from '@appquality/unguess-design-system';
import { ReactComponent as TitleIcon } from '@zendeskgarden/svg-icons/src/12/copy-fill.svg';
import { ReactComponent as ObservationsIcon } from '@zendeskgarden/svg-icons/src/12/tag-fill.svg';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Grape as GrapeType } from 'src/features/api';
import { styled } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import { ObservationCard } from '../ObservationCard';
import { Grape } from './AccordionSection';
import { CardGrid } from './CardGrid';
import { capitalizeUsecaseTitle } from './utils/capitalizeUsecaseTitle';

interface UsecaseSectionProps {
  usecaseId: number;
  usecaseTitle: string;
  grapes: GrapeType[];
  ungrouped: GrapeType['observations'];
}

const StyledSection = styled.section`
  margin-top: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.xl};
`;

const UsecaseTitle = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: ${({ theme }) => theme.space.md};
`;
export const UsecaseSection = ({
  usecaseId,
  usecaseTitle,
  grapes,
  ungrouped,
}: UsecaseSectionProps) => {
  const { t } = useTranslation();

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

  if (memoizedGrapes.length === 0 && ungrouped.length === 0) {
    return null;
  }

  return (
    <StyledSection>
      <UsecaseTitle style={{ margin: `${appTheme.space.xs} 0` }}>
        <XL style={{ flex: '1 0 auto' }}>
          <h3>{capitalizeUsecaseTitle(usecaseTitle)}</h3>
        </XL>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Tag
            style={{
              marginRight: appTheme.space.xxs,
              backgroundColor: appTheme.palette.grey[200],
            }}
            isRound
            size="medium"
          >
            <TitleIcon color={appTheme.palette.grey[600]} />
          </Tag>{' '}
          <MD
            isBold
            color={appTheme.palette.grey[700]}
            style={{ display: 'inline', marginRight: appTheme.space.md }}
          >
            <Trans i18nKey="INSIGHT_PAGE_COLLECTION_THEMES_LABEL">
              Themes: <Span isBold>{{ counter: grapes.length }}</Span>
            </Trans>
          </MD>
          <Tag
            style={{
              marginRight: appTheme.space.xxs,
              backgroundColor: appTheme.palette.grey[200],
            }}
            isRound
            size="medium"
          >
            <ObservationsIcon color={appTheme.palette.grey[600]} />
          </Tag>{' '}
          <MD
            isBold
            color={appTheme.palette.grey[700]}
            style={{ display: 'inline' }}
          >
            <Trans i18nKey="INSIGHT_PAGE_COLLECTION_OBSERVATIONS_LABEL">
              Observations: <Span isBold>{{ counter: observationsCount }}</Span>
            </Trans>
          </MD>
        </div>
      </UsecaseTitle>

      {memoizedGrapes.length > 0 && (
        <>
          <MD
            isBold
            color={appTheme.palette.grey[600]}
            style={{ marginBottom: appTheme.space.md }}
          >
            {t('INSIGHT_PAGE_COLLECTION_USECASE_SUBTITTLE').toUpperCase()}
          </MD>
          {memoizedGrapes.map((grape) => (
            <Grape
              id={`accordion-${usecaseId.toString()}-${grape.internalId}`}
              key={grape.internalId}
              grape={grape}
            />
          ))}
        </>
      )}
      {ungrouped.length > 0 && (
        <>
          <MD
            isBold
            color={appTheme.palette.grey[600]}
            style={{
              marginBottom: appTheme.space.md,
              marginTop: memoizedGrapes.length > 0 ? appTheme.space.lg : 0,
            }}
          >
            {t(
              'INSIGHT_PAGE_COLLECTION_UNGROUPED_USECASE_SUBTITTLE'
            ).toUpperCase()}
          </MD>
          <CardGrid>
            {ungrouped.map((observation) => (
              <ObservationCard key={observation.id} observation={observation} />
            ))}
          </CardGrid>
        </>
      )}
    </StyledSection>
  );
};
