import { MD, SpecialCard } from '@appquality/unguess-design-system';
import styled from 'styled-components';

const ImageCard = styled(SpecialCard)`
  padding: 0;
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

export default ({
  index,
  url,
  onClick,
}: {
  index: number;
  url: string;
  onClick?: () => void;
}) => (
  <ImageCard onClick={onClick}>
    <Preview url={url} />
    <MD isBold style={{ textAlign: 'center' }}>
      {index + 1}
    </MD>
  </ImageCard>
);
