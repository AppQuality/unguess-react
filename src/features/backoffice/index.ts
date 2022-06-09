import { strapiSlice as api } from './strapi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getServices: build.query<GetServicesApiResponse, GetServicesApiArg>({
      query: (queryArg) => ({
        url: `/services`,
        params: {
          sort: queryArg.sort,
          pagination: queryArg.pagination,
          fields: queryArg.fields,
          populate: queryArg.populate,
        },
      }),
    }),
    postServices: build.mutation<PostServicesApiResponse, PostServicesApiArg>({
      query: (queryArg) => ({
        url: `/services`,
        method: 'POST',
        body: queryArg.serviceRequest,
      }),
    }),
    getServicesById: build.query<
      GetServicesByIdApiResponse,
      GetServicesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/services/${queryArg.id}` }),
    }),
    putServicesById: build.mutation<
      PutServicesByIdApiResponse,
      PutServicesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/services/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.serviceRequest,
      }),
    }),
    deleteServicesById: build.mutation<
      DeleteServicesByIdApiResponse,
      DeleteServicesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/services/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    postServicesByIdLocalizations: build.mutation<
      PostServicesByIdLocalizationsApiResponse,
      PostServicesByIdLocalizationsApiArg
    >({
      query: (queryArg) => ({
        url: `/services/${queryArg.id}/localizations`,
        method: 'POST',
        body: queryArg.serviceLocalizationRequest,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as unguessStrapi };
export type GetServicesApiResponse = /** status 200 OK */ ServiceListResponse;
export type GetServicesApiArg = {
  /** Sort by attributes ascending (asc) or descending (desc) */
  sort?: string;
  pagination?: {
    withCount?: boolean;
    page?: number;
    pageSize?: number;
    start?: number;
    limit?: number;
  };
  /** Fields to return (ex: title,author) */
  fields?: string;
  /** Relations to return */
  populate?: string;
};
export type PostServicesApiResponse = /** status 200 OK */ ServiceResponse;
export type PostServicesApiArg = {
  serviceRequest: ServiceRequest;
};
export type GetServicesByIdApiResponse = /** status 200 OK */ ServiceResponse;
export type GetServicesByIdApiArg = {
  id: string;
};
export type PutServicesByIdApiResponse = /** status 200 OK */ ServiceResponse;
export type PutServicesByIdApiArg = {
  id: string;
  serviceRequest: ServiceRequest;
};
export type DeleteServicesByIdApiResponse = /** status 200 OK */ number;
export type DeleteServicesByIdApiArg = {
  id: string;
};
export type PostServicesByIdLocalizationsApiResponse =
  /** status 200 OK */ ServiceLocalizationResponse;
export type PostServicesByIdLocalizationsApiArg = {
  id: string;
  serviceLocalizationRequest: ServiceLocalizationRequest;
};
export type ServiceListResponse = {
  data?: {
    id?: string;
    attributes?: {
      icon?: {
        data?: {
          id?: string;
          attributes?: {
            name?: string;
            alternativeText?: string;
            caption?: string;
            width?: number;
            height?: number;
            formats?: any;
            hash?: string;
            ext?: string;
            mime?: string;
            size?: number;
            url?: string;
            previewUrl?: string;
            provider?: string;
            provider_metadata?: any;
            related?: {
              data?: {
                id?: string;
                attributes?: {};
              }[];
            };
            createdAt?: string;
            updatedAt?: string;
            createdBy?: {
              data?: {
                id?: string;
                attributes?: {
                  firstname?: string;
                  lastname?: string;
                  username?: string;
                  email?: string;
                  resetPasswordToken?: string;
                  registrationToken?: string;
                  isActive?: boolean;
                  roles?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        name?: string;
                        code?: string;
                        description?: string;
                        users?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          }[];
                        };
                        permissions?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              action?: string;
                              subject?: string;
                              properties?: any;
                              conditions?: any;
                              role?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                            };
                          }[];
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                      };
                    }[];
                  };
                  blocked?: boolean;
                  preferedLanguage?: string;
                  createdAt?: string;
                  updatedAt?: string;
                  createdBy?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                  updatedBy?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                };
              };
            };
            updatedBy?: {
              data?: {
                id?: string;
                attributes?: {};
              };
            };
          };
        };
      };
      campaign_type?: string;
      title?: string;
      is_express?: boolean;
      description?: string;
      duration_in_days?: number;
      environment?: string;
      output_image?: {
        data?: {
          id?: string;
          attributes?: {
            name?: string;
            alternativeText?: string;
            caption?: string;
            width?: number;
            height?: number;
            formats?: any;
            hash?: string;
            ext?: string;
            mime?: string;
            size?: number;
            url?: string;
            previewUrl?: string;
            provider?: string;
            provider_metadata?: any;
            related?: {
              data?: {
                id?: string;
                attributes?: {};
              }[];
            };
            createdAt?: string;
            updatedAt?: string;
            createdBy?: {
              data?: {
                id?: string;
                attributes?: {
                  firstname?: string;
                  lastname?: string;
                  username?: string;
                  email?: string;
                  resetPasswordToken?: string;
                  registrationToken?: string;
                  isActive?: boolean;
                  roles?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        name?: string;
                        code?: string;
                        description?: string;
                        users?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          }[];
                        };
                        permissions?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              action?: string;
                              subject?: string;
                              properties?: any;
                              conditions?: any;
                              role?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                            };
                          }[];
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                      };
                    }[];
                  };
                  blocked?: boolean;
                  preferedLanguage?: string;
                  createdAt?: string;
                  updatedAt?: string;
                  createdBy?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                  updatedBy?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                };
              };
            };
            updatedBy?: {
              data?: {
                id?: string;
                attributes?: {};
              };
            };
          };
        };
      };
      requirements?: {
        id?: string;
        description?: string;
        list?: {
          id?: string;
          item?: string;
        }[];
      };
      why?: {
        id?: string;
        reasons?: {
          id?: string;
          icon?: {
            data?: {
              id?: string;
              attributes?: {
                name?: string;
                alternativeText?: string;
                caption?: string;
                width?: number;
                height?: number;
                formats?: any;
                hash?: string;
                ext?: string;
                mime?: string;
                size?: number;
                url?: string;
                previewUrl?: string;
                provider?: string;
                provider_metadata?: any;
                related?: {
                  data?: {
                    id?: string;
                    attributes?: {};
                  }[];
                };
                createdAt?: string;
                updatedAt?: string;
                createdBy?: {
                  data?: {
                    id?: string;
                    attributes?: {
                      firstname?: string;
                      lastname?: string;
                      username?: string;
                      email?: string;
                      resetPasswordToken?: string;
                      registrationToken?: string;
                      isActive?: boolean;
                      roles?: {
                        data?: {
                          id?: string;
                          attributes?: {
                            name?: string;
                            code?: string;
                            description?: string;
                            users?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              }[];
                            };
                            permissions?: {
                              data?: {
                                id?: string;
                                attributes?: {
                                  action?: string;
                                  subject?: string;
                                  properties?: any;
                                  conditions?: any;
                                  role?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                  createdAt?: string;
                                  updatedAt?: string;
                                  createdBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                  updatedBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                };
                              }[];
                            };
                            createdAt?: string;
                            updatedAt?: string;
                            createdBy?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              };
                            };
                            updatedBy?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              };
                            };
                          };
                        }[];
                      };
                      blocked?: boolean;
                      preferedLanguage?: string;
                      createdAt?: string;
                      updatedAt?: string;
                      createdBy?: {
                        data?: {
                          id?: string;
                          attributes?: {};
                        };
                      };
                      updatedBy?: {
                        data?: {
                          id?: string;
                          attributes?: {};
                        };
                      };
                    };
                  };
                };
                updatedBy?: {
                  data?: {
                    id?: string;
                    attributes?: {};
                  };
                };
              };
            };
          };
          title?: string;
          description?: string;
        }[];
        advantages?: {
          id?: string;
          item?: string;
        }[];
      };
      what?: {
        id?: string;
        description?: string;
        goal_text?: string;
      };
      how?: {
        id?: string;
        timeline?: {
          id?: string;
          icon?: {
            data?: {
              id?: string;
              attributes?: {
                name?: string;
                alternativeText?: string;
                caption?: string;
                width?: number;
                height?: number;
                formats?: any;
                hash?: string;
                ext?: string;
                mime?: string;
                size?: number;
                url?: string;
                previewUrl?: string;
                provider?: string;
                provider_metadata?: any;
                related?: {
                  data?: {
                    id?: string;
                    attributes?: {};
                  }[];
                };
                createdAt?: string;
                updatedAt?: string;
                createdBy?: {
                  data?: {
                    id?: string;
                    attributes?: {
                      firstname?: string;
                      lastname?: string;
                      username?: string;
                      email?: string;
                      resetPasswordToken?: string;
                      registrationToken?: string;
                      isActive?: boolean;
                      roles?: {
                        data?: {
                          id?: string;
                          attributes?: {
                            name?: string;
                            code?: string;
                            description?: string;
                            users?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              }[];
                            };
                            permissions?: {
                              data?: {
                                id?: string;
                                attributes?: {
                                  action?: string;
                                  subject?: string;
                                  properties?: any;
                                  conditions?: any;
                                  role?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                  createdAt?: string;
                                  updatedAt?: string;
                                  createdBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                  updatedBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                };
                              }[];
                            };
                            createdAt?: string;
                            updatedAt?: string;
                            createdBy?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              };
                            };
                            updatedBy?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              };
                            };
                          };
                        }[];
                      };
                      blocked?: boolean;
                      preferedLanguage?: string;
                      createdAt?: string;
                      updatedAt?: string;
                      createdBy?: {
                        data?: {
                          id?: string;
                          attributes?: {};
                        };
                      };
                      updatedBy?: {
                        data?: {
                          id?: string;
                          attributes?: {};
                        };
                      };
                    };
                  };
                };
                updatedBy?: {
                  data?: {
                    id?: string;
                    attributes?: {};
                  };
                };
              };
            };
          };
          title?: string;
          description?: string;
        }[];
      };
      service_slug?: string;
      is_functional?: boolean;
      categories?: {
        data?: {
          id?: string;
          attributes?: {
            Name?: string;
            Slug?: string;
            Description?: string;
            services?: {
              data?: {
                id?: string;
                attributes?: {
                  icon?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        name?: string;
                        alternativeText?: string;
                        caption?: string;
                        width?: number;
                        height?: number;
                        formats?: any;
                        hash?: string;
                        ext?: string;
                        mime?: string;
                        size?: number;
                        url?: string;
                        previewUrl?: string;
                        provider?: string;
                        provider_metadata?: any;
                        related?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          }[];
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              firstname?: string;
                              lastname?: string;
                              username?: string;
                              email?: string;
                              resetPasswordToken?: string;
                              registrationToken?: string;
                              isActive?: boolean;
                              roles?: {
                                data?: {
                                  id?: string;
                                  attributes?: {
                                    name?: string;
                                    code?: string;
                                    description?: string;
                                    users?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      }[];
                                    };
                                    permissions?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {
                                          action?: string;
                                          subject?: string;
                                          properties?: any;
                                          conditions?: any;
                                          role?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                          createdAt?: string;
                                          updatedAt?: string;
                                          createdBy?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                          updatedBy?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                        };
                                      }[];
                                    };
                                    createdAt?: string;
                                    updatedAt?: string;
                                    createdBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                    updatedBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                  };
                                }[];
                              };
                              blocked?: boolean;
                              preferedLanguage?: string;
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                            };
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                      };
                    };
                  };
                  campaign_type?: string;
                  title?: string;
                  is_express?: boolean;
                  description?: string;
                  duration_in_days?: number;
                  environment?: string;
                  output_image?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        name?: string;
                        alternativeText?: string;
                        caption?: string;
                        width?: number;
                        height?: number;
                        formats?: any;
                        hash?: string;
                        ext?: string;
                        mime?: string;
                        size?: number;
                        url?: string;
                        previewUrl?: string;
                        provider?: string;
                        provider_metadata?: any;
                        related?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          }[];
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              firstname?: string;
                              lastname?: string;
                              username?: string;
                              email?: string;
                              resetPasswordToken?: string;
                              registrationToken?: string;
                              isActive?: boolean;
                              roles?: {
                                data?: {
                                  id?: string;
                                  attributes?: {
                                    name?: string;
                                    code?: string;
                                    description?: string;
                                    users?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      }[];
                                    };
                                    permissions?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {
                                          action?: string;
                                          subject?: string;
                                          properties?: any;
                                          conditions?: any;
                                          role?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                          createdAt?: string;
                                          updatedAt?: string;
                                          createdBy?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                          updatedBy?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                        };
                                      }[];
                                    };
                                    createdAt?: string;
                                    updatedAt?: string;
                                    createdBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                    updatedBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                  };
                                }[];
                              };
                              blocked?: boolean;
                              preferedLanguage?: string;
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                            };
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                      };
                    };
                  };
                  requirements?: {
                    id?: string;
                    description?: string;
                    list?: {
                      id?: string;
                      item?: string;
                    }[];
                  };
                  why?: {
                    id?: string;
                    reasons?: {
                      id?: string;
                      icon?: {
                        data?: {
                          id?: string;
                          attributes?: {
                            name?: string;
                            alternativeText?: string;
                            caption?: string;
                            width?: number;
                            height?: number;
                            formats?: any;
                            hash?: string;
                            ext?: string;
                            mime?: string;
                            size?: number;
                            url?: string;
                            previewUrl?: string;
                            provider?: string;
                            provider_metadata?: any;
                            related?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              }[];
                            };
                            createdAt?: string;
                            updatedAt?: string;
                            createdBy?: {
                              data?: {
                                id?: string;
                                attributes?: {
                                  firstname?: string;
                                  lastname?: string;
                                  username?: string;
                                  email?: string;
                                  resetPasswordToken?: string;
                                  registrationToken?: string;
                                  isActive?: boolean;
                                  roles?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {
                                        name?: string;
                                        code?: string;
                                        description?: string;
                                        users?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {};
                                          }[];
                                        };
                                        permissions?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {
                                              action?: string;
                                              subject?: string;
                                              properties?: any;
                                              conditions?: any;
                                              role?: {
                                                data?: {
                                                  id?: string;
                                                  attributes?: {};
                                                };
                                              };
                                              createdAt?: string;
                                              updatedAt?: string;
                                              createdBy?: {
                                                data?: {
                                                  id?: string;
                                                  attributes?: {};
                                                };
                                              };
                                              updatedBy?: {
                                                data?: {
                                                  id?: string;
                                                  attributes?: {};
                                                };
                                              };
                                            };
                                          }[];
                                        };
                                        createdAt?: string;
                                        updatedAt?: string;
                                        createdBy?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {};
                                          };
                                        };
                                        updatedBy?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {};
                                          };
                                        };
                                      };
                                    }[];
                                  };
                                  blocked?: boolean;
                                  preferedLanguage?: string;
                                  createdAt?: string;
                                  updatedAt?: string;
                                  createdBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                  updatedBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                };
                              };
                            };
                            updatedBy?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              };
                            };
                          };
                        };
                      };
                      title?: string;
                      description?: string;
                    }[];
                    advantages?: {
                      id?: string;
                      item?: string;
                    }[];
                  };
                  what?: {
                    id?: string;
                    description?: string;
                    goal_text?: string;
                  };
                  how?: {
                    id?: string;
                    timeline?: {
                      id?: string;
                      icon?: {
                        data?: {
                          id?: string;
                          attributes?: {
                            name?: string;
                            alternativeText?: string;
                            caption?: string;
                            width?: number;
                            height?: number;
                            formats?: any;
                            hash?: string;
                            ext?: string;
                            mime?: string;
                            size?: number;
                            url?: string;
                            previewUrl?: string;
                            provider?: string;
                            provider_metadata?: any;
                            related?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              }[];
                            };
                            createdAt?: string;
                            updatedAt?: string;
                            createdBy?: {
                              data?: {
                                id?: string;
                                attributes?: {
                                  firstname?: string;
                                  lastname?: string;
                                  username?: string;
                                  email?: string;
                                  resetPasswordToken?: string;
                                  registrationToken?: string;
                                  isActive?: boolean;
                                  roles?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {
                                        name?: string;
                                        code?: string;
                                        description?: string;
                                        users?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {};
                                          }[];
                                        };
                                        permissions?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {
                                              action?: string;
                                              subject?: string;
                                              properties?: any;
                                              conditions?: any;
                                              role?: {
                                                data?: {
                                                  id?: string;
                                                  attributes?: {};
                                                };
                                              };
                                              createdAt?: string;
                                              updatedAt?: string;
                                              createdBy?: {
                                                data?: {
                                                  id?: string;
                                                  attributes?: {};
                                                };
                                              };
                                              updatedBy?: {
                                                data?: {
                                                  id?: string;
                                                  attributes?: {};
                                                };
                                              };
                                            };
                                          }[];
                                        };
                                        createdAt?: string;
                                        updatedAt?: string;
                                        createdBy?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {};
                                          };
                                        };
                                        updatedBy?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {};
                                          };
                                        };
                                      };
                                    }[];
                                  };
                                  blocked?: boolean;
                                  preferedLanguage?: string;
                                  createdAt?: string;
                                  updatedAt?: string;
                                  createdBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                  updatedBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                };
                              };
                            };
                            updatedBy?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              };
                            };
                          };
                        };
                      };
                      title?: string;
                      description?: string;
                    }[];
                  };
                  service_slug?: string;
                  is_functional?: boolean;
                  categories?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    }[];
                  };
                  is_featured?: boolean;
                  sort_order?: number;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt?: string;
                  createdBy?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        firstname?: string;
                        lastname?: string;
                        username?: string;
                        email?: string;
                        resetPasswordToken?: string;
                        registrationToken?: string;
                        isActive?: boolean;
                        roles?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              name?: string;
                              code?: string;
                              description?: string;
                              users?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                }[];
                              };
                              permissions?: {
                                data?: {
                                  id?: string;
                                  attributes?: {
                                    action?: string;
                                    subject?: string;
                                    properties?: any;
                                    conditions?: any;
                                    role?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                    createdAt?: string;
                                    updatedAt?: string;
                                    createdBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                    updatedBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                  };
                                }[];
                              };
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                            };
                          }[];
                        };
                        blocked?: boolean;
                        preferedLanguage?: string;
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                      };
                    };
                  };
                  updatedBy?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                  localizations?: {}[];
                  locale?: string;
                };
              }[];
            };
            createdAt?: string;
            updatedAt?: string;
            publishedAt?: string;
            createdBy?: {
              data?: {
                id?: string;
                attributes?: {};
              };
            };
            updatedBy?: {
              data?: {
                id?: string;
                attributes?: {};
              };
            };
            localizations?: {}[];
            locale?: string;
          };
        }[];
      };
      is_featured?: boolean;
      sort_order?: number;
      createdAt?: string;
      updatedAt?: string;
      publishedAt?: string;
      createdBy?: {
        data?: {
          id?: string;
          attributes?: {};
        };
      };
      updatedBy?: {
        data?: {
          id?: string;
          attributes?: {};
        };
      };
      localizations?: {}[];
      locale?: string;
    };
  }[];
  meta?: {
    pagination?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      total?: number;
    };
  };
};
export type Error = {
  data?: (object | any) | null;
  error: {
    status?: number;
    name?: string;
    message?: string;
    details?: object;
  };
};
export type ServiceResponse = {
  data?: {
    id?: string;
    attributes?: {
      icon?: {
        data?: {
          id?: string;
          attributes?: {
            name?: string;
            alternativeText?: string;
            caption?: string;
            width?: number;
            height?: number;
            formats?: any;
            hash?: string;
            ext?: string;
            mime?: string;
            size?: number;
            url?: string;
            previewUrl?: string;
            provider?: string;
            provider_metadata?: any;
            related?: {
              data?: {
                id?: string;
                attributes?: {};
              }[];
            };
            createdAt?: string;
            updatedAt?: string;
            createdBy?: {
              data?: {
                id?: string;
                attributes?: {
                  firstname?: string;
                  lastname?: string;
                  username?: string;
                  email?: string;
                  resetPasswordToken?: string;
                  registrationToken?: string;
                  isActive?: boolean;
                  roles?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        name?: string;
                        code?: string;
                        description?: string;
                        users?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          }[];
                        };
                        permissions?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              action?: string;
                              subject?: string;
                              properties?: any;
                              conditions?: any;
                              role?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                            };
                          }[];
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                      };
                    }[];
                  };
                  blocked?: boolean;
                  preferedLanguage?: string;
                  createdAt?: string;
                  updatedAt?: string;
                  createdBy?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                  updatedBy?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                };
              };
            };
            updatedBy?: {
              data?: {
                id?: string;
                attributes?: {};
              };
            };
          };
        };
      };
      campaign_type?: string;
      title?: string;
      is_express?: boolean;
      description?: string;
      duration_in_days?: number;
      environment?: string;
      output_image?: {
        data?: {
          id?: string;
          attributes?: {
            name?: string;
            alternativeText?: string;
            caption?: string;
            width?: number;
            height?: number;
            formats?: any;
            hash?: string;
            ext?: string;
            mime?: string;
            size?: number;
            url?: string;
            previewUrl?: string;
            provider?: string;
            provider_metadata?: any;
            related?: {
              data?: {
                id?: string;
                attributes?: {};
              }[];
            };
            createdAt?: string;
            updatedAt?: string;
            createdBy?: {
              data?: {
                id?: string;
                attributes?: {
                  firstname?: string;
                  lastname?: string;
                  username?: string;
                  email?: string;
                  resetPasswordToken?: string;
                  registrationToken?: string;
                  isActive?: boolean;
                  roles?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        name?: string;
                        code?: string;
                        description?: string;
                        users?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          }[];
                        };
                        permissions?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              action?: string;
                              subject?: string;
                              properties?: any;
                              conditions?: any;
                              role?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                            };
                          }[];
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                      };
                    }[];
                  };
                  blocked?: boolean;
                  preferedLanguage?: string;
                  createdAt?: string;
                  updatedAt?: string;
                  createdBy?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                  updatedBy?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                };
              };
            };
            updatedBy?: {
              data?: {
                id?: string;
                attributes?: {};
              };
            };
          };
        };
      };
      requirements?: {
        id?: string;
        description?: string;
        list?: {
          id?: string;
          item?: string;
        }[];
      };
      why?: {
        id?: string;
        reasons?: {
          id?: string;
          icon?: {
            data?: {
              id?: string;
              attributes?: {
                name?: string;
                alternativeText?: string;
                caption?: string;
                width?: number;
                height?: number;
                formats?: any;
                hash?: string;
                ext?: string;
                mime?: string;
                size?: number;
                url?: string;
                previewUrl?: string;
                provider?: string;
                provider_metadata?: any;
                related?: {
                  data?: {
                    id?: string;
                    attributes?: {};
                  }[];
                };
                createdAt?: string;
                updatedAt?: string;
                createdBy?: {
                  data?: {
                    id?: string;
                    attributes?: {
                      firstname?: string;
                      lastname?: string;
                      username?: string;
                      email?: string;
                      resetPasswordToken?: string;
                      registrationToken?: string;
                      isActive?: boolean;
                      roles?: {
                        data?: {
                          id?: string;
                          attributes?: {
                            name?: string;
                            code?: string;
                            description?: string;
                            users?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              }[];
                            };
                            permissions?: {
                              data?: {
                                id?: string;
                                attributes?: {
                                  action?: string;
                                  subject?: string;
                                  properties?: any;
                                  conditions?: any;
                                  role?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                  createdAt?: string;
                                  updatedAt?: string;
                                  createdBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                  updatedBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                };
                              }[];
                            };
                            createdAt?: string;
                            updatedAt?: string;
                            createdBy?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              };
                            };
                            updatedBy?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              };
                            };
                          };
                        }[];
                      };
                      blocked?: boolean;
                      preferedLanguage?: string;
                      createdAt?: string;
                      updatedAt?: string;
                      createdBy?: {
                        data?: {
                          id?: string;
                          attributes?: {};
                        };
                      };
                      updatedBy?: {
                        data?: {
                          id?: string;
                          attributes?: {};
                        };
                      };
                    };
                  };
                };
                updatedBy?: {
                  data?: {
                    id?: string;
                    attributes?: {};
                  };
                };
              };
            };
          };
          title?: string;
          description?: string;
        }[];
        advantages?: {
          id?: string;
          item?: string;
        }[];
      };
      what?: {
        id?: string;
        description?: string;
        goal_text?: string;
      };
      how?: {
        id?: string;
        timeline?: {
          id?: string;
          icon?: {
            data?: {
              id?: string;
              attributes?: {
                name?: string;
                alternativeText?: string;
                caption?: string;
                width?: number;
                height?: number;
                formats?: any;
                hash?: string;
                ext?: string;
                mime?: string;
                size?: number;
                url?: string;
                previewUrl?: string;
                provider?: string;
                provider_metadata?: any;
                related?: {
                  data?: {
                    id?: string;
                    attributes?: {};
                  }[];
                };
                createdAt?: string;
                updatedAt?: string;
                createdBy?: {
                  data?: {
                    id?: string;
                    attributes?: {
                      firstname?: string;
                      lastname?: string;
                      username?: string;
                      email?: string;
                      resetPasswordToken?: string;
                      registrationToken?: string;
                      isActive?: boolean;
                      roles?: {
                        data?: {
                          id?: string;
                          attributes?: {
                            name?: string;
                            code?: string;
                            description?: string;
                            users?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              }[];
                            };
                            permissions?: {
                              data?: {
                                id?: string;
                                attributes?: {
                                  action?: string;
                                  subject?: string;
                                  properties?: any;
                                  conditions?: any;
                                  role?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                  createdAt?: string;
                                  updatedAt?: string;
                                  createdBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                  updatedBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                };
                              }[];
                            };
                            createdAt?: string;
                            updatedAt?: string;
                            createdBy?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              };
                            };
                            updatedBy?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              };
                            };
                          };
                        }[];
                      };
                      blocked?: boolean;
                      preferedLanguage?: string;
                      createdAt?: string;
                      updatedAt?: string;
                      createdBy?: {
                        data?: {
                          id?: string;
                          attributes?: {};
                        };
                      };
                      updatedBy?: {
                        data?: {
                          id?: string;
                          attributes?: {};
                        };
                      };
                    };
                  };
                };
                updatedBy?: {
                  data?: {
                    id?: string;
                    attributes?: {};
                  };
                };
              };
            };
          };
          title?: string;
          description?: string;
        }[];
      };
      service_slug?: string;
      is_functional?: boolean;
      categories?: {
        data?: {
          id?: string;
          attributes?: {
            Name?: string;
            Slug?: string;
            Description?: string;
            services?: {
              data?: {
                id?: string;
                attributes?: {
                  icon?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        name?: string;
                        alternativeText?: string;
                        caption?: string;
                        width?: number;
                        height?: number;
                        formats?: any;
                        hash?: string;
                        ext?: string;
                        mime?: string;
                        size?: number;
                        url?: string;
                        previewUrl?: string;
                        provider?: string;
                        provider_metadata?: any;
                        related?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          }[];
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              firstname?: string;
                              lastname?: string;
                              username?: string;
                              email?: string;
                              resetPasswordToken?: string;
                              registrationToken?: string;
                              isActive?: boolean;
                              roles?: {
                                data?: {
                                  id?: string;
                                  attributes?: {
                                    name?: string;
                                    code?: string;
                                    description?: string;
                                    users?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      }[];
                                    };
                                    permissions?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {
                                          action?: string;
                                          subject?: string;
                                          properties?: any;
                                          conditions?: any;
                                          role?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                          createdAt?: string;
                                          updatedAt?: string;
                                          createdBy?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                          updatedBy?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                        };
                                      }[];
                                    };
                                    createdAt?: string;
                                    updatedAt?: string;
                                    createdBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                    updatedBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                  };
                                }[];
                              };
                              blocked?: boolean;
                              preferedLanguage?: string;
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                            };
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                      };
                    };
                  };
                  campaign_type?: string;
                  title?: string;
                  is_express?: boolean;
                  description?: string;
                  duration_in_days?: number;
                  environment?: string;
                  output_image?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        name?: string;
                        alternativeText?: string;
                        caption?: string;
                        width?: number;
                        height?: number;
                        formats?: any;
                        hash?: string;
                        ext?: string;
                        mime?: string;
                        size?: number;
                        url?: string;
                        previewUrl?: string;
                        provider?: string;
                        provider_metadata?: any;
                        related?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          }[];
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              firstname?: string;
                              lastname?: string;
                              username?: string;
                              email?: string;
                              resetPasswordToken?: string;
                              registrationToken?: string;
                              isActive?: boolean;
                              roles?: {
                                data?: {
                                  id?: string;
                                  attributes?: {
                                    name?: string;
                                    code?: string;
                                    description?: string;
                                    users?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      }[];
                                    };
                                    permissions?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {
                                          action?: string;
                                          subject?: string;
                                          properties?: any;
                                          conditions?: any;
                                          role?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                          createdAt?: string;
                                          updatedAt?: string;
                                          createdBy?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                          updatedBy?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                        };
                                      }[];
                                    };
                                    createdAt?: string;
                                    updatedAt?: string;
                                    createdBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                    updatedBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                  };
                                }[];
                              };
                              blocked?: boolean;
                              preferedLanguage?: string;
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                            };
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                      };
                    };
                  };
                  requirements?: {
                    id?: string;
                    description?: string;
                    list?: {
                      id?: string;
                      item?: string;
                    }[];
                  };
                  why?: {
                    id?: string;
                    reasons?: {
                      id?: string;
                      icon?: {
                        data?: {
                          id?: string;
                          attributes?: {
                            name?: string;
                            alternativeText?: string;
                            caption?: string;
                            width?: number;
                            height?: number;
                            formats?: any;
                            hash?: string;
                            ext?: string;
                            mime?: string;
                            size?: number;
                            url?: string;
                            previewUrl?: string;
                            provider?: string;
                            provider_metadata?: any;
                            related?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              }[];
                            };
                            createdAt?: string;
                            updatedAt?: string;
                            createdBy?: {
                              data?: {
                                id?: string;
                                attributes?: {
                                  firstname?: string;
                                  lastname?: string;
                                  username?: string;
                                  email?: string;
                                  resetPasswordToken?: string;
                                  registrationToken?: string;
                                  isActive?: boolean;
                                  roles?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {
                                        name?: string;
                                        code?: string;
                                        description?: string;
                                        users?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {};
                                          }[];
                                        };
                                        permissions?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {
                                              action?: string;
                                              subject?: string;
                                              properties?: any;
                                              conditions?: any;
                                              role?: {
                                                data?: {
                                                  id?: string;
                                                  attributes?: {};
                                                };
                                              };
                                              createdAt?: string;
                                              updatedAt?: string;
                                              createdBy?: {
                                                data?: {
                                                  id?: string;
                                                  attributes?: {};
                                                };
                                              };
                                              updatedBy?: {
                                                data?: {
                                                  id?: string;
                                                  attributes?: {};
                                                };
                                              };
                                            };
                                          }[];
                                        };
                                        createdAt?: string;
                                        updatedAt?: string;
                                        createdBy?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {};
                                          };
                                        };
                                        updatedBy?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {};
                                          };
                                        };
                                      };
                                    }[];
                                  };
                                  blocked?: boolean;
                                  preferedLanguage?: string;
                                  createdAt?: string;
                                  updatedAt?: string;
                                  createdBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                  updatedBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                };
                              };
                            };
                            updatedBy?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              };
                            };
                          };
                        };
                      };
                      title?: string;
                      description?: string;
                    }[];
                    advantages?: {
                      id?: string;
                      item?: string;
                    }[];
                  };
                  what?: {
                    id?: string;
                    description?: string;
                    goal_text?: string;
                  };
                  how?: {
                    id?: string;
                    timeline?: {
                      id?: string;
                      icon?: {
                        data?: {
                          id?: string;
                          attributes?: {
                            name?: string;
                            alternativeText?: string;
                            caption?: string;
                            width?: number;
                            height?: number;
                            formats?: any;
                            hash?: string;
                            ext?: string;
                            mime?: string;
                            size?: number;
                            url?: string;
                            previewUrl?: string;
                            provider?: string;
                            provider_metadata?: any;
                            related?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              }[];
                            };
                            createdAt?: string;
                            updatedAt?: string;
                            createdBy?: {
                              data?: {
                                id?: string;
                                attributes?: {
                                  firstname?: string;
                                  lastname?: string;
                                  username?: string;
                                  email?: string;
                                  resetPasswordToken?: string;
                                  registrationToken?: string;
                                  isActive?: boolean;
                                  roles?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {
                                        name?: string;
                                        code?: string;
                                        description?: string;
                                        users?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {};
                                          }[];
                                        };
                                        permissions?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {
                                              action?: string;
                                              subject?: string;
                                              properties?: any;
                                              conditions?: any;
                                              role?: {
                                                data?: {
                                                  id?: string;
                                                  attributes?: {};
                                                };
                                              };
                                              createdAt?: string;
                                              updatedAt?: string;
                                              createdBy?: {
                                                data?: {
                                                  id?: string;
                                                  attributes?: {};
                                                };
                                              };
                                              updatedBy?: {
                                                data?: {
                                                  id?: string;
                                                  attributes?: {};
                                                };
                                              };
                                            };
                                          }[];
                                        };
                                        createdAt?: string;
                                        updatedAt?: string;
                                        createdBy?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {};
                                          };
                                        };
                                        updatedBy?: {
                                          data?: {
                                            id?: string;
                                            attributes?: {};
                                          };
                                        };
                                      };
                                    }[];
                                  };
                                  blocked?: boolean;
                                  preferedLanguage?: string;
                                  createdAt?: string;
                                  updatedAt?: string;
                                  createdBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                  updatedBy?: {
                                    data?: {
                                      id?: string;
                                      attributes?: {};
                                    };
                                  };
                                };
                              };
                            };
                            updatedBy?: {
                              data?: {
                                id?: string;
                                attributes?: {};
                              };
                            };
                          };
                        };
                      };
                      title?: string;
                      description?: string;
                    }[];
                  };
                  service_slug?: string;
                  is_functional?: boolean;
                  categories?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    }[];
                  };
                  is_featured?: boolean;
                  sort_order?: number;
                  createdAt?: string;
                  updatedAt?: string;
                  publishedAt?: string;
                  createdBy?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        firstname?: string;
                        lastname?: string;
                        username?: string;
                        email?: string;
                        resetPasswordToken?: string;
                        registrationToken?: string;
                        isActive?: boolean;
                        roles?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              name?: string;
                              code?: string;
                              description?: string;
                              users?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                }[];
                              };
                              permissions?: {
                                data?: {
                                  id?: string;
                                  attributes?: {
                                    action?: string;
                                    subject?: string;
                                    properties?: any;
                                    conditions?: any;
                                    role?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                    createdAt?: string;
                                    updatedAt?: string;
                                    createdBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                    updatedBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                  };
                                }[];
                              };
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                            };
                          }[];
                        };
                        blocked?: boolean;
                        preferedLanguage?: string;
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                      };
                    };
                  };
                  updatedBy?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                  localizations?: {}[];
                  locale?: string;
                };
              }[];
            };
            createdAt?: string;
            updatedAt?: string;
            publishedAt?: string;
            createdBy?: {
              data?: {
                id?: string;
                attributes?: {};
              };
            };
            updatedBy?: {
              data?: {
                id?: string;
                attributes?: {};
              };
            };
            localizations?: {}[];
            locale?: string;
          };
        }[];
      };
      is_featured?: boolean;
      sort_order?: number;
      createdAt?: string;
      updatedAt?: string;
      publishedAt?: string;
      createdBy?: {
        data?: {
          id?: string;
          attributes?: {};
        };
      };
      updatedBy?: {
        data?: {
          id?: string;
          attributes?: {};
        };
      };
      localizations?: {}[];
      locale?: string;
    };
  };
  meta?: object;
};
export type ServiceRequest = {
  data?: {
    campaign_type?: string;
    title?: string;
    is_express?: boolean;
    description?: string;
    service_slug?: string;
    is_functional?: boolean;
    is_featured?: boolean;
    sort_order?: number;
  };
};
export type ServiceLocalizationResponse = {
  id?: string;
  icon?: {
    data?: {
      id?: string;
      attributes?: {
        name?: string;
        alternativeText?: string;
        caption?: string;
        width?: number;
        height?: number;
        formats?: any;
        hash?: string;
        ext?: string;
        mime?: string;
        size?: number;
        url?: string;
        previewUrl?: string;
        provider?: string;
        provider_metadata?: any;
        related?: {
          data?: {
            id?: string;
            attributes?: {};
          }[];
        };
        createdAt?: string;
        updatedAt?: string;
        createdBy?: {
          data?: {
            id?: string;
            attributes?: {
              firstname?: string;
              lastname?: string;
              username?: string;
              email?: string;
              resetPasswordToken?: string;
              registrationToken?: string;
              isActive?: boolean;
              roles?: {
                data?: {
                  id?: string;
                  attributes?: {
                    name?: string;
                    code?: string;
                    description?: string;
                    users?: {
                      data?: {
                        id?: string;
                        attributes?: {};
                      }[];
                    };
                    permissions?: {
                      data?: {
                        id?: string;
                        attributes?: {
                          action?: string;
                          subject?: string;
                          properties?: any;
                          conditions?: any;
                          role?: {
                            data?: {
                              id?: string;
                              attributes?: {};
                            };
                          };
                          createdAt?: string;
                          updatedAt?: string;
                          createdBy?: {
                            data?: {
                              id?: string;
                              attributes?: {};
                            };
                          };
                          updatedBy?: {
                            data?: {
                              id?: string;
                              attributes?: {};
                            };
                          };
                        };
                      }[];
                    };
                    createdAt?: string;
                    updatedAt?: string;
                    createdBy?: {
                      data?: {
                        id?: string;
                        attributes?: {};
                      };
                    };
                    updatedBy?: {
                      data?: {
                        id?: string;
                        attributes?: {};
                      };
                    };
                  };
                }[];
              };
              blocked?: boolean;
              preferedLanguage?: string;
              createdAt?: string;
              updatedAt?: string;
              createdBy?: {
                data?: {
                  id?: string;
                  attributes?: {};
                };
              };
              updatedBy?: {
                data?: {
                  id?: string;
                  attributes?: {};
                };
              };
            };
          };
        };
        updatedBy?: {
          data?: {
            id?: string;
            attributes?: {};
          };
        };
      };
    };
  };
  campaign_type?: string;
  title?: string;
  is_express?: boolean;
  description?: string;
  duration_in_days?: number;
  environment?: string;
  output_image?: {
    data?: {
      id?: string;
      attributes?: {
        name?: string;
        alternativeText?: string;
        caption?: string;
        width?: number;
        height?: number;
        formats?: any;
        hash?: string;
        ext?: string;
        mime?: string;
        size?: number;
        url?: string;
        previewUrl?: string;
        provider?: string;
        provider_metadata?: any;
        related?: {
          data?: {
            id?: string;
            attributes?: {};
          }[];
        };
        createdAt?: string;
        updatedAt?: string;
        createdBy?: {
          data?: {
            id?: string;
            attributes?: {
              firstname?: string;
              lastname?: string;
              username?: string;
              email?: string;
              resetPasswordToken?: string;
              registrationToken?: string;
              isActive?: boolean;
              roles?: {
                data?: {
                  id?: string;
                  attributes?: {
                    name?: string;
                    code?: string;
                    description?: string;
                    users?: {
                      data?: {
                        id?: string;
                        attributes?: {};
                      }[];
                    };
                    permissions?: {
                      data?: {
                        id?: string;
                        attributes?: {
                          action?: string;
                          subject?: string;
                          properties?: any;
                          conditions?: any;
                          role?: {
                            data?: {
                              id?: string;
                              attributes?: {};
                            };
                          };
                          createdAt?: string;
                          updatedAt?: string;
                          createdBy?: {
                            data?: {
                              id?: string;
                              attributes?: {};
                            };
                          };
                          updatedBy?: {
                            data?: {
                              id?: string;
                              attributes?: {};
                            };
                          };
                        };
                      }[];
                    };
                    createdAt?: string;
                    updatedAt?: string;
                    createdBy?: {
                      data?: {
                        id?: string;
                        attributes?: {};
                      };
                    };
                    updatedBy?: {
                      data?: {
                        id?: string;
                        attributes?: {};
                      };
                    };
                  };
                }[];
              };
              blocked?: boolean;
              preferedLanguage?: string;
              createdAt?: string;
              updatedAt?: string;
              createdBy?: {
                data?: {
                  id?: string;
                  attributes?: {};
                };
              };
              updatedBy?: {
                data?: {
                  id?: string;
                  attributes?: {};
                };
              };
            };
          };
        };
        updatedBy?: {
          data?: {
            id?: string;
            attributes?: {};
          };
        };
      };
    };
  };
  requirements?: {
    id?: string;
    description?: string;
    list?: {
      id?: string;
      item?: string;
    }[];
  };
  why?: {
    id?: string;
    reasons?: {
      id?: string;
      icon?: {
        data?: {
          id?: string;
          attributes?: {
            name?: string;
            alternativeText?: string;
            caption?: string;
            width?: number;
            height?: number;
            formats?: any;
            hash?: string;
            ext?: string;
            mime?: string;
            size?: number;
            url?: string;
            previewUrl?: string;
            provider?: string;
            provider_metadata?: any;
            related?: {
              data?: {
                id?: string;
                attributes?: {};
              }[];
            };
            createdAt?: string;
            updatedAt?: string;
            createdBy?: {
              data?: {
                id?: string;
                attributes?: {
                  firstname?: string;
                  lastname?: string;
                  username?: string;
                  email?: string;
                  resetPasswordToken?: string;
                  registrationToken?: string;
                  isActive?: boolean;
                  roles?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        name?: string;
                        code?: string;
                        description?: string;
                        users?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          }[];
                        };
                        permissions?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              action?: string;
                              subject?: string;
                              properties?: any;
                              conditions?: any;
                              role?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                            };
                          }[];
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                      };
                    }[];
                  };
                  blocked?: boolean;
                  preferedLanguage?: string;
                  createdAt?: string;
                  updatedAt?: string;
                  createdBy?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                  updatedBy?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                };
              };
            };
            updatedBy?: {
              data?: {
                id?: string;
                attributes?: {};
              };
            };
          };
        };
      };
      title?: string;
      description?: string;
    }[];
    advantages?: {
      id?: string;
      item?: string;
    }[];
  };
  what?: {
    id?: string;
    description?: string;
    goal_text?: string;
  };
  how?: {
    id?: string;
    timeline?: {
      id?: string;
      icon?: {
        data?: {
          id?: string;
          attributes?: {
            name?: string;
            alternativeText?: string;
            caption?: string;
            width?: number;
            height?: number;
            formats?: any;
            hash?: string;
            ext?: string;
            mime?: string;
            size?: number;
            url?: string;
            previewUrl?: string;
            provider?: string;
            provider_metadata?: any;
            related?: {
              data?: {
                id?: string;
                attributes?: {};
              }[];
            };
            createdAt?: string;
            updatedAt?: string;
            createdBy?: {
              data?: {
                id?: string;
                attributes?: {
                  firstname?: string;
                  lastname?: string;
                  username?: string;
                  email?: string;
                  resetPasswordToken?: string;
                  registrationToken?: string;
                  isActive?: boolean;
                  roles?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        name?: string;
                        code?: string;
                        description?: string;
                        users?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          }[];
                        };
                        permissions?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              action?: string;
                              subject?: string;
                              properties?: any;
                              conditions?: any;
                              role?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                            };
                          }[];
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                      };
                    }[];
                  };
                  blocked?: boolean;
                  preferedLanguage?: string;
                  createdAt?: string;
                  updatedAt?: string;
                  createdBy?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                  updatedBy?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                };
              };
            };
            updatedBy?: {
              data?: {
                id?: string;
                attributes?: {};
              };
            };
          };
        };
      };
      title?: string;
      description?: string;
    }[];
  };
  service_slug?: string;
  is_functional?: boolean;
  categories?: {
    data?: {
      id?: string;
      attributes?: {
        Name?: string;
        Slug?: string;
        Description?: string;
        services?: {
          data?: {
            id?: string;
            attributes?: {
              icon?: {
                data?: {
                  id?: string;
                  attributes?: {
                    name?: string;
                    alternativeText?: string;
                    caption?: string;
                    width?: number;
                    height?: number;
                    formats?: any;
                    hash?: string;
                    ext?: string;
                    mime?: string;
                    size?: number;
                    url?: string;
                    previewUrl?: string;
                    provider?: string;
                    provider_metadata?: any;
                    related?: {
                      data?: {
                        id?: string;
                        attributes?: {};
                      }[];
                    };
                    createdAt?: string;
                    updatedAt?: string;
                    createdBy?: {
                      data?: {
                        id?: string;
                        attributes?: {
                          firstname?: string;
                          lastname?: string;
                          username?: string;
                          email?: string;
                          resetPasswordToken?: string;
                          registrationToken?: string;
                          isActive?: boolean;
                          roles?: {
                            data?: {
                              id?: string;
                              attributes?: {
                                name?: string;
                                code?: string;
                                description?: string;
                                users?: {
                                  data?: {
                                    id?: string;
                                    attributes?: {};
                                  }[];
                                };
                                permissions?: {
                                  data?: {
                                    id?: string;
                                    attributes?: {
                                      action?: string;
                                      subject?: string;
                                      properties?: any;
                                      conditions?: any;
                                      role?: {
                                        data?: {
                                          id?: string;
                                          attributes?: {};
                                        };
                                      };
                                      createdAt?: string;
                                      updatedAt?: string;
                                      createdBy?: {
                                        data?: {
                                          id?: string;
                                          attributes?: {};
                                        };
                                      };
                                      updatedBy?: {
                                        data?: {
                                          id?: string;
                                          attributes?: {};
                                        };
                                      };
                                    };
                                  }[];
                                };
                                createdAt?: string;
                                updatedAt?: string;
                                createdBy?: {
                                  data?: {
                                    id?: string;
                                    attributes?: {};
                                  };
                                };
                                updatedBy?: {
                                  data?: {
                                    id?: string;
                                    attributes?: {};
                                  };
                                };
                              };
                            }[];
                          };
                          blocked?: boolean;
                          preferedLanguage?: string;
                          createdAt?: string;
                          updatedAt?: string;
                          createdBy?: {
                            data?: {
                              id?: string;
                              attributes?: {};
                            };
                          };
                          updatedBy?: {
                            data?: {
                              id?: string;
                              attributes?: {};
                            };
                          };
                        };
                      };
                    };
                    updatedBy?: {
                      data?: {
                        id?: string;
                        attributes?: {};
                      };
                    };
                  };
                };
              };
              campaign_type?: string;
              title?: string;
              is_express?: boolean;
              description?: string;
              duration_in_days?: number;
              environment?: string;
              output_image?: {
                data?: {
                  id?: string;
                  attributes?: {
                    name?: string;
                    alternativeText?: string;
                    caption?: string;
                    width?: number;
                    height?: number;
                    formats?: any;
                    hash?: string;
                    ext?: string;
                    mime?: string;
                    size?: number;
                    url?: string;
                    previewUrl?: string;
                    provider?: string;
                    provider_metadata?: any;
                    related?: {
                      data?: {
                        id?: string;
                        attributes?: {};
                      }[];
                    };
                    createdAt?: string;
                    updatedAt?: string;
                    createdBy?: {
                      data?: {
                        id?: string;
                        attributes?: {
                          firstname?: string;
                          lastname?: string;
                          username?: string;
                          email?: string;
                          resetPasswordToken?: string;
                          registrationToken?: string;
                          isActive?: boolean;
                          roles?: {
                            data?: {
                              id?: string;
                              attributes?: {
                                name?: string;
                                code?: string;
                                description?: string;
                                users?: {
                                  data?: {
                                    id?: string;
                                    attributes?: {};
                                  }[];
                                };
                                permissions?: {
                                  data?: {
                                    id?: string;
                                    attributes?: {
                                      action?: string;
                                      subject?: string;
                                      properties?: any;
                                      conditions?: any;
                                      role?: {
                                        data?: {
                                          id?: string;
                                          attributes?: {};
                                        };
                                      };
                                      createdAt?: string;
                                      updatedAt?: string;
                                      createdBy?: {
                                        data?: {
                                          id?: string;
                                          attributes?: {};
                                        };
                                      };
                                      updatedBy?: {
                                        data?: {
                                          id?: string;
                                          attributes?: {};
                                        };
                                      };
                                    };
                                  }[];
                                };
                                createdAt?: string;
                                updatedAt?: string;
                                createdBy?: {
                                  data?: {
                                    id?: string;
                                    attributes?: {};
                                  };
                                };
                                updatedBy?: {
                                  data?: {
                                    id?: string;
                                    attributes?: {};
                                  };
                                };
                              };
                            }[];
                          };
                          blocked?: boolean;
                          preferedLanguage?: string;
                          createdAt?: string;
                          updatedAt?: string;
                          createdBy?: {
                            data?: {
                              id?: string;
                              attributes?: {};
                            };
                          };
                          updatedBy?: {
                            data?: {
                              id?: string;
                              attributes?: {};
                            };
                          };
                        };
                      };
                    };
                    updatedBy?: {
                      data?: {
                        id?: string;
                        attributes?: {};
                      };
                    };
                  };
                };
              };
              requirements?: {
                id?: string;
                description?: string;
                list?: {
                  id?: string;
                  item?: string;
                }[];
              };
              why?: {
                id?: string;
                reasons?: {
                  id?: string;
                  icon?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        name?: string;
                        alternativeText?: string;
                        caption?: string;
                        width?: number;
                        height?: number;
                        formats?: any;
                        hash?: string;
                        ext?: string;
                        mime?: string;
                        size?: number;
                        url?: string;
                        previewUrl?: string;
                        provider?: string;
                        provider_metadata?: any;
                        related?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          }[];
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              firstname?: string;
                              lastname?: string;
                              username?: string;
                              email?: string;
                              resetPasswordToken?: string;
                              registrationToken?: string;
                              isActive?: boolean;
                              roles?: {
                                data?: {
                                  id?: string;
                                  attributes?: {
                                    name?: string;
                                    code?: string;
                                    description?: string;
                                    users?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      }[];
                                    };
                                    permissions?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {
                                          action?: string;
                                          subject?: string;
                                          properties?: any;
                                          conditions?: any;
                                          role?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                          createdAt?: string;
                                          updatedAt?: string;
                                          createdBy?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                          updatedBy?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                        };
                                      }[];
                                    };
                                    createdAt?: string;
                                    updatedAt?: string;
                                    createdBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                    updatedBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                  };
                                }[];
                              };
                              blocked?: boolean;
                              preferedLanguage?: string;
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                            };
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                      };
                    };
                  };
                  title?: string;
                  description?: string;
                }[];
                advantages?: {
                  id?: string;
                  item?: string;
                }[];
              };
              what?: {
                id?: string;
                description?: string;
                goal_text?: string;
              };
              how?: {
                id?: string;
                timeline?: {
                  id?: string;
                  icon?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        name?: string;
                        alternativeText?: string;
                        caption?: string;
                        width?: number;
                        height?: number;
                        formats?: any;
                        hash?: string;
                        ext?: string;
                        mime?: string;
                        size?: number;
                        url?: string;
                        previewUrl?: string;
                        provider?: string;
                        provider_metadata?: any;
                        related?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          }[];
                        };
                        createdAt?: string;
                        updatedAt?: string;
                        createdBy?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              firstname?: string;
                              lastname?: string;
                              username?: string;
                              email?: string;
                              resetPasswordToken?: string;
                              registrationToken?: string;
                              isActive?: boolean;
                              roles?: {
                                data?: {
                                  id?: string;
                                  attributes?: {
                                    name?: string;
                                    code?: string;
                                    description?: string;
                                    users?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      }[];
                                    };
                                    permissions?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {
                                          action?: string;
                                          subject?: string;
                                          properties?: any;
                                          conditions?: any;
                                          role?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                          createdAt?: string;
                                          updatedAt?: string;
                                          createdBy?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                          updatedBy?: {
                                            data?: {
                                              id?: string;
                                              attributes?: {};
                                            };
                                          };
                                        };
                                      }[];
                                    };
                                    createdAt?: string;
                                    updatedAt?: string;
                                    createdBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                    updatedBy?: {
                                      data?: {
                                        id?: string;
                                        attributes?: {};
                                      };
                                    };
                                  };
                                }[];
                              };
                              blocked?: boolean;
                              preferedLanguage?: string;
                              createdAt?: string;
                              updatedAt?: string;
                              createdBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              updatedBy?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                            };
                          };
                        };
                        updatedBy?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                      };
                    };
                  };
                  title?: string;
                  description?: string;
                }[];
              };
              service_slug?: string;
              is_functional?: boolean;
              categories?: {
                data?: {
                  id?: string;
                  attributes?: {};
                }[];
              };
              is_featured?: boolean;
              sort_order?: number;
              createdAt?: string;
              updatedAt?: string;
              publishedAt?: string;
              createdBy?: {
                data?: {
                  id?: string;
                  attributes?: {
                    firstname?: string;
                    lastname?: string;
                    username?: string;
                    email?: string;
                    resetPasswordToken?: string;
                    registrationToken?: string;
                    isActive?: boolean;
                    roles?: {
                      data?: {
                        id?: string;
                        attributes?: {
                          name?: string;
                          code?: string;
                          description?: string;
                          users?: {
                            data?: {
                              id?: string;
                              attributes?: {};
                            }[];
                          };
                          permissions?: {
                            data?: {
                              id?: string;
                              attributes?: {
                                action?: string;
                                subject?: string;
                                properties?: any;
                                conditions?: any;
                                role?: {
                                  data?: {
                                    id?: string;
                                    attributes?: {};
                                  };
                                };
                                createdAt?: string;
                                updatedAt?: string;
                                createdBy?: {
                                  data?: {
                                    id?: string;
                                    attributes?: {};
                                  };
                                };
                                updatedBy?: {
                                  data?: {
                                    id?: string;
                                    attributes?: {};
                                  };
                                };
                              };
                            }[];
                          };
                          createdAt?: string;
                          updatedAt?: string;
                          createdBy?: {
                            data?: {
                              id?: string;
                              attributes?: {};
                            };
                          };
                          updatedBy?: {
                            data?: {
                              id?: string;
                              attributes?: {};
                            };
                          };
                        };
                      }[];
                    };
                    blocked?: boolean;
                    preferedLanguage?: string;
                    createdAt?: string;
                    updatedAt?: string;
                    createdBy?: {
                      data?: {
                        id?: string;
                        attributes?: {};
                      };
                    };
                    updatedBy?: {
                      data?: {
                        id?: string;
                        attributes?: {};
                      };
                    };
                  };
                };
              };
              updatedBy?: {
                data?: {
                  id?: string;
                  attributes?: {};
                };
              };
              localizations?: {}[];
              locale?: string;
            };
          }[];
        };
        createdAt?: string;
        updatedAt?: string;
        publishedAt?: string;
        createdBy?: {
          data?: {
            id?: string;
            attributes?: {};
          };
        };
        updatedBy?: {
          data?: {
            id?: string;
            attributes?: {};
          };
        };
        localizations?: {}[];
        locale?: string;
      };
    }[];
  };
  is_featured?: boolean;
  sort_order?: number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  createdBy?: {
    data?: {
      id?: string;
      attributes?: {};
    };
  };
  updatedBy?: {
    data?: {
      id?: string;
      attributes?: {};
    };
  };
  localizations?: {}[];
  locale?: string;
};
export type ServiceLocalizationRequest = {
  campaign_type?: string;
  title?: string;
  is_express?: boolean;
  description?: string;
  service_slug?: string;
  is_functional?: boolean;
  is_featured?: boolean;
  sort_order?: number;
};
export const {
  useGetServicesQuery,
  usePostServicesMutation,
  useGetServicesByIdQuery,
  usePutServicesByIdMutation,
  useDeleteServicesByIdMutation,
  usePostServicesByIdLocalizationsMutation,
} = injectedRtkApi;
