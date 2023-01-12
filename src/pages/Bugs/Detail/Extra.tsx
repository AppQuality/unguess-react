import { useTranslation } from 'react-i18next';
import { BugMedia as BugMediaType } from 'src/features/api';
import styled from 'styled-components';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin: ${({ theme }) => theme.space.lg} 0;
`;

export default ({ items }: { items: BugMediaType[] }) => {
  const { t } = useTranslation();

  return <Container>{}</Container>;
};
