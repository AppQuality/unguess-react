import { BugCard } from 'src/common/components/BugCard/BugCardWithIcon';
import { appTheme } from 'src/app/theme';
import { Span, Tag } from '@appquality/unguess-design-system';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { ReactComponent as FatherIcon } from './icons/father.svg';
import { ReactComponent as SiblingIcon } from './icons/sibling.svg';

export const BugItem = ({
  isFather,
  campaignId,
  bugId,
  title,
  pills,
  className,
}: {
  isFather?: boolean;
  campaignId: number;
  bugId: number;
  title: string;
  pills: string[];
  className?: string;
}) => (
  <BugCard
    url={useLocalizeRoute(`campaigns/${campaignId}/bugs/${bugId}`)}
    borderColor={appTheme.palette.grey[500]}
    className={className}
  >
    {() => (
      <>
        <BugCard.IconBox style={{ marginTop: 0, minWidth: 0 }}>
          {isFather ? (
            <FatherIcon
              style={{
                width: appTheme.fontSizes.xl,
                marginRight: appTheme.space.xxs,
                color: appTheme.palette.grey[600],
              }}
            />
          ) : (
            <SiblingIcon
              style={{
                width: appTheme.fontSizes.xl,
                marginRight: appTheme.space.xxs,
                color: appTheme.palette.grey[600],
              }}
            />
          )}
        </BugCard.IconBox>
        <BugCard.Info style={{ marginLeft: appTheme.space.sm }}>
          <BugCard.TopTitle>ID {bugId}</BugCard.TopTitle>
          <BugCard.Title>
            <BugCard.Content>
              <Span>{title}</Span>
            </BugCard.Content>
          </BugCard.Title>
          {pills ? (
            <BugCard.Footer>
              {pills.map((pill) => (
                <Tag>{pill}</Tag>
              ))}
            </BugCard.Footer>
          ) : null}
        </BugCard.Info>
      </>
    )}
  </BugCard>
);
