import {
  Anchor,
  Checkbox,
  Ellipsis,
  IconButton,
  Label,
  SM,
  Span,
  SpecialCard,
  Tag,
  Tooltip,
} from '@appquality/unguess-design-system';
import { FieldArray, FieldArrayRenderProps, useFormikContext } from 'formik';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as TrashIcon } from 'src/assets/icons/trash-stroke.svg';
import { getDeviceIcon } from 'src/common/components/BugDetail/Meta';
import { Pipe } from 'src/common/components/Pipe';
import { getColorWithAlpha } from 'src/common/utils';
import { Grape, VideoTag } from 'src/features/api';
import { styled } from 'styled-components';
import { InsightFormValues } from '../FormProvider';
import { LightboxContainer } from './Lightbox';

const StyledTag = styled(Tag)`
  user-select: none;
  max-width: 110px;
  margin-bottom: ${({ theme }) => theme.space.xxs};
`;

const StyledAnchor = styled(Anchor)`
  user-select: none;
  font-size: ${appTheme.fontSizes.sm};
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
  border-width: 2px;
`;

const Quotes = styled.span<{ isChecked: boolean }>`
  font-style: italic;
  cursor: text;
  ${({ isChecked }) =>
    `color: ${
      isChecked ? appTheme.palette.blue[600] : appTheme.palette.grey[800]
    };`}
  font-size: ${appTheme.fontSizes.md};
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
  const { values } = useFormikContext<InsightFormValues>();
  const quotesMaxChars = 250;

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
    } else {
      push(observation);
    }
  };

  const getQuotesWithEllipsis = (quotes: string, maxChars: number = 50) => {
    // Convert the string into an array of characters to handle multibyte characters correctly
    const characters = Array.from(quotes);

    // If the length of the array exceeds maxChars, truncate and add ellipsis
    if (characters.length > maxChars) {
      return `${characters.slice(0, maxChars).join('')}...`;
    }

    return quotes;
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
                    <Tag size="large" isRound>
                      {getDeviceIcon(observation.deviceType)}
                    </Tag>
                  </>
                )}
                {observation.usecaseTitle && (
                  <Ellipsis style={{ padding: `0 ${appTheme.space.xxs}` }}>
                    {observation.usecaseTitle}
                  </Ellipsis>
                )}
              </>
              {hideCheckbox && (
                <Tooltip
                  content={t('__INSIGHTS_DELETE_ICON_LABEL')}
                  placement="auto"
                  type="light"
                  size="small"
                >
                  <IconButton
                    isDanger
                    size="small"
                    onClick={() => handleCheck(arrayHelpers)}
                  >
                    <TrashIcon />
                  </IconButton>
                </Tooltip>
              )}
            </SpecialCard.Meta>

            <SpecialCard.Header>
              <SpecialCard.Header.Label
                style={{
                  userSelect: 'none',
                  color: appTheme.palette.grey[600],
                }}
              >
                {title}
              </SpecialCard.Header.Label>
              <SpecialCard.Header.Title
                style={{
                  marginBottom: appTheme.space.md,
                }}
              >
                <Quotes isChecked={isChecked}>
                  &quot;
                  {observation.quotes &&
                  observation.quotes.length > quotesMaxChars ? (
                    <Span title={observation.quotes}>
                      {getQuotesWithEllipsis(
                        observation.quotes,
                        quotesMaxChars
                      )}
                    </Span>
                  ) : (
                    observation.quotes
                  )}
                  &quot;
                </Quotes>
              </SpecialCard.Header.Title>
              <SpecialCard.Header.Text style={{ marginTop: 'auto' }}>
                {observation.uploaderId > 0 && (
                  <SM
                    style={{
                      color: appTheme.palette.grey[700],
                      marginBottom: appTheme.space.xs,
                    }}
                  >
                    T{observation.uploaderId}
                  </SM>
                )}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                  }}
                >
                  {severity && (
                    <StyledTag
                      size="medium"
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
                      size="medium"
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
