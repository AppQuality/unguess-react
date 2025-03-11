import { Anchor, Breadcrumb, Logo } from '@appquality/unguess-design-system';
import { Link, useParams } from 'react-router-dom';
import { useGetWorkspacesByWidPlansAndPidQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';
import { Title } from '../modules/Title';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TitleGroup = () => {
  const { planId } = useParams();
  const { activeWorkspace } = useActiveWorkspace();

  const { data: plan } = useGetWorkspacesByWidPlansAndPidQuery({
    wid: Number(activeWorkspace?.id).toString(),
    pid: Number(planId).toString(),
  });

  const projectRoute = useLocalizeRoute(
    `projects/${plan?.project_id ?? 0}` // TODO replace with project.id when api will be updated
  );

  return (
    <StyledDiv>
      <Logo type="icon" />
      <div>
        <Breadcrumb>
          <Link to={projectRoute}>
            {/* TODO replace with project.name when api will be updated */}
            <Anchor>Project Name</Anchor>
          </Link>
        </Breadcrumb>
        <Title />
      </div>
    </StyledDiv>
  );
};
