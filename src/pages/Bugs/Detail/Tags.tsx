import { MD, Skeleton, MultiSelect } from '@appquality/unguess-design-system';
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
  const [options, setOptions] = useState<{ id: number; label: string }[]>([]);
  const currentBugId = getSelectedBugId();
  const { tags: bugTags } = bug;
  const [patchBug] = usePatchCampaignsByCidBugsAndBidMutation();

  const {
    isLoading: isLoadingCampaign,
    isFetching: isFetchingCampaign,
    isError: isErrorCampaign,
    data: cpTags,
  } = useGetCampaignsByCidTagsQuery({
    cid: campaignId?.toString() ?? '0',
  });

  useEffect(() => {
    if (cpTags) {
      setOptions(
        cpTags.map((tag) => ({
          id: tag.tag_id,
          label: tag.display_name,
          selected: bugTags
            ? bugTags.some((selectedTag) => selectedTag.tag_id === tag.tag_id)
            : false,
        }))
      );
    }
  }, [cpTags, bugTags]);

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
          onChange={async (selectedItems, newLabel) => {
            const { tags } = await patchBug({
              cid: campaignId.toString(),
              bid: currentBugId ? currentBugId.toString() : '0',
              body: {
                tags: [
                  ...selectedItems
                    .filter((o) => o.selected)
                    .map((item) => ({
                      tag_id: Number(item.id),
                    })),
                  ...(newLabel
                    ? [
                        {
                          tag_name: newLabel,
                        },
                      ]
                    : []),
                ],
              },
            }).unwrap();

            const results = tags
              ? tags.map((tag) => ({
                  id: tag.tag_id,
                  label: tag.tag_name,
                }))
              : [];
            const unselectedItems = options.filter(
              (o) => !results.find((r) => r.id === o.id)
            );
            setOptions([
              ...unselectedItems,
              ...results.map((r) => ({ ...r, selected: true })),
            ]);
          }}
          options={options}
        />
      )}
    </Container>
  );
};
