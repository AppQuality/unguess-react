export const insights = [
  {
    id: 1,
    title: 'insight #1',
    description: 'insight #1 description',
    severity: {
      id: 1,
      name: 'high',
    },
    observations: [
      {
        id: 1,
        title: 'observation #1',
        description: 'observation #1 description',
        /** Format: float */
        start: 1,
        /** Format: float */
        end: 3,
        tags: [
          {
            group: {
              id: 1,
              name: 'group #1',
            },
            tag: {
              id: 1,
              name: 'tag #1',
              style: 'color: #000000',
              usageNumber: 1,
            },
          },
        ],
        quotes: 'lorem ipsum',
        video: {
          id: 1,
          poster: 'https://via.placeholder.com/150',
          url: 'https://via.placeholder.com/150',
          streamUrl: 'https://via.placeholder.com/150',
        },
      },
      {
        id: 2,
        title: 'observation #2',
        description: 'observation #2 description',
        /** Format: float */
        start: 1,
        /** Format: float */
        end: 3,
        tags: [
          {
            group: {
              id: 1,
              name: 'group #1',
            },
            tag: {
              id: 1,
              name: 'tag #1',
              style: 'color: #000000',
              usageNumber: 1,
            },
          },
        ],
        quotes: 'lorem ipsum',
        video: {
          id: 1,
          poster: 'https://via.placeholder.com/150',
          url: 'https://via.placeholder.com/150',
          streamUrl: 'https://via.placeholder.com/150',
        },
      },
    ],
    comment: 'comment #1',
  },
  {
    id: 2,
    title: 'insight #2',
    description: 'insight #2 description',
    severity: {
      id: 1,
      name: 'high',
    },
    observations: [
      {
        id: 3,
        title: 'observation #3',
        description: 'observation #3 description',
        /** Format: float */
        start: 1,
        /** Format: float */
        end: 3,
        tags: [
          {
            group: {
              id: 1,
              name: 'group #1',
            },
            tag: {
              id: 1,
              name: 'tag #1',
              style: 'color: #000000',
              usageNumber: 1,
            },
          },
        ],
        quotes: 'lorem ipsum',
        video: {
          id: 1,
          poster: 'https://via.placeholder.com/150',
          url: 'https://via.placeholder.com/150',
          streamUrl: 'https://via.placeholder.com/150',
        },
      },
      {
        id: 4,
        title: 'observation #4',
        description: 'observation #4 description',
        /** Format: float */
        start: 1,
        /** Format: float */
        end: 3,
        tags: [
          {
            group: {
              id: 1,
              name: 'group #1',
            },
            tag: {
              id: 1,
              name: 'tag #1',
              style: 'color: #000000',
              usageNumber: 1,
            },
          },
        ],
        quotes: 'lorem ipsum',
        video: {
          id: 1,
          poster: 'https://via.placeholder.com/150',
          url: 'https://via.placeholder.com/150',
          streamUrl: 'https://via.placeholder.com/150',
        },
      },
    ],
    comment: 'comment #2',
  },
];

export const usecaseGrapes = {
  results: [
    {
      usecaseId: 2,
      usecaseTitle: 'usecase-2',
      grapes: [
        {
          title: 'title-grape-1',
          severity: 'undetermined',
          usersNumber: 5,
          observations: [
            {
              id: 1,
              title: 'obs1',
              description: 'obs1 desc',
              start: 2,
              end: 15,
              quotes: 'quotes',
              uxNote: 'ux notes',
              tags: [
                {
                  group: {
                    id: 1,
                    name: 'title',
                  },
                  tag: {
                    id: 1,
                    name: 'title-grape-1',
                    style: 'white',
                    usageNumber: 2,
                  },
                },
                {
                  group: {
                    id: 2,
                    name: 'severity',
                  },
                  tag: {
                    id: 15,
                    name: 'minor issue',
                    style: 'white',
                    usageNumber: 2,
                  },
                },
              ],
            },
            {
              id: 2,
              title: 'obs2',
              description: 'obs2 desc',
              start: 2,
              end: 10,
              quotes: 'quotes',
              uxNote: 'ux notes',
              tags: [
                {
                  group: {
                    id: 1,
                    name: 'title',
                  },
                  tag: {
                    id: 1,
                    name: 'title-grape-1',
                    style: 'white',
                    usageNumber: 2,
                  },
                },
                {
                  group: {
                    id: 2,
                    name: 'severity',
                  },
                  tag: {
                    id: 15,
                    name: 'observation',
                    style: 'white',
                    usageNumber: 2,
                  },
                },
              ],
            },
          ],
        },
      ],
      ungrouped: [
        {
          id: 3,
          title: 'ungrouped-obs',
          description: 'descript',
          start: 1,
          end: 54,
          quotes: 'quotes',
          uxNote: 'ux note',
          tags: [
            {
              group: {
                id: 1,
                name: 'title',
              },
              tag: {
                id: 5,
                name: 'title-alone',
                style: 'white',
                usageNumber: 1,
              },
            },
          ],
        },
      ],
    },
  ],
  kind: 'usecase-grapes',
};

export const ungroupedObservations = {
  value: {
    results: [
      {
        id: 1,
        title: 'obs1',
        description: 'descri',
        start: 1,
        end: 10,
        quotes: 'quotes',
        uxNote: 'ux note',
        tags: [
          {
            group: {
              id: 1,
              name: 'title',
            },
            tag: {
              id: 1,
              name: 'title-alone',
              style: 'white',
              usageNumber: 1,
            },
          },
          {
            group: {
              id: 2,
              name: 'severity',
            },
            tag: {
              id: 59,
              name: 'minor issue',
              style: 'white',
              usageNumber: 1,
            },
          },
        ],
      },
      {
        id: 2,
        title: 'obs2',
        description: 'description',
        start: 4,
        end: 9,
        quotes: 'quotes',
        uxNote: 'ux note',
        tags: [
          {
            group: {
              id: 1,
              name: 'title',
            },
            tag: {
              id: 4,
              name: 'title',
              style: 'white',
              usageNumber: 1,
            },
          },
          {
            group: {
              id: 2,
              name: 'severity',
            },
            tag: {
              id: 59,
              name: 'minor issue',
              style: 'white',
              usageNumber: 1,
            },
          },
        ],
      },
    ],
    kind: 'ungrouped',
  },
};
