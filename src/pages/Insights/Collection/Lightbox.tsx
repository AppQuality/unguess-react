import {
  Button,
  Lightbox,
  MD,
  Player,
} from '@appquality/unguess-design-system';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { Pipe } from 'src/common/components/Pipe';
import { Observation, UseCase, Video } from 'src/features/api';
import useWindowSize from 'src/hooks/useWindowSize';
import styled from 'styled-components';

const Grey600Span = styled.span`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

export const LightboxContainer = ({
  observation,
  onClose,
}: {
  observation: Observation & {
    video: Video;
    useCase: UseCase;
  };
  onClose?: () => void;
}) => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const breakpointSm = parseInt(appTheme.breakpoints.sm, 10);
  const hideDetails = width < breakpointSm;
  const videoRef = useRef<HTMLVideoElement | null>(null);

  return (
    <Lightbox onClose={onClose}>
      <Lightbox.Header>
        <MD isBold>
          <Grey600Span>
            {observation.useCase.title}
            <Pipe style={{ marginLeft: appTheme.space.sm }} />
            {observation.title}
          </Grey600Span>
        </MD>
      </Lightbox.Header>
      <Lightbox.Body>
        <Lightbox.Body.Main style={{ flex: 2 }}>
          <Player
            ref={videoRef}
            url={observation.video.url}
            start={observation.start}
            end={observation.end}
          />
        </Lightbox.Body.Main>
        {hideDetails === false && (
          <Lightbox.Body.Details style={{ flex: 1 }}>
            Lightbox.Body.Details
          </Lightbox.Body.Details>
        )}
      </Lightbox.Body>
      <Lightbox.Footer style={{ justifyContent: 'flex-end' }}>
        <Button
          isPrimary
          isAccent
          onClick={() => {
            // eslint-disable-next-line no-console
            console.log('Select observation');
          }}
        >
          {t(
            '__INSIGHTS_COLLECTION_OBSERVATION_CARD_LIGHTBOX_SELECT_BUTTON_LABEL'
          )}
        </Button>
      </Lightbox.Footer>
      <Lightbox.Close />
    </Lightbox>
  );
};
