import { Anchor, Breadcrumb, Logo } from '@appquality/unguess-design-system';
import { Link, useParams } from 'react-router-dom';
import { useGetWorkspacesByWidPlansAndPidQuery } from 'src/features/api';
import { useActiveWorkspace } from 'src/hooks/useActiveWorkspace';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import styled from 'styled-components';
import { Title } from '../../modules/Title';

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

  const projectRoute = useLocalizeRoute(`projects/${plan?.project.id ?? 0}`);

  if (!plan) return null;

  return (
    <StyledDiv>
      <Logo type="icon" />
      <div>
        <Breadcrumb>
          <Link to={projectRoute}>
            <Anchor>{plan.project.name}</Anchor>
          </Link>
        </Breadcrumb>
        <Title data-qa="title-module" />
      </div>
    </StyledDiv>
  );
};
