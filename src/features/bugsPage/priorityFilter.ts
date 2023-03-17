import { useAppSelector } from 'src/app/hooks';

export type PriorityFilterType = {
    priorities: {
        available: { id: number; name: string }[];
        selected: { id: number; name: string }[];
    };
};

export const PriorityFilter = {
    reset: (state: PriorityFilterType) => ({
        priorities: {
            ...PriorityFilter.getCurrent(state),
            selected: [],
        },
    }),
    getCurrent: (state?: PriorityFilterType) => ({
        available: state ? state.priorities.available : [],
        selected: state ? state.priorities.selected : [],
    }),
    setAvailable: (
        state: PriorityFilterType,
        priorities: { id: number; name: string }[]
    ) => ({
        priorities: {
            ...PriorityFilter.getCurrent(state),
            ...(priorities ? { available: priorities } : {}),
        },
    }),
    filter: (
        state: PriorityFilterType,
        priorities?: { id: number; name: string }[]
    ) => ({
        priorities: {
            ...PriorityFilter.getCurrent(state),
            ...(priorities ? { selected: priorities } : {}),
        },
    }),
    getValues: () => {
        const bugsPageSlice = useAppSelector((state) => state.bugsPage);

        if (!bugsPageSlice.currentCampaign) return undefined;

        if (!bugsPageSlice.campaigns[bugsPageSlice.currentCampaign].priorities)
            return undefined;

        const campaign: PriorityFilterType =
            bugsPageSlice.campaigns[bugsPageSlice.currentCampaign];

        return campaign.priorities.selected;
    },
    getIds: () => {
        const values = PriorityFilter.getValues();
        if (!values) return undefined;
        return values.map((t) => t.id);
    },
};
