import { useGetCampaignsByCidUxQuery } from 'src/features/api';

export const useCampaignInsights = ({ campaignId }: { campaignId: string }) => {
  const { data, isLoading, isFetching, isError } = useGetCampaignsByCidUxQuery({
    cid: campaignId,
  });

  if (isLoading || isFetching) {
    return {
      data: {
        findings: [],
      },
      isLoading: true,
      isError: false,
    };
  }

  if (!data || isError) {
    return {
      data: {
        findings: [],
      },
      isLoading: false,
      isError: true,
    };
  }

  const fakeFindings = [
    {
      id: 1,
      title: 'Malfunzionamenti sul motore di ricerca',
      description:
        "I motori di ricerca dei diversi flussi per fissare un appuntamento presentano malfunzionamenti e dinamiche diverse che rendono complicata l'interazione e la ricerca.",
      severity: {
        id: 1,
        name: 'Major issue',
      },
      cluster: 'all' as const,
      video: [
        {
          id: 1,
          start: 10,
          end: 20,
          mediaId: 1,
          url: 'https://mediaconvert-test-bk.s3.eu-west-1.amazonaws.com/db00e97cfb85971e3fa71b7735142e07ab2d1ebf_1605195177.mp4',
          streamUrl:
            'https://mediaconvert-test-output-bk.s3.eu-west-1.amazonaws.com/db00e97cfb85971e3fa71b7735142e07ab2d1ebf_1605195177-stream.m3u8',
          description:
            "I can't find anything, there are no stores near me that I can visit",
        },
        {
          id: 2,
          start: 25,
          end: 50,
          mediaId: 1,
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          streamUrl:
            'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
          description:
            'I can find something, there are no stores near me that I can visit',
        },
        {
          id: 3,
          start: 60,
          end: 70,
          mediaId: 1,
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          streamUrl:
            'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
          description:
            "I can't find anything, there are no stores near me that I can visit",
        },
      ],
    },
    {
      id: 2,
      title: "Criticità sull'esperienza desktop",
      description:
        "I motori di ricerca dei diversi flussi per fissare un appuntamento presentano malfunzionamenti e dinamiche diverse che rendono complicata l'interazione e la ricerca.",
      severity: {
        id: 2,
        name: 'Minor issue',
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
      video: [
        {
          id: 2,
          start: 15,
          end: 25,
          mediaId: 2,
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          streamUrl:
            'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
          description:
            'I can find something, there are no stores near me that I can visit',
        },
        {
          id: 2,
          start: 25,
          end: 50,
          mediaId: 1,
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          streamUrl:
            'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
          description:
            'I can find something, there are no stores near me that I can visit',
        },
      ],
    },
    {
      id: 3,
      title: "Criticità sull'esperienza desktop",
      description:
        "I motori di ricerca dei diversi flussi per fissare un appuntamento presentano malfunzionamenti e dinamiche diverse che rendono complicata l'interazione e la ricerca.",
      severity: {
        id: 4,
        name: 'Observation',
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
      video: [
        {
          id: 2,
          start: 15,
          end: 25,
          mediaId: 2,
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          streamUrl:
            'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
          description:
            'I can find something, there are no stores near me that I can visit',
        },
      ],
    },
    {
      id: 4,
      title: "Criticità sull'esperienza desktop",
      description:
        "I motori di ricerca dei diversi flussi per fissare un appuntamento presentano malfunzionamenti e dinamiche diverse che rendono complicata l'interazione e la ricerca.",
      severity: {
        id: 3,
        name: 'Positive finding',
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
      video: [
        {
          id: 2,
          start: 15,
          end: 25,
          mediaId: 2,
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          streamUrl:
            'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
          description:
            'I can find something, there are no stores near me that I can visit',
        },
      ],
    },
    {
      id: 5,
      title: "Criticità sull'esperienza desktop",
      description:
        "I motori di ricerca dei diversi flussi per fissare un appuntamento presentano malfunzionamenti e dinamiche diverse che rendono complicata l'interazione e la ricerca.",
      severity: {
        id: 2,
        name: 'Minor issue',
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
      video: [
        {
          id: 2,
          start: 15,
          end: 25,
          mediaId: 2,
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          streamUrl:
            'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
          description:
            'I can find something, there are no stores near me that I can visit',
        },
      ],
    },
    {
      id: 6,
      title: "Criticità sull'esperienza desktop",
      description:
        "I motori di ricerca dei diversi flussi per fissare un appuntamento presentano malfunzionamenti e dinamiche diverse che rendono complicata l'interazione e la ricerca.",
      severity: {
        id: 2,
        name: 'Minor issue',
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
      video: [
        {
          id: 2,
          start: 15,
          end: 25,
          mediaId: 2,
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          streamUrl:
            'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
          description:
            'I can find something, there are no stores near me that I can visit',
        },
      ],
    },
    {
      id: 7,
      title: "Criticità sull'esperienza desktop",
      description:
        "I motori di ricerca dei diversi flussi per fissare un appuntamento presentano malfunzionamenti e dinamiche diverse che rendono complicata l'interazione e la ricerca.",
      severity: {
        id: 2,
        name: 'Minor issue',
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
      video: [
        {
          id: 2,
          start: 15,
          end: 25,
          mediaId: 2,
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          streamUrl:
            'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
          description:
            'I can find something, there are no stores near me that I can visit',
        },
      ],
    },
    {
      id: 8,
      title: "Criticità sull'esperienza desktop",
      description:
        "I motori di ricerca dei diversi flussi per fissare un appuntamento presentano malfunzionamenti e dinamiche diverse che rendono complicata l'interazione e la ricerca.",
      severity: {
        id: 2,
        name: 'Minor issue',
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
      video: [
        {
          id: 2,
          start: 15,
          end: 25,
          mediaId: 2,
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          streamUrl:
            'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
          description:
            'I can find something, there are no stores near me that I can visit',
        },
      ],
    },
    {
      id: 9,
      title: "Criticità sull'esperienza desktop",
      description:
        "I motori di ricerca dei diversi flussi per fissare un appuntamento presentano malfunzionamenti e dinamiche diverse che rendono complicata l'interazione e la ricerca.",
      severity: {
        id: 2,
        name: 'Minor issue',
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
      video: [
        {
          id: 2,
          start: 15,
          end: 25,
          mediaId: 2,
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          streamUrl:
            'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
          description:
            'I can find something, there are no stores near me that I can visit',
        },
      ],
    },
    {
      id: 10,
      title: "Criticità sull'esperienza desktop",
      description:
        "I motori di ricerca dei diversi flussi per fissare un appuntamento presentano malfunzionamenti e dinamiche diverse che rendono complicata l'interazione e la ricerca.",
      severity: {
        id: 2,
        name: 'Minor issue',
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
      video: [
        {
          id: 2,
          start: 15,
          end: 25,
          mediaId: 2,
          url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          streamUrl:
            'http://sample.vodobox.net/skate_phantom_flex_4k/skate_phantom_flex_4k.m3u8',
          description:
            'I can find something, there are no stores near me that I can visit',
        },
      ],
    },
  ];

  return {
    data: {
      findings: fakeFindings,
    },
    isLoading: false,
    isError: false,
  };
};
