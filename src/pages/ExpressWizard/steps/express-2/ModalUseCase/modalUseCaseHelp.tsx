import {
  Paragraph,
  Timeline,
  XL,
  XXL,
  theme as globalTheme,
  Skeleton,
} from '@appquality/unguess-design-system';
import { ReactComponent as HelpImg } from 'src/assets/modal-use-case-help.svg';
import { ReactComponent as CheckIcon } from 'src/assets/icons/check-icon.svg';
import { ReactComponent as CancelIcon } from 'src/assets/icons/cancel-icon.svg';
import styled from 'styled-components';
import { getLocalizedStrapiData } from 'src/common/utils';
import { useAppSelector } from 'src/app/hooks';
import { useGeti18nExpressTypesByIdQuery } from 'src/features/backoffice/strapi';
import i18n from 'src/i18n';

export const ScrollingContainer = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(
    100vh - ${({ theme }) => theme.components.chrome.header.height}
  );
  padding: 0;

  ::-webkit-scrollbar {
    background-color: transparent;
  }

  &:hover {
    ::-webkit-scrollbar {
      background-color: inherit;
    }
  }
`;

const HelpContainer = styled.div`
  padding: ${({ theme }) => theme.space.xl};
  overflow-x: hidden;
`;

const GroupTitle = styled.div`
  margin-bottom: ${({ theme }) => theme.space.sm};
  color: ${({ theme }) => theme.palette.grey[600]};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  margin-top: ${({ theme }) => theme.space.lg};
  text-transform: uppercase;
`;

export const ModalUseCaseHelp = () => {
  const { expressTypeId } = useAppSelector((state) => state.express);

  const { data, isLoading, isFetching, isError } =
    useGeti18nExpressTypesByIdQuery({
      id: expressTypeId.toString(),
      populate: {
        use_cases_help: {
          populate: {
            suggestions: {
              populate: '*',
            },
          },
        },
        localizations: {
          populate: {
            use_cases_help: {
              populate: {
                suggestions: {
                  populate: '*',
                },
              },
            },
          },
        },
      },
    });

  const expressType = getLocalizedStrapiData({
    item: data,
    language: i18n.language,
  });

  const { use_cases_help: useCaseHelp } = expressType;

  return (
    <ScrollingContainer>
      <HelpContainer>
        <HelpImg />
        {data && useCaseHelp && !isError && !isFetching && !isLoading ? (
          <>
            {useCaseHelp.title ? (
              <XXL style={{ marginTop: globalTheme.space.lg }}>
                {useCaseHelp.title}
              </XXL>
            ) : null}
            {useCaseHelp.description ? (
              <Paragraph style={{ marginBottom: globalTheme.space.sm }}>
                {useCaseHelp.description}
              </Paragraph>
            ) : null}
            {useCaseHelp.suggestions && useCaseHelp.suggestions.length > 0
              ? useCaseHelp.suggestions.map(
                  (suggestion: any, index: number) => (
                    <>
                      {suggestion.group_title && {
                        ...(index === useCaseHelp.suggestions.length - 1 ? (
                          <XL
                            style={{
                              marginTop: globalTheme.space.xl,
                              marginBottom: globalTheme.space.sm,
                              color: globalTheme.palette.grey[800],
                              fontWeight: globalTheme.fontWeights.medium,
                            }}
                          >
                            {suggestion.group_title}
                          </XL>
                        ) : (
                          <GroupTitle>{suggestion.group_title}</GroupTitle>
                        )),
                      }}

                      {suggestion.items && suggestion.items.length > 0 && (
                        <Timeline>
                          {suggestion.items.map((item: any) => (
                            <Timeline.Item
                              icon={
                                item.is_pros ? <CheckIcon /> : <CancelIcon />
                              }
                              hiddenLine
                            >
                              <Timeline.Content>
                                <Paragraph style={{ fontWeight: 500 }}>
                                  {item.title}
                                </Paragraph>
                                <Paragraph style={{ marginTop: 0 }}>
                                  {item.content}
                                </Paragraph>
                              </Timeline.Content>
                            </Timeline.Item>
                          ))}
                        </Timeline>
                      )}
                    </>
                  )
                )
              : null}
          </>
        ) : (
          <>
            <Skeleton
              height="30px"
              style={{ marginTop: globalTheme.space.md }}
            />
            <Skeleton
              height="30px"
              style={{ marginTop: globalTheme.space.md }}
            />
            <Skeleton
              height="300px"
              style={{ marginTop: globalTheme.space.md }}
            />
          </>
        )}
      </HelpContainer>
    </ScrollingContainer>
  );
};
