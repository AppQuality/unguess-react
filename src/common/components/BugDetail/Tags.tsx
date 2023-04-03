import { Skeleton, MultiSelect } from '@appquality/unguess-design-system';
import { useTranslation } from 'react-i18next';
import {
  Bug,
  BugTag,
  useGetCampaignsByCidTagsQuery,
  usePatchCampaignsByCidBugsAndBidMutation,
} from 'src/features/api';
import styled from 'styled-components';
import { theme as globalTheme } from 'src/app/theme';
import { useEffect, useState } from 'react';
import { Label } from './Label';
import 'src/common/components/BugDetail/responsive-grid.css';

const Container = styled.div`
  display: inline-block;
  width: 100%;
  margin-top: ${({ theme }) => theme.space.xs};
`;

export default ({
  bug,
}: {
  bug: Bug & {
    reporter: {
      tester_id: number;
      name: string;
    };
    tags?: BugTag[];
  };
}) => {
  const { t } = useTranslation();
  const [options, setOptions] = useState<
    { id: number; label: string; selected?: boolean }[]
  >([]);
  const [bugTags, setBugTags] = useState<
    {
      id: number;
      label: string;
    }[]
  >([
    ...(bug.tags?.map((tag) => ({
      id: tag.tag_id,
      label: tag.name,
    })) ?? []),
  ]);

  const {
    isLoading: isLoadingCampaignTags,
    isFetching: isFetchingCampaignTags,
    isError: isErrorCampaignTags,
    data: cpTags,
    refetch: refetchCpTags,
  } = useGetCampaignsByCidTagsQuery({
    cid: bug.campaign_id.toString() ?? '0',
  });

  useEffect(() => {
    if (cpTags) {
      setOptions(
        cpTags.map((tag) => ({
          id: tag.tag_id,
          label: tag.display_name,
          selected: bugTags.some((bt) => bt.id === tag.tag_id),
        }))
      );
    }
  }, [cpTags, bugTags]);

  const [patchBug] = usePatchCampaignsByCidBugsAndBidMutation();

  if (isErrorCampaignTags) return null;

  return (
    <Container className="responsive-container">
      <Label style={{ marginBottom: globalTheme.space.xxs }}>
        {t('__BUGS_PAGE_BUG_DETAIL_TAGS_LABEL')}
      </Label>
      {!bug || !cpTags || isLoadingCampaignTags ? (
        <Skeleton
          height="30px"
          style={{ borderRadius: globalTheme.borderRadii.md }}
        />
      ) : (
        <div
          className="max-width-6-sm"
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
            onChange={async (selectedItems, newLabel) => {
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
                    ...(newLabel
                      ? [
                          {
                            tag_name: newLabel,
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
                  setBugTags(selectedTags);

                  const unselectedTags = options.filter(
                    (o) => !selectedTags.find((r) => r.id === o.id)
                  );

                  const newOptions = [
                    ...selectedTags.map((r) => ({ ...r, selected: true })),
                    ...unselectedTags.map((r) => ({ ...r, selected: false })),
                  ];

                  // Update options
                  setOptions(newOptions);

                  // Refetch cp tags to get the new ones
                  refetchCpTags();
                })
                .catch((err) => {
                  // eslint-disable-next-line no-console
                  console.error(err);
                });
            }}
          />
        </div>
      )}
    </Container>
  );
};
