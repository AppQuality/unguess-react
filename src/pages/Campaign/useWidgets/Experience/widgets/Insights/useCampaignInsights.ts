import { useGetCampaignsByCidUxQuery } from 'src/features/api';
import { useAppSelector } from 'src/app/hooks';
import { data } from './fakeData';

export const useCampaignInsights = ({
  campaignId,
  isPreview,
}: {
  campaignId: string;
  isPreview?: boolean;
}) => {
  // const { data, isLoading, isFetching, isError } = useGetCampaignsByCidUxQuery({
  //   cid: campaignId,
  //   ...(!isPreview && { showAsCustomer: true }),
  // });

  const { severity: selectedSeverity, usecase: selectedUseCase } =
    useAppSelector((state) => state.uxFilters);

  const isLoading = false;
  const isError = false;
  const isFetching = false;

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

  // Filter by severity
  let filteredFindings = selectedSeverity.length
    ? data.findings.filter((finding) =>
        selectedSeverity.some((i) => i.id === finding.severity.id)
      )
    : data.findings;

  // Filter by usecase
  filteredFindings = selectedUseCase.length
    ? filteredFindings.filter((finding) =>
        selectedUseCase.some((i) =>
          finding.cluster.some((cluster) => i.id === cluster.id)
        )
      )
    : filteredFindings;

  return {
    data: { ...data, findings: filteredFindings },
    isLoading: false,
    isError: false,
  };
};
