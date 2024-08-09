import { MD, XXL } from '@appquality/unguess-design-system';
import { styled } from 'styled-components';
import { appTheme } from 'src/app/theme';
import { Divider } from 'src/common/components/divider';
import { GroupByToggle } from './GroupByToggle';

const Style = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  gap: ${({ theme }) => theme.space.md};
  padding-top: ${({ theme }) => theme.space.xxs};
  margin-bottom: ${({ theme }) => theme.space.xs};
  ${XXL} {
    margin-bottom: ${({ theme }) => theme.space.xs};
  }
  ${MD} {
    margin-bottom: ${({ theme }) => theme.space.xs};
  }
`;
const StyledDivider = styled(Divider)`
  grid-column: 1 / span 2;
`;

export const SectionTitle = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <>
    <Style>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          paddingBottom: appTheme.space.xxs,
        }}
      >
        <div>
          <XXL color={appTheme.palette.blue[600]} isBold>
            {title}
          </XXL>
          <MD color={appTheme.palette.grey[700]}>{subtitle}</MD>
        </div>
      </div>
      <GroupByToggle />
    </Style>
    <StyledDivider />
  </>
);
