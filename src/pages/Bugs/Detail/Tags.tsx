import { MD, MultiSelect, Skeleton } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import {
  Bug,
  BugTag,
  useGetCampaignsByCidTagsQuery,
  usePatchCampaignsByCidBugsAndBidMutation,
} from 'src/features/api';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { getSelectedBugId } from 'src/features/bugsPage/bugsPageSlice';
import { useEffect, useState } from 'react';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin: ${({ theme }) => theme.space.lg} 0;
`;

export default ({
  bug,
  campaignId,
}: {
  bug: Bug & {
    reporter: {
      tester_id: number;
      name: string;
    };
    tags?: BugTag[];
  };
  campaignId: number;
}) => {
  const { t } = useTranslation();
  const currentBugId = getSelectedBugId();
  const { tags: bugTags } = bug;
  const [patchBug] = usePatchCampaignsByCidBugsAndBidMutation();
  const [selectedTags, setSelectedTags] = useState(
    bugTags?.map((tag) => ({
      id: tag.tag_id,
      label: tag.name,
    }))
  );

  useEffect(() => {
    setSelectedTags(
      bugTags?.map((tag) => ({
        id: tag.tag_id,
        label: tag.name,
      }))
    );
  }, [bugTags]);

  const {
    isLoading: isLoadingCampaign,
    isFetching: isFetchingCampaign,
    isError: isErrorCampaign,
    data: cpTags,
  } = useGetCampaignsByCidTagsQuery({
    cid: campaignId?.toString() ?? '0',
  });

  if (isErrorCampaign) return null;

  return (
    <Container>
      <MD isBold style={{ marginBottom: globalTheme.space.xxs }}>
        {t('__BUGS_PAGE_BUG_DETAIL_TAGS_LABEL')}
      </MD>
      {isLoadingCampaign || isFetchingCampaign ? (
        <Skeleton
          height="30px"
          style={{ borderRadius: globalTheme.borderRadii.md }}
        />
      ) : (
        <MultiSelect
          creatable
          maxItems={4}
          size="small"
          i18n={{}}
          onChange={async (selectedItems, newItem) => {
            console.log('selectedItems', selectedItems);

            const tags = [
              ...selectedItems.map((item) => ({ tag_id: Number(item.id) })),
              ...(newItem ? [{ tag_name: newItem }] : []),
            ];

            console.log('tags', tags);

            // Patch bug
            const resultItems = await patchBug({
              cid: campaignId?.toString() ?? '0',
              bid: currentBugId?.toString() ?? '0',
              body: {
                tags,
              },
            }).unwrap();

            setSelectedTags(
              resultItems.tags
                ? resultItems.tags.map((tag) => ({
                    id: tag.tag_id,
                    label: tag.tag_name,
                  }))
                : []
            );

            return resultItems.tags
              ? resultItems.tags.map((tag) => ({
                  id: tag.tag_id,
                  label: tag.tag_name,
                }))
              : [];
          }}
          options={
            cpTags
              ? cpTags.map((tag) => ({
                  id: tag.tag_id,
                  label: tag.display_name,
                }))
              : []
          }
          selectedItems={selectedTags}
        />
      )}
    </Container>
  );
};
