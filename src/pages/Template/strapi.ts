export const strapiParams = {
  output_image: '*',
  requirements: {
    populate: {
      description: {
        populate: '*',
      },
      list: {
        populate: '*',
      },
    },
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
  what: { populate: '*' },
  how: {
    populate: {
      timeline: {
        populate: '*',
      },
    },
  },
  express: {
    populate: { express_type: '*' },
  },
};
