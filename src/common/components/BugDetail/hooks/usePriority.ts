const usePriority = ({ cid }: { cid: number }) => {
  console.log('TODO: remove this fake usePriority API call for cid: ', cid);

  return {
    data: {
      items: [
        {
          id: 1,
          name: 'lowest',
        },
        {
          id: 2,
          name: 'low',
        },
        {
          id: 3,
          name: 'medium',
        },
        {
          id: 4,
          name: 'high',
        },
        {
          id: 5,
          name: 'highest',
        },
      ],
    },
    isLoading: false,
    isFetching: false,
    isError: false,
  };
};

export { usePriority };
