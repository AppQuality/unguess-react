interface Insight {
  id: number;
  title: string;
  description: string;
  severity: {
    id: number;
    name: string;
  };
  cluster:
    | string
    | {
        id: number;
        name: string;
      }[];
  videoPart: {
    id: number;
    start: number;
    end: number;
    mediaId: number;
    url: string;
    streamUrl: string;
    description: string;
  }[];
}

export const useCampaignInsights = ({
  campaignId,
}: {
  campaignId: number;
}): {
  data: {
    insights: Insight[];
  };
  isLoading: boolean;
} => {
  const isLoading = false;

  if (isLoading) {
    return {
      data: {
        insights: [],
      },
      isLoading: true,
    };
  }

  const results = {
    insights: [
      {
        id: 1,
        title: 'My insight',
        description: 'This is an insight',
        severity: {
          id: 1,
          name: 'Minor',
        },
        cluster: 'all',
        videoPart: [
          {
            id: 1,
            start: 10,
            end: 20,
            mediaId: 1,
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            streamUrl:
              'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
            description: 'This is a video part',
          },
        ],
      },
      {
        id: 2,
        title: 'My second insight',
        description: 'This is another insight',
        severity: {
          id: 2,
          name: 'Positive',
        },
        cluster: [
          {
            id: 1,
            name: 'UC1: Cart',
          },
          {
            id: 2,
            name: 'UC2: Login',
          },
        ],
        videoPart: [
          {
            id: 2,
            start: 15,
            end: 25,
            mediaId: 2,
            url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            streamUrl:
              'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
            description: 'This is a video part',
          },
        ],
      },
    ],
  };

  return {
    data: results,
    isLoading: false,
  };
};
