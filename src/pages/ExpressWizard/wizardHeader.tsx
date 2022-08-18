import {
  Anchor,
  Breadcrumb,
  Logo,
  Span,
  theme,
} from '@appquality/unguess-design-system';

import { useAppSelector } from 'src/app/hooks';
import { Workspace } from 'src/features/api';
import useWindowSize from 'src/hooks/useWindowSize';
import i18n from 'src/i18n';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const WizardHeader = ({
  title,
  workspace,
  onClose,
}: {
  title: string;
  onClose: () => void;
  workspace?: Workspace;
}) => {
  const { width } = useWindowSize();
  const { project, projectLocked } = useAppSelector((state) => state.express);

  const breadcrumbs = [];

  if (workspace) {
    breadcrumbs.push({
      name: workspace.company,
      href: i18n.language === 'en' ? '/' : `/${i18n.language}`,
    });
  }

  if (projectLocked) {
    breadcrumbs.push({
      name: project?.name || 'Project',
      href:
        i18n.language === 'en'
          ? `/projects/${project && project.id}`
          : `/${i18n.language}/${project && project.id}`,
      onClick: (e: any) => {
        e.preventDefault();
        onClose();
      },
    });
  }

  return width > parseInt(theme.breakpoints.sm, 10) ? (
    <Container>
      <Logo type="icon" size={25} style={{ marginRight: theme.space.xs }} />
      <Breadcrumb>
        {breadcrumbs.map((crumb) => (
          <Anchor
            href={crumb.href}
            {...(crumb.onClick && { onClick: crumb.onClick })}
          >
            {crumb.name}
          </Anchor>
        ))}
        <Span>{title}</Span>
      </Breadcrumb>
    </Container>
  ) : (
    <Span>{title}</Span>
  );
};
