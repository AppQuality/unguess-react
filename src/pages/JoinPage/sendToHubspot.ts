const PORTAL_ID = '50612068';
const FORM_ID = 'fbacb24e-bbdd-449e-9b4c-55e8aa6d2728';

export async function sendToHubspot(data: {
  email: string;
  firstName: string;
  lastName: string;
}) {
  const url = `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`;

  // Get hubspot utk cookie value if available
  const hutk = document.cookie.match(/hubspotutk=([^;]+)/)?.[1] || null;

  const pageUri = window.location.href;

  const pageName = document.title;

  const params = new URLSearchParams(window.location.search);

  const utm = {
    source: params.get('utm_source'),
    medium: params.get('utm_medium'),
    campaign: params.get('utm_campaign'),
    term: params.get('utm_term'),
    content: params.get('utm_content'),
  };

  console.log('UTM parameters:', utm);
  console.log('HubSpot UTK:', hutk);
  console.log('pageUri:', pageUri);

  const payload = {
    fields: [
      {
        name: 'email',
        value: data.email,
      },
      {
        name: 'firstname',
        value: data.firstName,
      },
      {
        name: 'lastname',
        value: data.lastName,
      },
      {
        name: 'utm_source',
        value: utm.source,
      },
      {
        name: 'utm_medium',
        value: utm.medium,
      },
      {
        name: 'utm_campaign',
        value: utm.campaign,
      },
      {
        name: 'utm_term',
        value: utm.term,
      },
      {
        name: 'utm_content',
        value: utm.content,
      },
    ],
    context: {
      pageUri,
      pageName,
      ...(hutk ? { hutk } : {}), // Only include hutk if it's available
    },
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`HubSpot API error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error submitting to HubSpot:', error);
    throw error;
  }
}
