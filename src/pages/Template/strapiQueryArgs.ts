export const strapiQueryArgs = {
  icon: '*',
  slug: '*',
  Price: {
    populate: {
      tag_price: {
        populate: '*',
      },
    },
  },
  output: {
    populate: '*',
  },
  requirements: {
    populate: '*',
  },
  express: {
    populate: '*',
  },
  why: {
    populate: {
      reasons: {
        populate: '*',
      },
      advantages: {
        populate: '*',
      },
    },
  },
  how: {
    populate: {
      timeline: {
        populate: '*',
      },
    },
  },
  what: {
    populate: '*',
  },
};
