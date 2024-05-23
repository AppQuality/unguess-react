import {
  GetCampaignsByCidVideoApiResponse,
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

  const summedTagsArray: TagWithCount[] = Object.keys(tagCount).map(
    (tagName) => ({
      name: tagName,
      style: tagCount[`${tagName}`].style,
      count: tagCount[`${tagName}`].count,
    })
  );

  return summedTagsArray;
}

export function getAllSeverityTags(
  items: GetCampaignsByCidVideoApiResponse['items']
): TagWithCount[] {
  const globalTagCount: { [key: string]: { count: number; style: string } } =
    {};

  // Iterate over each item
  items.forEach((item) => {
    // Iterate over each video in the item
    item.videos.forEach((video) => {
      const tagsWithCounts = video.observations
        ? getSeverityTagsByVideoCount(video.observations)
        : [];

      tagsWithCounts.forEach((tag) => {
        if (globalTagCount[tag.name]) {
          globalTagCount[tag.name].count += tag.count;
        } else {
          globalTagCount[tag.name] = { count: tag.count, style: tag.style };
        }
      });
    });
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
