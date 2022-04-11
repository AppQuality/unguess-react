import { Counter, theme } from "@appquality/unguess-design-system";
import { useTranslation } from "react-i18next";
import styled from "styled-components";

const Pipe = styled.div`
  /** Vertical Separator */
  border-left: 1px solid ${theme.palette.grey[300]};
  height: 100%;
  margin: 0 ${theme.space.base * 4}px;
  display: inline;
`;

const CounterContainer = styled.div`
    div:first-child {
        padding-left: 0;
    }

    div:last-child {
        padding-right: 0;
    }
`;


export const Counters = () => {
  const { t } = useTranslation();

  return (
    <CounterContainer>
      <Counter counter={9} status={"completed"}>
        {t("__DASHABOARD_COUNTER_LABEL_COMPLETED")}
      </Counter>
      <Counter counter={90} status={"progress"}>
        {t("__DASHABOARD_COUNTER_LABEL_PROGRESS")}
      </Counter>
      <Counter counter={1} status={"incoming"}>
        {t("__DASHABOARD_COUNTER_LABEL_INCOMING")}
      </Counter>
      <Pipe />
      <Counter counter={99} status={"functional"}>
        {t("__DASHABOARD_COUNTER_LABEL_FUNCTIONAL")}
      </Counter>
      <Counter counter={1} status={"experiential"}>
        {t("__DASHABOARD_COUNTER_LABEL_EXPERIENTIAL")}
      </Counter>
    </CounterContainer>
  );
};
