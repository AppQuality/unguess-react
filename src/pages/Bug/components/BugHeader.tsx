import { Tag, theme as globalTheme } from '@appquality/unguess-design-system';
import { Bug } from 'src/features/api';
import { ReactComponent as FatherIcon } from 'src/assets/icons/bug-type-unique.svg';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
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
    <Tag isRegular hue="rgba(0,0,0,0)">
      {!bug.duplicated_of_id && (
        <Tag.Avatar>
          <FatherIcon
            style={{
              color: globalTheme.palette.grey[500],
              marginRight: globalTheme.space.xxs,
            }}
          />
        </Tag.Avatar>
      )}
      ID
      <Tag.SecondaryText isBold>{bug.id}</Tag.SecondaryText>
    </Tag>
  </Container>
);
