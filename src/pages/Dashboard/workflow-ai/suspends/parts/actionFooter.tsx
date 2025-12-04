import { IconButton, Tooltip } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { ReactComponent as ReloadIcon } from '../../icons/reload-fill.svg';

const SystemMessageButtonList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`;

export const ActionFooter = ({
  handleRegenerate,
}: {
  handleRegenerate: () => void;
}) => (
  <SystemMessageButtonList>
    <Tooltip
      content="Click to regenerate"
      placement="top-end"
      type="light"
      size="medium"
      onClick={(e: any) => {
        e.stopPropagation();
      }}
    >
      <IconButton size="small" onClick={handleRegenerate}>
        <ReloadIcon />
      </IconButton>
    </Tooltip>
  </SystemMessageButtonList>
);
