import {
  Button,
  Ellipsis,
  IconButton,
  Lightbox,
  MD,
  Player,
  SM,
  Skeleton,
  Span,
  Tag,
  Textarea,
  Tooltip,
  Label,
  Notification,
  useToast,
} from '@appquality/unguess-design-system';
import { useCallback, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Pipe } from 'src/common/components/Pipe';
import { getColorWithAlpha } from 'src/common/utils';
import { Grape, useGetVideosByVidQuery } from 'src/features/api';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';
import { ReactComponent as SmartphoneIcon } from 'src/assets/icons/pill-icon-smartphone.svg';
import { ReactComponent as TabletIcon } from 'src/assets/icons/pill-icon-tablet.svg';
import { ReactComponent as DesktopIcon } from 'src/assets/icons/pill-icon-desktop.svg';
import { ReactComponent as ExternalLinkIcon } from 'src/assets/icons/external-link-icon.svg';
import { ReactComponent as LinkIcon } from 'src/assets/icons/link-stroke.svg';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useFormikContext } from 'formik';
import { InsightFormValues } from '../FormProvider';

const Grey600Span = styled.span`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

const StyledTag = styled(Tag)`
  user-select: none;
  max-width: 110px;
  margin: 0;
`;

const StyledPipe = styled(Pipe)`
  margin: 0 ${({ theme }) => theme.space.xs};
`;

const DetailsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
  margin-bottom: ${({ theme }) => theme.space.md};
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.space.xs};
  margin: ${({ theme }) => theme.space.sm} 0;
`;

export function getDeviceIcon(device?: string) {
  switch (device) {
    case 'smartphone':
      return <SmartphoneIcon />;
    case 'tablet':
      return <TabletIcon />;
    case 'PC':
      return <DesktopIcon />;
    case 'other':
      return <DesktopIcon />;
    default:
      return null;
  }
}

