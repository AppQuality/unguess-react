import { useAppSelector } from 'src/app/hooks';

export type TagFilterType = {
  tags: {
    available: {
      tag_id: number | 'none';
      display_name: string;
      slug: string;
      is_public?: number;
    }[];
    selected: {
      tag_id: number | 'none';
      display_name: string;
      slug: string;
      is_public?: number;
    }[];
  };
};

export const TagFilter = {
  reset: (state: TagFilterType) => ({
    tags: {
      ...TagFilter.getCurrent(state),
      selected: [],
    },
  }),
  getCurrent: (state?: TagFilterType) => ({
    available: state?.tags?.available ? state.tags.available : [],
    selected: state?.tags?.selected ? state.tags.selected : [],
  }),
  setAvailable: (
    state: TagFilterType,
    tags?: {
      tag_id: number;
      display_name: string;
      slug: string;
      is_public?: number;
    }[]
  ) => ({
    tags: {
      ...TagFilter.getCurrent(state),
      ...(tags ? { available: tags } : {}),
    },
  }),
  filter: (
    state: TagFilterType,
    tags?: {
      tag_id: number;
      display_name: string;
      slug: string;
      is_public?: number;
    }[]
  ) => ({
    tags: {
      ...TagFilter.getCurrent(state),
      ...(tags ? { selected: tags } : {}),
    },
  }),
  getValues: () => {
    const bugsPageSlice = useAppSelector((state) => state.bugsPage);

    if (!bugsPageSlice.currentCampaign) return undefined;

    if (!bugsPageSlice.campaigns[bugsPageSlice.currentCampaign].tags)
      return undefined;

    const campaign: TagFilterType =
      bugsPageSlice.campaigns[bugsPageSlice.currentCampaign];

    if (!campaign.tags.selected) return undefined;
    return campaign.tags.selected;
  },
  getIds: () => {
    const values = TagFilter.getValues();
    if (!values) return undefined;
    return values.map((t) => t.tag_id);
  },
};
