import { BugCard } from 'src/common/components/BugCard/BugCardWithIcon';
import { theme as globalTheme } from 'src/app/theme';
import { Span, Tag } from '@appquality/unguess-design-system';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useLocalizeRoute } from 'src/hooks/useLocalizedRoute';
import { ReactComponent as FatherIcon } from './icons/father.svg';
import { ReactComponent as SiblingIcon } from './icons/sibling.svg';

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  &:hover {
    text-decoration: none;
    color: inherit;
  }
`;

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
  <StyledLink
    to={useLocalizeRoute(`campaigns/${campaignId}/bugs/${bugId}`)}
    className={className}
  >
    <BugCard borderColor={globalTheme.palette.grey[500]}>
      {() => (
        <>
          <BugCard.IconBox style={{ marginTop: 0, minWidth: 0 }}>
            {isFather ? (
              <FatherIcon
                style={{
                  width: globalTheme.fontSizes.xl,
                  marginRight: globalTheme.space.xxs,
                  color: globalTheme.palette.grey[600],
                }}
              />
            ) : (
              <SiblingIcon
                style={{
                  width: globalTheme.fontSizes.xl,
                  marginRight: globalTheme.space.xxs,
                  color: globalTheme.palette.grey[600],
                }}
              />
            )}
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
                  <Tag>{pill}</Tag>
                ))}
              </BugCard.Footer>
            ) : null}
          </BugCard.Info>
        </>
      )}
    </BugCard>
  </StyledLink>
);
