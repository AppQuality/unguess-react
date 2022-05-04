import {
  Anchor,
  Breadcrumb,
  Logo,
  Span,
  theme,
} from "@appquality/unguess-design-system";
import { useAppDispatch } from "src/app/hooks";
import { Workspace } from "src/features/api";
import { closeWizard } from "src/features/express/expressSlice";
import useWindowSize from "src/hooks/useWindowSize";
import i18n from "src/i18n";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const WizardHeader = ({ title, workspace }: { title: string, workspace?: Workspace }) => {
  const { width } = useWindowSize();
  const dispatch = useAppDispatch();

  return width > parseInt(theme.breakpoints.sm) ? (
    <Container>
      <Logo type="icon" size={25} style={{ marginRight: theme.space.xs }} />
      <Breadcrumb>
        {workspace && (
          <Anchor href={i18n.language === "en" ? "/" : `/${i18n.language}`} onClick={(e) => {e.preventDefault(); dispatch(closeWizard())}}>
            {workspace.company}'s Workspace
          </Anchor>
        )}
        <Span>{title}</Span>
      </Breadcrumb>
    </Container>
  ) : (
    <Span>{title}</Span>
  );
};
