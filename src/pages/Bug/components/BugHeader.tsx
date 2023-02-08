import {
  SM,
  Span,
  theme as globalTheme,
} from '@appquality/unguess-design-system';
import { Trans } from 'react-i18next';
import { Bug } from 'src/features/api';
import { ReactComponent as FatherIcon } from 'src/assets/icons/father-icon.svg';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

const Tester = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

export default ({
  bug,
}: {
  bug: Bug & {
    reporter: {
      tester_id: number;
      name: string;
    };
  };
}) => (
  <Container>
    {!bug.duplicated_of_id && (
      <FatherIcon
        style={{
          color: globalTheme.palette.grey[500],
          marginRight: globalTheme.space.xxs,
        }}
      />
    )}
    <Tester>
      <Trans i18nKey="__BUGS_PAGE_DETAIL_HEADER">
        ID <Span isBold>{{ bug_id: bug.id }}</Span> by{' '}
        {{ reporter_name: bug.reporter.name }} (T
        {{ reporter_id: bug.reporter.tester_id }})
      </Trans>
    </Tester>
  </Container>
);
