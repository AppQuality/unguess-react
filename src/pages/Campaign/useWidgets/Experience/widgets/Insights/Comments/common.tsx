import { MD } from '@appquality/unguess-design-system';
import { WidgetSpecialCard } from 'src/pages/Campaign/widgetCards/common/StyledSpecialCard';
import styled from 'styled-components';

export const COMPACT_CHARACTERS_MAX_SIZE = 90;

export const StyledCard = styled(WidgetSpecialCard)`
  padding-top: ${({ theme }) => theme.space.base * 2}px;
  padding-bottom: ${({ theme }) => theme.space.base * 2}px;
`;

export const CardTitle = styled(MD)`
  color: ${({ theme }) => theme.palette.blue[600]};
  margin-bottom: ${({ theme }) => theme.space.xs};
`;

export const CardText = styled(MD)`
  color: ${({ theme }) => theme.palette.grey[600]};
  margin-bottom: ${({ theme }) => theme.space.xs};
  white-space: pre-wrap;
`;

export const EditorFooter = styled.div`
  padding: ${({ theme }) =>
    `${theme.space.base * 4}px ${theme.space.base * 4}px ${theme.space.lg}`};

  display: flex;
  width: 100%;
  justify-content: end;
  gap: ${({ theme }) => theme.space.md};
  margin-top: ${({ theme }) => theme.space.base * 4}px;
`;
