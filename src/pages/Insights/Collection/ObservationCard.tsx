import {
  Anchor,
  Checkbox,
  Ellipsis,
  IconButton,
  Label,
  SM,
  SpecialCard,
  Tag,
} from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Grape, VideoTag } from 'src/features/api';
import { Pipe } from 'src/common/components/Pipe';
import { useMemo, useState } from 'react';
import { getColorWithAlpha } from 'src/common/utils';
import { styled } from 'styled-components';
import { FieldArray, FieldArrayRenderProps, useFormikContext } from 'formik';
import { getDeviceIcon } from 'src/common/components/BugDetail/Meta';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { LightboxContainer } from './Lightbox';
import { InsightFormValues } from '../FormProvider';

const StyledTag = styled(Tag)`
  user-select: none;
  max-width: 110px;
`;

const StyledAnchor = styled(Anchor)`
  user-select: none;
`;

const StyledSpecialCard = styled(SpecialCard)<{
  isChecked: boolean;
  severity?: VideoTag;
}>`
  transition: all 0.2s;
  ${({ severity }) =>
    severity &&
    `
    border-color: ${severity.tag.style};
  `}
  ${({ isChecked }) =>
    isChecked &&
    `
    border-color: ${appTheme.palette.blue[600]};
  `}
  border-width: 2px;
`;

const Quotes = styled.span<{ isChecked: boolean }>`
  font-style: italic;
  cursor: text;
  ${({ isChecked }) =>
    `color: ${
      isChecked ? appTheme.palette.blue[600] : appTheme.palette.grey[700]
    };`}
`;

export const ObservationCard = ({
  observation,
  hideCheckbox,
}: {
  observation: Grape['observations'][number];
  hideCheckbox?: boolean;
}) => {
  const { t } = useTranslation();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const { values, setFieldValue } = useFormikContext<InsightFormValues>();

  const severity = observation.tags.find(
    (tag) => tag.group.name === 'severity'
  );

  const tags = observation.tags.filter(
    (tag) => tag.group.name !== 'severity' && tag.group.name !== 'title'
  );

  const title =
    observation.tags.find((tag) => tag.group.name === 'title')?.tag.name ||
    observation.title;

  const isChecked = useMemo(
    () => values.observations.some((obs) => obs.id === observation.id),
    [values.observations, observation.id]
  );

  const handleCheck = ({ remove, push }: FieldArrayRenderProps) => {
    if (isChecked) {
      remove(values.observations.findIndex((obs) => obs.id === observation.id));
      setFieldValue(
        'usecases',
        values.usecases.filter(
          (usecase) => usecase.name !== observation.usecaseTitle
        )
      );
    } else {
      push(observation);
      // Add usecase to the list of usecases avoiding duplicates
      if (
        !values.usecases.some(
          (usecase) => usecase.name === observation.usecaseTitle
        )
      ) {
        setFieldValue('usecases', [
          ...values.usecases,
          { name: observation.usecaseTitle },
        ]);
      }
    }
  };

  return (
    <FieldArray name="observations">
      {(arrayHelpers) => (
        <>
          <StyledSpecialCard
            isChecked={isChecked}
            severity={severity}
            {...(!hideCheckbox && {
              onClick: () => handleCheck(arrayHelpers),
            })}
          >
            <SpecialCard.Meta
              justifyContent={hideCheckbox ? 'space-between' : 'start'}
              style={{
                fontSize: appTheme.fontSizes.sm,
                alignContent: 'center',
                userSelect: 'none',
              }}
            >
              {!hideCheckbox && (
                <Checkbox checked={isChecked}>
                  <Label>&nbsp;</Label>
                </Checkbox>
              )}
              <>
                {observation.deviceType && (
                  <>
                    {!hideCheckbox && <Pipe />}
                    {getDeviceIcon(observation.deviceType)}
                  </>
                )}
                {observation.usecaseTitle && (
                  <Ellipsis style={{ padding: `0 ${appTheme.space.xxs}` }}>
                    {observation.usecaseTitle}
                  </Ellipsis>
                )}
              </>
              {hideCheckbox && (
                <IconButton
                  isDanger
                  size="small"
                  onClick={() => handleCheck(arrayHelpers)}
                >
                  <TrashIcon />
                </IconButton>
              )}
            </SpecialCard.Meta>

            <SpecialCard.Header>
              <SpecialCard.Header.Label style={{ userSelect: 'none' }}>
                {title}
              </SpecialCard.Header.Label>
              <SpecialCard.Header.Title
                style={{
                  marginBottom: appTheme.space.md,
                }}
              >
                <Quotes isChecked={isChecked}>
                  &quot;{observation.quotes}&quot;
                </Quotes>
              </SpecialCard.Header.Title>
              <SpecialCard.Header.Text style={{ marginTop: 'auto' }}>
                {observation.uploaderId > 0 && (
                  <SM
                    style={{
                      color: appTheme.palette.grey[600],
                      marginBottom: appTheme.space.xs,
                    }}
                  >
                    T{observation.uploaderId}
                  </SM>
                )}
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
          </StyledSpecialCard>
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
