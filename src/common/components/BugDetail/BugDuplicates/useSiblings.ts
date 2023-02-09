import { useGetCampaignsByCidBugsAndBidSiblingsQuery } from 'src/features/api';

const useSiblings = ({ cid, bugId }: { cid: number; bugId: number }) => {
  const { data, isLoading, isFetching, isError } =
    useGetCampaignsByCidBugsAndBidSiblingsQuery({
      cid: cid.toString(),
      bid: bugId.toString(),
    });

  return {
    data,
    isLoading,
    isFetching,
    isError,
  };
};

export { useSiblings };
