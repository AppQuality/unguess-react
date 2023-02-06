import { BugCard } from 'src/common/components/BugCard/BugCardWithIcon';
import { theme as globalTheme } from 'src/app/theme';
import { Pill } from 'src/common/components/pills/Pill';
import { Span } from '@appquality/unguess-design-system';
import { getLocalizedBugUrl } from 'src/hooks/useLocalizeDashboardUrl';
import i18n from 'src/i18n';
import { ReactComponent as FatherIcon } from './icons/father.svg';
import { ReactComponent as SiblingIcon } from './icons/sibling.svg';

export const BugItem = ({
  isFather,
  campaignId,
  bugId,
  title,
  pills,
}: {
  isFather?: boolean;
  campaignId: number;
  bugId: number;
  title: string;
  pills: string[];
}) => {
  const goToBug = () => {
    window.location.href = getLocalizedBugUrl(campaignId, bugId, i18n.language);
  };

  return (
    <BugCard borderColor={globalTheme.palette.grey[500]} onClick={goToBug}>
      {() => (
        <>
          <BugCard.IconBox>
            {isFather ? <FatherIcon /> : <SiblingIcon />}
          </BugCard.IconBox>
          <BugCard.Info style={{ marginLeft: globalTheme.space.sm }}>
            <BugCard.TopTitle>ID {bugId}</BugCard.TopTitle>
            <BugCard.Title>
              <BugCard.Content>
                <Span>{title}</Span>
              </BugCard.Content>
            </BugCard.Title>
            {pills ? (
              <BugCard.Footer>
                {pills.map((pill) => (
                  <Pill>{pill}</Pill>
                ))}
              </BugCard.Footer>
            ) : null}
          </BugCard.Info>
        </>
      )}
    </BugCard>
  );
};
