import {
  ContainerCard,
  Dots,
  IconButton,
  MD,
  SM,
  Span,
  Tag,
  Title,
} from '@appquality/unguess-design-system';
import { ReactComponent as TrashIcon } from '@zendeskgarden/svg-icons/src/16/trash-stroke.svg';
import { useTranslation } from 'react-i18next';
import { appTheme } from 'src/app/theme';
import { ReactComponent as PlaceholderVideo } from 'src/assets/icons/placeholder-video.svg';
import { styled } from 'styled-components';
import { PendingUpload } from './UploadModal';

const ItemContainer = styled.div`
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  border-bottom: 2px solid ${({ theme }) => theme.palette.grey[200]};
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  height: 70px;
  width: 110px;
  flex-shrink: 0;
  border: 2px solid ${({ theme }) => theme.palette.grey[300]};
  border-radius: ${({ theme }) => theme.borderRadii.md};
  overflow: hidden;

  > svg {
    height: 100%;
    width: auto;
    opacity: 0.4;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xxs};
`;

const SectionContainer = styled.div`
  margin-top: ${({ theme }) => theme.space.sm};
`;

const StyledSM = styled(SM)`
  padding: ${({ theme }) => theme.space.sm};
`;

const StyledCard = styled(ContainerCard)`
  padding: 0;
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  border-color: ${({ theme }) => theme.palette.grey[200]};
`;

const StyledTitle = styled(Title)`
  border-bottom: 1px solid ${({ theme }) => theme.palette.grey[200]};
`;

const PendingVideoItem = ({
  file,
  onRemove,
}: {
  file: PendingUpload;
  onRemove: () => void;
}) => {
  const { t } = useTranslation();
  return (
    <ItemContainer>
      <ThumbnailContainer>
        <PlaceholderVideo />
      </ThumbnailContainer>
      <InfoContainer>
        <MD isBold style={{ color: appTheme.palette.grey[800] }}>
          {file.name}
        </MD>
        <Tag
          hue={appTheme.palette.blue[200]}
          color={appTheme.palette.blue[700]}
        >
          <Tag.Avatar>
            <Dots size={12} color={appTheme.palette.blue[700]} />
          </Tag.Avatar>
          {t('__HUB_VIDEOS_PENDING_VIDEO_STATUS')}
        </Tag>
      </InfoContainer>
      <IconButton
        isBasic
        style={{ marginLeft: 'auto' }}
        onClick={onRemove}
        aria-label="Remove"
      >
        <TrashIcon />
      </IconButton>
    </ItemContainer>
  );
};

export const PendingVideoContainer = ({
  files,
  onRemove,
}: {
  files: PendingUpload[];
  onRemove: (index: number) => void;
}) => {
  const { t } = useTranslation();
  return (
    <SectionContainer>
      <StyledCard>
        <StyledTitle>
          <StyledSM>
            <Span isBold>{t('__VIDEOS_LIST_OTHER_TITLE')} </Span>
            <Span style={{ color: appTheme.palette.grey[600] }}>
              {`(${files.length} ${t('__VIDEOS_LIST_USECASE_INFO', {
                count: files.length,
              })})`}
            </Span>
          </StyledSM>
        </StyledTitle>
        <div
          style={{
            padding: appTheme.space.xxs,
            marginBottom: appTheme.space.xs,
          }}
        >
          {files.map((f, i) => (
            <PendingVideoItem
              key={f.name}
              file={f}
              onRemove={() => onRemove(i)}
            />
          ))}
        </div>
      </StyledCard>
    </SectionContainer>
  );
};
