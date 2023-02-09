import { SM, Span } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { Trans } from 'react-i18next';

const Tester = styled(SM)`
  color: ${({ theme }) => theme.palette.grey[600]};
`;

export default ({
  bugId,
  testerName,
  testerId,
}: {
  bugId: number;
  testerName: string;
  testerId: number;
}) => (
  <Tester>
    <Trans i18nKey="__BUGS_PAGE_DETAIL_HEADER">
      ID <Span isBold>{{ bug_id: bugId }}</Span> by{' '}
      {{ reporter_name: testerName }} (T
      {{ reporter_id: testerId }})
    </Trans>
  </Tester>
);
