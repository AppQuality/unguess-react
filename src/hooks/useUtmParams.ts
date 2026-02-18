import { useSearchParams } from 'react-router-dom';

const UTM_KEYS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_content',
  'utm_term',
  'platform',
] as const;

const STORAGE_KEY = 'utmParams';

type UtmParams = Partial<Record<(typeof UTM_KEYS)[number], string>>;

function getStoredUtmParams(): UtmParams {
  try {
    const stored = sessionStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

export function useUtmParams(): UtmParams {
  const [searchParams] = useSearchParams();

  const urlParams: UtmParams = {};
  UTM_KEYS.forEach((key) => {
    const value = searchParams.get(key);
    if (value) {
      urlParams[key] = value;
    }
  });

  if (Object.keys(urlParams).length > 0) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(urlParams));
    return urlParams;
  }

  return getStoredUtmParams();
}
