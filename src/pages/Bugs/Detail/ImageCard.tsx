import { MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const ImageCard = styled.div`
  border-radius: ${({ theme }) => theme.borderRadii.lg};
  border: 1px solid ${({ theme }) => theme.palette.grey[300]};
  height: 200px;
  cursor: pointer;
`;

const Preview = styled.div<{
  url: string;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 150px;
  width: 100%;
  background-image: url(${(props) => props.url});
  background-color: ${({ theme }) => theme.palette.grey[100]};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

export default ({ index, url }: { index: number; url: string }) => {
  const { t } = useTranslation();

  return (
    <ImageCard onClick={() => console.log('> media index', index)}>
      <Preview url={url} />
      <MD isBold style={{ textAlign: 'center' }}>
        {index}
      </MD>
    </ImageCard>
  );
};
