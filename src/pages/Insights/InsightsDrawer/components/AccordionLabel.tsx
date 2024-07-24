import styled from 'styled-components';
import { Accordion, IconButton, LG } from '@appquality/unguess-design-system';
import { ReactComponent as Icon } from '@zendeskgarden/svg-icons/src/16/arrow-up-stroke.svg';
import { usePatchInsightsByIidMutation } from 'src/features/api';

const Style = styled(Accordion.Label)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0;
`;

interface Props {
  title: string;
  id: string;
  isPublished?: number;
}

export const AccordionLabel = ({ title, id, isPublished }: Props) => {
  const [patchInsight] = usePatchInsightsByIidMutation();
  const handlePublish = () => {
    patchInsight({ iid: id, body: { visible: isPublished ? 0 : 1 } });
  };
  return (
    <Style>
      <LG isBold>{title}</LG>
      <IconButton onClick={handlePublish}>
        <Icon />
      </IconButton>
    </Style>
  );
};
