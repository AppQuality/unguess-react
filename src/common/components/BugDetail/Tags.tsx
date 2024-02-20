import { Skeleton, MultiSelect, MD } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import {
  useGetCampaignsByCidBugsAndBidQuery,
  useGetCampaignsByCidTagsQuery,
  usePatchCampaignsByCidBugsAndBidMutation,
} from 'src/features/api';
import { appTheme } from 'src/app/theme';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default ({ bugId }: { bugId: number }) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<
    { id: number; label: string; selected?: boolean }[]
  >([]);
  const [selectedOptions, setSelectedOptions] = useState<
    { id: number; label: string }[]
  >([]);
  const [patchBug] = usePatchCampaignsByCidBugsAndBidMutation();
  const { campaignId } = useParams();

  const {
    isLoading: isLoadingCampaignTags,
    isFetching: isFetchingCampaignTags,
    isError: isErrorCampaignTags,
    data: cpTags,
  } = useGetCampaignsByCidTagsQuery({
    cid: campaignId || '',
  });

  const {
    data: bug,
    isLoading: isLoadingBug,
    isFetching: isFetchingBug,
    isError: isErrorBug,
  } = useGetCampaignsByCidBugsAndBidQuery({
    cid: campaignId || '',
    bid: bugId.toString(),
  });

  useEffect(() => {
    if (cpTags) {
      setOptions(
        cpTags.map((tag) => ({
          id: tag.tag_id,
          label: tag.display_name,
          selected: selectedOptions.some((bt) => bt.id === tag.tag_id),
        }))
      );
    }
  }, [cpTags, selectedOptions]);

  useEffect(() => {
    if (bug?.tags) {
      setSelectedOptions(
        bug.tags?.map((tag) => ({
          id: tag.tag_id,
          label: tag.name,
        })) ?? []
      );
    }
  }, [bug?.tags]);

  if (isErrorCampaignTags || isErrorBug) return null;

  return (
    <div>
      <MD style={{ marginBottom: appTheme.space.xxs }}>
        {t('__BUGS_PAGE_BUG_DETAIL_TAGS_LABEL')}
      </MD>
      {!bug ||
      !cpTags ||
      isLoadingCampaignTags ||
      isLoadingBug ||
      isFetchingCampaignTags ||
      isFetchingBug ? (
        <Skeleton
          height="30px"
          style={{ borderRadius: appTheme.borderRadii.md }}
        />
      ) : (
        <div
          className="max-width-6-sm bug-preview-search-tags"
          style={{ opacity: isFetchingCampaignTags ? 0.5 : 1 }}
        >
          <MultiSelect
            options={options}
            selectedItems={options.filter((o) => o.selected)}
            creatable
            maxItems={4}
            size="small"
            i18n={{
              placeholder: t('__BUGS_PAGE_BUG_DETAIL_TAGS_PLACEHOLDER'),
              showMore: (count) =>
                t('__BUGS_PAGE_BUG_DETAIL_TAGS_SHOW_MORE', { count }),
              addNew: (value) =>
                `${t('__BUGS_PAGE_BUG_DETAIL_TAGS_ADD_NEW')} "${value}"`,
            }}
            onChange={async (selectedItems, newMD) => {
              await patchBug({
                cid: bug.campaign_id.toString(),
                bid: bug.id.toString(),
                body: {
                  tags: [
                    ...selectedItems
                      .filter((o) => o.selected)
                      .map((item) => ({
                        tag_id: Number(item.id),
                      })),
                    ...(newMD
                      ? [
                          {
                            tag_name: newMD,
                          },
                        ]
                      : []),
                  ],
                },
              })
                .unwrap()
                .then(({ tags }) => {
                  const selectedTags = tags
                    ? tags.map((tag) => ({
                        id: tag.tag_id,
                        label: tag.tag_name,
                      }))
                    : [];

                  // Update bug tags
                  setSelectedOptions(selectedTags);

                  const unselectedTags = options.filter(
                    (o) => !selectedTags.find((r) => r.id === o.id)
                  );

                  const newOptions = [
                    ...selectedTags.map((r) => ({ ...r, selected: true })),
                    ...unselectedTags.map((r) => ({ ...r, selected: false })),
                  ];

                  // Update options
                  setOptions(newOptions);
                })
                .catch((err) => {
                  // eslint-disable-next-line no-console
                  console.error(err);
                });
            }}
          />
        </div>
      )}
    </div>
  );
};
