import { ReactComponent as ChangelogIcon } from "src/assets/icons/megaphone-stroke.svg";
import HeadwayWidget from "@headwayapp/react-widget";
import styled from "styled-components";
import { theme } from "@appquality/unguess-design-system";

const StyledWidget = styled.div`
  svg {
    margin-top: ${theme.space.sm};
  }
  .HW_badge_cont {
    top: -${theme.space.xs};
  }
`;

export const Changelog = () => {
  return (
    <StyledWidget>
      <HeadwayWidget account="Jn0mVx">
        <ChangelogIcon />
      </HeadwayWidget>
    </StyledWidget>
  );
};
