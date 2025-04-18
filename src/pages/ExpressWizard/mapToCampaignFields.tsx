export const mapLanguages = (language: string[]) =>
  language
    .map((lang) => {
      if (lang === 'en') return 'English';
      if (lang === 'it') return 'Italian';
      if (lang === 'es') return 'Spanish';
      if (lang === 'fr') return 'French';
      return '';
    })
    .filter((lang) => lang !== '');

export const mapProductType = (productType: string) => {
  if (productType === 'webapp') return 1;
  if (productType === 'mobileapp') return 2;
  return 100;
};

export const mapBrowsers = (values: {
  withChrome?: boolean;
  withSafari?: boolean;
  withFirefox?: boolean;
  withEdge?: boolean;
}) => {
  const { withChrome, withSafari, withFirefox, withEdge } = values;
  const browsers = [];
  if (withChrome) browsers.push(1);
  if (withFirefox) browsers.push(2);
  if (withSafari) browsers.push(3);
  if (withEdge) browsers.push(4);
  return browsers;
};

export const mapTesterRequirements = (values: {
  age_range?: string;
  gender?: string;
  digital_literacy?: string;
}) => {
  const { age_range, gender, digital_literacy } = values;

  let requirements = '';

  if (age_range) {
    if (age_range === 'all') requirements += `Age Range: All ages\n`;
    else requirements += `Age Range: ${age_range}\n`;
  }

  if (gender) {
    if (gender === 'all') requirements += `Gender: All genders\n`;
    else requirements += `Gender: ${gender}\n`;
  }

  if (digital_literacy) {
    if (digital_literacy === 'all')
      requirements += `Digital Literacy: All levels\n`;
    else requirements += `Digital Literacy: ${digital_literacy}\n`;
  }

  return requirements;
};
