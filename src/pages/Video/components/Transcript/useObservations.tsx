import { useMemo } from 'react';
import { appTheme } from 'src/app/theme';
import { useGetVideosByVidObservationsQuery } from 'src/features/api';

export const useObservations = (videoId: string) => {
  const {
    data: observations,
    isError,
    isFetching,
    isLoading,
  } = useGetVideosByVidObservationsQuery({
    vid: videoId,
  });

  const observationList = useMemo(
    () =>
      observations?.map((o) => {
        function isHexColor(color: string): color is `#${string}` {
          return /^#[0-9A-F]{6}$/i.test(color);
        }

        const defaultColor = appTheme.palette.grey[600] as `#${string}`;

        const color =
          o.tags.find((tag) => tag.group.name.toLowerCase() === 'severity')?.tag
            .style || defaultColor;

        return {
          id: o.id,
          title: o.title,
          text: o.title,
          type: '',
          start: o.start,
          end: o.end,
          color: isHexColor(color) ? color : defaultColor,
        };
      }),
    [observations]
  );

  return {
    data: observationList,
    isError,
    isFetching,
    isLoading,
  };
};
