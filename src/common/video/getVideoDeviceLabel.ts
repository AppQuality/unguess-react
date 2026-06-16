import type { TFunction } from 'i18next';
import type { Video } from 'src/features/api';

export type VideoFormFactor = NonNullable<
  NonNullable<Video['device']>['formFactor']
>;

export const VIDEO_FORM_FACTORS: VideoFormFactor[] = [
  'smartphone',
  'tablet',
  'desktop',
  'other',
  'unknown',
];

export const VIDEO_DEVICE_SECTION_ORDER: VideoFormFactor[] = [
  'desktop',
  'tablet',
  'smartphone',
  'other',
  'unknown',
];

export const isVideoFormFactor = (value?: string): value is VideoFormFactor =>
  !!value && VIDEO_FORM_FACTORS.includes(value as VideoFormFactor);

const videoDeviceTranslationKeyMap: Record<VideoFormFactor, string> = {
  smartphone: '__VIDEOS_LIST_SMARTPHONE_TITLE',
  tablet: '__VIDEOS_LIST_TABLET_TITLE',
  desktop: '__VIDEOS_LIST_DESKTOP_TITLE',
  other: '__VIDEOS_LIST_OTHER_TITLE',
  unknown: '__VIDEOS_LIST_UNKNOWN_DEVICE_TITLE',
};

export const getVideoDeviceLabel = (
  t: TFunction,
  deviceType?: VideoFormFactor
) => {
  if (!deviceType) return undefined;

  return t(videoDeviceTranslationKeyMap[`${deviceType}`]);
};
