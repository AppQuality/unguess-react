import {
  Anchor,
  Checkbox,
  Ellipsis,
  Label,
  SM,
  Span,
  SpecialCard,
  Tag,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Grape } from 'src/features/api';
import { Pipe } from 'src/common/components/Pipe';
import { useMemo, useState } from 'react';
import { getColorWithAlpha } from 'src/common/utils';
import { styled } from 'styled-components';
import { FieldArray, FieldArrayRenderProps, useFormikContext } from 'formik';
import { LightboxContainer, getDeviceIcon } from './Lightbox';
import { InsightFormValues } from '../FormProvider';

const StyledTag = styled(Tag)`
  user-select: none;
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
  const { values } = useFormikContext<InsightFormValues>();

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

  const handleCheck = (
    e: React.MouseEvent,
    { remove, push }: FieldArrayRenderProps
  ) => {
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
                {getDeviceIcon(observation.deviceType)}
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
                <div style={{ display: 'flex', alignItems: 'center' }}>
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
                  {tags.length === 1 && (
                    <StyledTag
                      size="small"
                      style={{
                        backgroundColor: appTheme.palette.grey[200],
                      }}
                    >
                      <Ellipsis>{tags[0].tag.name}</Ellipsis>
                      {`(${tags[0].tag.usageNumber})`}
                    </StyledTag>
                  )}
                  {tags.length > 1 && (
                    <SM>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Ellipsis>
                          {t(
                            '__INSIGHTS_COLLECTION_OBSERVATION_CARD_EXTRA_TAGS_LABEL'
                          )}
                        </Ellipsis>
                        {`+${tags.length}`}
                      </div>
                    </SM>
                  )}
                </div>
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
              observation={observation}
              onClose={() => setIsLightboxOpen(false)}
            />
          )}
        </>
      )}
    </FieldArray>
  );
};
