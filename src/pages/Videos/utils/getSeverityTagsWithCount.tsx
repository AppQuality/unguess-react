import {
  GetCampaignsByCidObservationsApiResponse,
  Observation,
  VideoTag,
} from 'src/features/api';

type TagWithCount = {
  name: string;
  style: string;
  count: number;
};

export function getSeverityTagsByVideoCount(
  observations: Observation[]
): TagWithCount[] {
  const allSeverityTags: VideoTag[] = observations.reduce(
    (acc, observation) => {
      const severityTags = observation.tags.filter(
        (tag) => tag.group.name.toLowerCase() === 'severity'
      );

      return acc.concat(severityTags);
    },
    [] as VideoTag[]
  );

  const tagCount = allSeverityTags.reduce((acc, item) => {
    if (acc[item.tag.name]) {
      acc[item.tag.name].count += 1;
    } else {
      acc[item.tag.name] = { count: 1, style: item.tag.style };
    }
    return acc;
  }, {} as { [key: string]: { count: number; style: string } });

  const orderMap: { [key: string]: number } = {
    'major issue': 0,
    'minor issue': 1,
    observation: 2,
    'positive finding': 3,
  };

  const summedTagsArray: TagWithCount[] = Object.keys(tagCount)
    .map((tagName) => ({
      name: tagName,
      // eslint-disable-next-line
      style: tagCount[tagName].style,
      // eslint-disable-next-line
      count: tagCount[tagName].count,
    }))
    .sort(
      (a, b) => orderMap[a.name.toLowerCase()] - orderMap[b.name.toLowerCase()]
    );
  return summedTagsArray;
}

export function getAllSeverityTags(
  items: GetCampaignsByCidObservationsApiResponse
): TagWithCount[] {
  const globalTagCount: { [key: string]: { count: number; style: string } } =
    {};
  if (items.kind !== 'ungrouped') return [];

  const tagsWithCounts = items.results
    ? getSeverityTagsByVideoCount(items.results)
    : [];

  tagsWithCounts.forEach((tag) => {
    if (globalTagCount[tag.name]) {
      globalTagCount[tag.name].count += tag.count;
    } else {
      globalTagCount[tag.name] = { count: tag.count, style: tag.style };
    }
  });

  const summedTagsArray: TagWithCount[] = Object.keys(globalTagCount).map(
    (tagName) => ({
      name: tagName,
      style: globalTagCount[`${tagName}`].style,
      count: globalTagCount[`${tagName}`].count,
    })
  );

  return summedTagsArray;
}
