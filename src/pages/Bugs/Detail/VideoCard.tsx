import { MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { ReactComponent as VideoPlayIcon } from 'src/assets/icons/video-play-icon.svg';

const VideoCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  height: 200px;
  cursor: pointer;
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

export default ({ index, url }: { index: number; url: string }) => {
  const { t } = useTranslation();

  return (
    <VideoCard onClick={() => console.log('> media index', index)}>
      <Preview>
        <video
          src={url}
          title={`${t(
            '__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_VIDEO_TITLE_LABEL'
          )} ${index}`}
        >
          <track kind="captions" />
        </video>
      </Preview>
      <MD isBold style={{ textAlign: 'center' }}>
        {index}
      </MD>
      <VideoPlayIcon />
    </VideoCard>
  );
};
