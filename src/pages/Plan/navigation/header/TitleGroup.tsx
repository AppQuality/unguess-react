import { Anchor, Breadcrumb, Logo } from '@appquality/unguess-design-system';
import { Link, useParams } from 'react-router-dom';
import { useGetPlansByPidQuery } from 'src/features/api';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { getModuleBySlug } from 'src/pages/Plan/modules/Factory';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const TitleGroup = () => {
  const { planId } = useParams();

  const { data: plan } = useGetPlansByPidQuery({
    pid: Number(planId).toString(),
  });

  const projectRoute = useLocalizeRoute(`projects/${plan?.project.id ?? 0}`);
  const homeRoute = useLocalizeRoute('');

  const Title = getModuleBySlug('title').Component;
  if (!plan) return null;

  return (
    <StyledDiv>
      <Link to={homeRoute}>
        <Logo type="icon" />
      </Link>
      <div>
        <Breadcrumb>
          <Link to={projectRoute}>
            <Anchor>{plan.project.name}</Anchor>
          </Link>
        </Breadcrumb>
        <Title />
      </div>
    </StyledDiv>
  );
};