export const LightboxContainer = ({
  observation,
  onClose,
}: {
  observation: Grape['observations'][number];
  onClose?: () => void;
}) => {
  const { campaignId } = useParams();
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const hideDetails = width < breakpointSm;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const { addToast } = useToast();
  const { values, setFieldValue } = useFormikContext<InsightFormValues>();
  const navigate = useNavigate();
  const location = useLocation();
  const observationUrl = useLocalizeRoute(
    `campaigns/${campaignId}/videos/${observation.mediaId}#observation-${observation.id}`
  );

  const isChecked = useMemo(
    () => values.observations.some((obs) => obs.id === observation.id),
    [values.observations, observation.id]
  );

  const {
    data: video,
    isLoading,
    isFetching,
    isError,
  } = useGetVideosByVidQuery({
    vid: observation.mediaId.toString(),
  });

  const navigateToObs = () => {
    navigate(observationUrl, {
      state: { from: location.pathname },
    });
  };

  const copyLink = useCallback(
    (event: React.MouseEvent) => {
      event.stopPropagation();
      navigator.clipboard.writeText(
        `${window.location.origin}${observationUrl}`
      );
      addToast(
        ({ close }) => (
          <Notification
            onClose={close}
            type="success"
            message={t('__VIDEO_PAGE_OBSERVATION_LINK_TOAST_MESSAGE')}
            closeText={t('__TOAST_CLOSE_TEXT')}
            isPrimary
          />
        ),
        { placement: 'top' }
      );
    },
    [observation]
  );

  const severity = observation.tags.find(
    (tag) => tag.group.name === 'severity'
  );

  const tags = observation.tags.filter(
    (tag) => tag.group.name !== 'severity' && tag.group.name !== 'title'
  );

  const title =
    observation.tags.find((tag) => tag.group.name === 'title')?.tag.name ||
    observation.title;

  return (
    <Lightbox onClose={onClose}>
      <Lightbox.Header>
        <MD isBold>
          <Grey600Span>
            {observation.usecaseTitle}
            <Pipe style={{ marginLeft: appTheme.space.sm }} />
            <Span
              isBold
              style={{
                textTransform: 'capitalize',
                color: appTheme.palette.grey[800],
              }}
            >
              {title}
            </Span>
          </Grey600Span>
        </MD>
      </Lightbox.Header>
      <Lightbox.Body>
        <Lightbox.Body.Main style={{ flex: 2 }}>
          {!video || isLoading || isFetching || isError ? (
            <Skeleton />
          ) : (
            <Player
              ref={videoRef}
              url={video.streamUrl || video.url}
              start={observation.start}
              end={observation.end}
            />
          )}
        </Lightbox.Body.Main>
        {hideDetails === false && (
          <Lightbox.Body.Details style={{ flex: 1 }}>
            <DetailsHeader>
              {severity && (
                <>
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
                  <StyledPipe />
                </>
              )}
              <SM isBold style={{ color: appTheme.palette.blue[600] }}>
                {video?.tester.name} (T{video?.tester.id})
              </SM>
              <StyledPipe />
              <SM style={{ display: 'flex', alignItems: 'center' }}>
                {getDeviceIcon(video?.tester.device.type)}{' '}
                <Span
                  style={{
                    textTransform: 'capitalize',
                    marginLeft: appTheme.space.xs,
                  }}
                >
                  {video?.tester.device.type}
                </Span>
              </SM>
              <StyledPipe />
              <Tooltip
                type="light"
                size="small"
                placement="auto"
                content={t(
                  '__INSIGHTS_COLLECTION_OBSERVATION_CARD_LIGHTBOX_OPEN_OBSERVATION_LINK'
                )}
              >
                <IconButton onClick={navigateToObs}>
                  <ExternalLinkIcon />
                </IconButton>
              </Tooltip>
            </DetailsHeader>
            <Label>
              {t(
                '__INSIGHTS_COLLECTION_OBSERVATION_CARD_LIGHTBOX_QUOTES_LABEL'
              )}
            </Label>
            <Textarea
              value={observation.quotes}
              style={{ marginTop: appTheme.space.sm }}
              rows={10}
              isResizable
            />
            <Label style={{ marginTop: appTheme.space.lg }}>
              {t('__INSIGHTS_COLLECTION_OBSERVATION_CARD_LIGHTBOX_TAGS_LABEL')}
            </Label>
            <TagsContainer>
              {tags.length > 0
                ? tags.map(({ tag }) => (
                    <StyledTag
                      size="small"
                      style={{
                        backgroundColor: appTheme.palette.grey[200],
                      }}
                    >
                      <Ellipsis>
                        {tag.name} ({tag.usageNumber})
                      </Ellipsis>
                    </StyledTag>
                  ))
                : '--'}
            </TagsContainer>
            <Label style={{ marginTop: appTheme.space.lg }}>
              {t('__INSIGHTS_COLLECTION_OBSERVATION_CARD_LIGHTBOX_NOTES_LABEL')}
            </Label>
            <MD style={{ marginTop: appTheme.space.xs }}>
              {observation.description && observation.description.length > 0
                ? observation.description
                : '--'}
            </MD>
          </Lightbox.Body.Details>
        )}
      </Lightbox.Body>
      <Lightbox.Footer style={{ justifyContent: 'space-between' }}>
        <Button isLink onClick={copyLink}>
          <Button.StartIcon>
            <LinkIcon />
          </Button.StartIcon>
          {t(
            '__INSIGHTS_COLLECTION_OBSERVATION_CARD_LIGHTBOX_COPY_LINK_BUTTON_LABEL'
          )}
        </Button>
        <Button
          isPrimary
          isAccent
          onClick={() => {
            if (isChecked) {
              setFieldValue(
                'observations',
                values.observations.filter((obs) => obs.id !== observation.id)
              );
              addToast(
                ({ close }) => (
                  <Notification
                    onClose={close}
                    type="success"
                    message={t(
                      '__VIDEO_PAGE_OBSERVATION_DESELECTED_TOAST_MESSAGE'
                    )}
                    closeText={t('__TOAST_CLOSE_TEXT')}
                    isPrimary
                  />
                ),
                { placement: 'top' }
              );
            } else {
              setFieldValue('observations', [
                ...values.observations,
                observation,
              ]);
              addToast(
                ({ close }) => (
                  <Notification
                    onClose={close}
                    type="success"
                    message={t(
                      '__VIDEO_PAGE_OBSERVATION_SELECTED_TOAST_MESSAGE'
                    )}
                    closeText={t('__TOAST_CLOSE_TEXT')}
                    isPrimary
                  />
                ),
                { placement: 'top' }
              );
            }
          }}
        >
          {!isChecked
            ? t(
                '__INSIGHTS_COLLECTION_OBSERVATION_CARD_LIGHTBOX_SELECT_BUTTON_LABEL'
              )
            : t(
                '__INSIGHTS_COLLECTION_OBSERVATION_CARD_LIGHTBOX_DESELECT_BUTTON_LABEL'
              )}
        </Button>
      </Lightbox.Footer>
      <Lightbox.Close />
    </Lightbox>
  );
};
