import {
  Anchor,
  Checkbox,
  Ellipsis,
  Label,
  Span,
  SpecialCard,
  Tag,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-forms';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Grape, useGetVideosByVidQuery } from 'src/features/api';
import { Pipe } from 'src/common/components/Pipe';
import { useMemo, useState } from 'react';
import { getColorWithAlpha } from 'src/common/utils';
import { styled } from 'styled-components';
import { FieldArray, FieldArrayRenderProps, useFormikContext } from 'formik';
import { LightboxContainer, getDeviceIcon } from './Lightbox';
import { InsightFormValues } from '../FormProvider';

const StyledTag = styled(Tag)`
  user-select: none;
  margin-top: ${({ theme }) => theme.space.xs};
  max-width: 110px;
`;

const StyledAnchor = styled(Anchor)`
  user-select: none;
`;

export const ObservationCard = ({
  observation,
}: {
  observation: Grape['observations'][number];
}) => {
  const { t } = useTranslation();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const {
    data: video,
    isLoading,
    isError,
  } = useGetVideosByVidQuery({
    vid: observation.mediaId.toString(),
  });
  const { values } = useFormikContext<InsightFormValues>();

  const memoizedObservation = useMemo(
    () => ({
      ...observation,
      video,
    }),
    [observation, video]
  );

  const severity = observation.tags.find(
    (tag) => tag.group.name === 'severity'
  );

  const tags = observation.tags.filter(
    (tag) => tag.group.name !== 'severity' && tag.group.name !== 'title'
  );

  const isChecked = useMemo(
    () => values.observations.some((obs) => obs.id === observation.id),
    [values.observations, observation.id]
  );
  const title =
    observation.tags.find((tag) => tag.group.name === 'title')?.tag.name ||
    observation.title;

  if (isLoading || isError || !video) {
    return null;
  }
  const handleCheck = (
    e: React.MouseEvent,
    { remove, push }: FieldArrayRenderProps
  ) => {
    console.log('checked', e);
    console.log('checked', isChecked);
    console.log('checked', typeof e);
    if (isChecked) {
      remove(values.observations.findIndex((obs) => obs.id === observation.id));
    } else {
      push(observation);
    }
  };

  return (
    <FieldArray name="observations">
      {(arrayHelpers) => (
        <>
          <SpecialCard
            onClick={(e) => handleCheck(e, arrayHelpers)}
            {...(isChecked && {
              style: {
                borderColor: appTheme.palette.blue[600],
                borderWidth: 2,
              },
            })}
          >
            <SpecialCard.Meta
              justifyContent="start"
              style={{
                fontSize: appTheme.fontSizes.sm,
                alignContent: 'center',
                userSelect: 'none',
              }}
            >
              <Checkbox checked={isChecked}>
                <Label>&nbsp;</Label>
              </Checkbox>

              <>
                <Pipe />
                {getDeviceIcon(video.tester.device.type)}
                <Span>{observation.usecaseTitle}</Span>
              </>
            </SpecialCard.Meta>

            <SpecialCard.Header>
              <SpecialCard.Header.Label style={{ userSelect: 'none' }}>
                {title}
              </SpecialCard.Header.Label>
              <SpecialCard.Header.Title
                style={{
                  fontStyle: 'italic',
                  cursor: 'text',
                  marginBottom: appTheme.space.md,
                }}
              >
                &quot;
                {observation.quotes}
                &quot;
              </SpecialCard.Header.Title>
              <SpecialCard.Header.Text style={{ marginTop: 'auto' }}>
                {severity && (
                  <StyledTag
                    size="small"
                    color={severity.tag.style}
                    style={{
                      backgroundColor: getColorWithAlpha(
                        severity.tag.style,
                        0.1
                      ),
                    }}
                  >
                    <Ellipsis>{severity.tag.name}</Ellipsis>
                  </StyledTag>
                )}
                {tags.length > 0 && (
                  <StyledTag
                    size="small"
                    style={{
                      backgroundColor: appTheme.palette.grey[200],
                    }}
                  >
                    <Ellipsis>
                      {tags[0].tag.name}
                      {tags.length > 1 && ` +${tags.length - 1}`}
                    </Ellipsis>
                  </StyledTag>
                )}
              </SpecialCard.Header.Text>
            </SpecialCard.Header>

            <SpecialCard.Footer>
              <StyledAnchor
                isExternal
                onClick={(e) => {
                  e.stopPropagation();
                  setIsLightboxOpen(true);
                }}
              >
                {t('__INSIGHTS_COLLECTION_OBSERVATION_CARD_VIEW_DETAILS')}
              </StyledAnchor>
            </SpecialCard.Footer>
          </SpecialCard>
          {isLightboxOpen && (
            <LightboxContainer
              observation={memoizedObservation}
              onClose={() => setIsLightboxOpen(false)}
            />
          )}
        </>
      )}
    </FieldArray>
  );
};
