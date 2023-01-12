import { MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const ImageCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  height: 200px;
  cursor: pointer;
`;

const Preview = styled.div`
  padding: ${({ theme }) => theme.space.md};
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 100%;

  > img {
    width: 100%;
    height: auto;
  }
`;

export default ({ index, url }: { index: number; url: string }) => {
  const { t } = useTranslation();

  return (
    <ImageCard onClick={() => console.log('> media index', index)}>
      <Preview>
        <img
          src={url}
          alt={`${t('__BUGS_PAGE_BUG_DETAIL_ATTACHMENTS_IMAGE_LABEL', {
            count: 1,
          })} ${index}`}
        />
      </Preview>
      <MD isBold style={{ textAlign: 'center' }}>
        {index}
      </MD>
    </ImageCard>
  );
};
