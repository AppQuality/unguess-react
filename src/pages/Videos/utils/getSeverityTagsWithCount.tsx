import { Observation, VideoTag } from 'src/features/api';

type TagWithCount = {
  name: string;
  style: string;
  count: number;
};

export function getSeverityTagsWithCount(
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
      style: tagCount[tagName].style,
      count: tagCount[tagName].count,
    })
  );

  return summedTagsArray;
}
