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
  const [options, setOptions] = useState<{ id: number; label: string }[]>([]);

  const { tags: bugTags } = bug;
  const [patchBug] = usePatchCampaignsByCidBugsAndBidMutation();

  const {
    isLoading: isLoadingCampaign,
    isFetching: isFetchingCampaign,
    isError: isErrorCampaign,
    data: cpTags,
  } = useGetCampaignsByCidTagsQuery({
    cid: bug.campaign_id.toString() ?? '0',
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
    <Container className="responsive-container">
      <Label style={{ marginBottom: globalTheme.space.xxs }}>
        {t('__BUGS_PAGE_BUG_DETAIL_TAGS_LABEL')}
      </Label>
      {isLoadingCampaign || isFetchingCampaign ? (
        <Skeleton
          height="30px"
          style={{ borderRadius: globalTheme.borderRadii.md }}
        />
      ) : (
        <div className="max-width-6-sm">
          <MultiSelect
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
              const { tags } = await patchBug({
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
        </div>
      )}
    </Container>
  );
};
