import {
  Anchor,
  Checkbox,
  Label,
  Span,
  SpecialCard,
  Tag,
} from '@appquality/unguess-design-system';
import { Field } from '@zendeskgarden/react-forms';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Grape, useGetVideosByVidQuery } from 'src/features/api';
import { ReactComponent as SmartphoneIcon } from 'src/assets/icons/pill-icon-smartphone.svg';
import { ReactComponent as TabletIcon } from 'src/assets/icons/pill-icon-tablet.svg';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/pill-icon-desktop.svg';
import { Pipe } from 'src/common/components/Pipe';
import { useMemo, useState } from 'react';
import { getColorWithAlpha } from 'src/common/utils';
import { LightboxContainer } from './Lightbox';

export function getDeviceIcon(device?: string) {
  switch (device) {
    case 'smartphone':
      return <SmartphoneIcon />;
    case 'tablet':
      return <TabletIcon />;
    case 'desktop':
      return <DesktopIcon />;
    default:
      return <TabletIcon />;
  }
}

export const ObservationCard = ({
  observation,
}: {
  observation: Grape['observations'][number];
}) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const {
    data: video,
    isLoading,
    isError,
  } = useGetVideosByVidQuery({
    vid: observation.mediaId.toString(),
  });

  const memoizedObservation = useMemo(
    () => ({
      ...observation,
      video,
    }),
    [observation, video]
  );

  const handleChange = () => {
    setChecked(!checked);
  };

  const severity = observation.tags.find(
    (tag) => tag.group.name === 'severity'
  );

  const tags = observation.tags.filter((tag) => tag.group.name !== 'severity');
  console.log('tags', tags);

  if (isLoading || isError || !video) {
    return null;
  }
  return (
    <>
      <SpecialCard
        onClick={handleChange}
        {...(checked && {
          style: { borderColor: appTheme.palette.blue[600], borderWidth: 2 },
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
          <Field>
            <Checkbox checked={checked} onChange={handleChange}>
              <Label>&nbsp;</Label>
            </Checkbox>
          </Field>
          <>
            <Pipe />
            {getDeviceIcon(video.tester.device.type)}
            <Span>{observation.usecaseTitle}</Span>
          </>
        </SpecialCard.Meta>

        <SpecialCard.Header>
          <SpecialCard.Header.Label>
            {observation.title}
          </SpecialCard.Header.Label>
          <SpecialCard.Header.Title style={{ fontStyle: 'italic' }}>
            &quot;
            {observation.quotes}
            &quot;
          </SpecialCard.Header.Title>
          <SpecialCard.Header.Text style={{ marginTop: 'auto' }}>
            {severity && (
              <>
                <Tag
                  color={severity.tag.style}
                  style={{
                    backgroundColor: getColorWithAlpha(severity.tag.style, 0.1),
                  }}
                >
                  {severity.tag.name}
                </Tag>
                <Pipe />
              </>
            )}
            {tags.length > 0 && (
              <Tag>
                {tags[0].tag.name}
                {tags.length > 1 && ` +${tags.length - 1}`}
              </Tag>
            )}
          </SpecialCard.Header.Text>
        </SpecialCard.Header>

        <SpecialCard.Footer>
          <Anchor
            isExternal
            onClick={() => {
              setIsLightboxOpen(true);
            }}
          >
            {t('__INSIGHTS_COLLECTION_OBSERVATION_CARD_VIEW_DETAILS')}
          </Anchor>
        </SpecialCard.Footer>
      </SpecialCard>
      {isLightboxOpen && (
        <LightboxContainer
          observation={memoizedObservation}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
};
