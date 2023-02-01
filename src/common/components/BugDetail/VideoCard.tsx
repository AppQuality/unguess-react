import { MD, SpecialCard } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReactComponent as VideoPlayIcon } from 'src/assets/icons/video-play-icon.svg';

const VideoCard = styled(SpecialCard)`
  padding: 0;
  position: relative;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.palette.grey[800]};
    opacity: 0.3;
    z-index: 1;
  }

  > svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }
`;

const Preview = styled.div`
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 100%;

  > video {
    width: 100%;
    height: 100%;
  }
`;

export default ({
  index,
  url,
  onClick,
}: {
  index: number;
  url: string;
  onClick?: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <VideoCard onClick={onClick}>
      <Preview>
        <video
          src={url}
          title={`${t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_VIDEO_LABEL', {
            count: 1,
          })} ${index + 1}`}
        >
          <track kind="captions" />
        </video>
      </Preview>
      <MD isBold style={{ textAlign: 'center' }}>
        {index + 1}
      </MD>
      <VideoPlayIcon />
    </VideoCard>
  );
};
