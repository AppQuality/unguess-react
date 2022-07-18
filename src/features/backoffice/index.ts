import { strapiSlice as api } from './strapi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCategories: build.query<GetCategoriesApiResponse, GetCategoriesApiArg>({
      query: (queryArg) => ({
        url: `/categories`,
        params: {
          sort: queryArg.sort,
          pagination: queryArg.pagination,
          fields: queryArg.fields,
          populate: queryArg.populate,
        },
      }),
    }),
    postCategories: build.mutation<
      PostCategoriesApiResponse,
      PostCategoriesApiArg
    >({
      query: (queryArg) => ({
        url: `/categories`,
        method: 'POST',
        body: queryArg.categoryRequest,
      }),
    }),
    getCategoriesById: build.query<
      GetCategoriesByIdApiResponse,
      GetCategoriesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/categories/${queryArg.id}` }),
    }),
    putCategoriesById: build.mutation<
      PutCategoriesByIdApiResponse,
      PutCategoriesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.categoryRequest,
      }),
    }),
    deleteCategoriesById: build.mutation<
      DeleteCategoriesByIdApiResponse,
      DeleteCategoriesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    postCategoriesByIdLocalizations: build.mutation<
      PostCategoriesByIdLocalizationsApiResponse,
      PostCategoriesByIdLocalizationsApiArg
    >({
      query: (queryArg) => ({
        url: `/categories/${queryArg.id}/localizations`,
        method: 'POST',
        body: queryArg.categoryLocalizationRequest,
      }),
    }),
    getExpresses: build.query<GetExpressesApiResponse, GetExpressesApiArg>({
      query: (queryArg) => ({
        url: `/expresses`,
        params: {
          sort: queryArg.sort,
          pagination: queryArg.pagination,
          fields: queryArg.fields,
          populate: queryArg.populate,
        },
      }),
    }),
    postExpresses: build.mutation<
      PostExpressesApiResponse,
      PostExpressesApiArg
    >({
      query: (queryArg) => ({
        url: `/expresses`,
        method: 'POST',
        body: queryArg.expressRequest,
      }),
    }),
    getExpressesById: build.query<
      GetExpressesByIdApiResponse,
      GetExpressesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/expresses/${queryArg.id}` }),
    }),
    putExpressesById: build.mutation<
      PutExpressesByIdApiResponse,
      PutExpressesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/expresses/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.expressRequest,
      }),
    }),
    deleteExpressesById: build.mutation<
      DeleteExpressesByIdApiResponse,
      DeleteExpressesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/expresses/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    getExpressTypes: build.query<
      GetExpressTypesApiResponse,
      GetExpressTypesApiArg
    >({
      query: (queryArg) => ({
        url: `/express-types`,
        params: {
          sort: queryArg.sort,
          pagination: queryArg.pagination,
          fields: queryArg.fields,
          populate: queryArg.populate,
        },
      }),
    }),
    postExpressTypes: build.mutation<
      PostExpressTypesApiResponse,
      PostExpressTypesApiArg
    >({
      query: (queryArg) => ({
        url: `/express-types`,
        method: 'POST',
        body: queryArg.expressTypeRequest,
      }),
    }),
    getExpressTypesById: build.query<
      GetExpressTypesByIdApiResponse,
      GetExpressTypesByIdApiArg
    >({
      query: (queryArg) => ({ url: `/express-types/${queryArg.id}` }),
    }),
    putExpressTypesById: build.mutation<
      PutExpressTypesByIdApiResponse,
      PutExpressTypesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/express-types/${queryArg.id}`,
        method: 'PUT',
        body: queryArg.expressTypeRequest,
      }),
    }),
    deleteExpressTypesById: build.mutation<
      DeleteExpressTypesByIdApiResponse,
      DeleteExpressTypesByIdApiArg
    >({
      query: (queryArg) => ({
        url: `/express-types/${queryArg.id}`,
        method: 'DELETE',
      }),
    }),
    postExpressTypesByIdLocalizations: build.mutation<
      PostExpressTypesByIdLocalizationsApiResponse,
      PostExpressTypesByIdLocalizationsApiArg
    >({
      query: (queryArg) => ({
        url: `/express-types/${queryArg.id}/localizations`,
        method: 'POST',
        body: queryArg.expressTypeLocalizationRequest,
      }),
    }),
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
export type GetCategoriesApiResponse =
  /** status 200 OK */ CategoryListResponse;
export type GetCategoriesApiArg = {
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
export type PostCategoriesApiResponse = /** status 200 OK */ CategoryResponse;
export type PostCategoriesApiArg = {
  categoryRequest: CategoryRequest;
};
export type GetCategoriesByIdApiResponse =
  /** status 200 OK */ CategoryResponse;
export type GetCategoriesByIdApiArg = {
  id: string;
};
export type PutCategoriesByIdApiResponse =
  /** status 200 OK */ CategoryResponse;
export type PutCategoriesByIdApiArg = {
  id: string;
  categoryRequest: CategoryRequest;
};
export type DeleteCategoriesByIdApiResponse = /** status 200 OK */ number;
export type DeleteCategoriesByIdApiArg = {
  id: string;
};
export type PostCategoriesByIdLocalizationsApiResponse =
  /** status 200 OK */ CategoryLocalizationResponse;
export type PostCategoriesByIdLocalizationsApiArg = {
  id: string;
  categoryLocalizationRequest: CategoryLocalizationRequest;
};
export type GetExpressesApiResponse = /** status 200 OK */ ExpressListResponse;
export type GetExpressesApiArg = {
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
export type PostExpressesApiResponse = /** status 200 OK */ ExpressResponse;
export type PostExpressesApiArg = {
  expressRequest: ExpressRequest;
};
export type GetExpressesByIdApiResponse = /** status 200 OK */ ExpressResponse;
export type GetExpressesByIdApiArg = {
  id: string;
};
export type PutExpressesByIdApiResponse = /** status 200 OK */ ExpressResponse;
export type PutExpressesByIdApiArg = {
  id: string;
  expressRequest: ExpressRequest;
};
export type DeleteExpressesByIdApiResponse = /** status 200 OK */ number;
export type DeleteExpressesByIdApiArg = {
  id: string;
};
export type GetExpressTypesApiResponse =
  /** status 200 OK */ ExpressTypeListResponse;
export type GetExpressTypesApiArg = {
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
export type PostExpressTypesApiResponse =
  /** status 200 OK */ ExpressTypeResponse;
export type PostExpressTypesApiArg = {
  expressTypeRequest: ExpressTypeRequest;
};
export type GetExpressTypesByIdApiResponse =
  /** status 200 OK */ ExpressTypeResponse;
export type GetExpressTypesByIdApiArg = {
  id: string;
};
export type PutExpressTypesByIdApiResponse =
  /** status 200 OK */ ExpressTypeResponse;
export type PutExpressTypesByIdApiArg = {
  id: string;
  expressTypeRequest: ExpressTypeRequest;
};
export type DeleteExpressTypesByIdApiResponse = /** status 200 OK */ number;
export type DeleteExpressTypesByIdApiArg = {
  id: string;
};
export type PostExpressTypesByIdLocalizationsApiResponse =
  /** status 200 OK */ ExpressTypeLocalizationResponse;
export type PostExpressTypesByIdLocalizationsApiArg = {
  id: string;
  expressTypeLocalizationRequest: ExpressTypeLocalizationRequest;
};
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
export type CategoryListResponse = {
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
                attributes?: {
                  Name?: string;
                  Slug?: string;
                  Description?: string;
                  services?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    }[];
                  };
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
            is_featured?: boolean;
            sort_order?: number;
            express?: {
              data?: {
                id?: string;
                attributes?: {
                  name?: string;
                  cost?: number;
                  slug?: string;
                  express_type?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        express?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                        title?: string;
                        description?: string;
                        tags?: {
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
                          label?: string;
                        }[];
                        before_starting_info?: string;
                        start_reasons?: {
                          id?: string;
                          item?: string;
                        }[];
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
                };
              };
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
export type CategoryResponse = {
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
                attributes?: {
                  Name?: string;
                  Slug?: string;
                  Description?: string;
                  services?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    }[];
                  };
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
            is_featured?: boolean;
            sort_order?: number;
            express?: {
              data?: {
                id?: string;
                attributes?: {
                  name?: string;
                  cost?: number;
                  slug?: string;
                  express_type?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        express?: {
                          data?: {
                            id?: string;
                            attributes?: {};
                          };
                        };
                        title?: string;
                        description?: string;
                        tags?: {
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
                          label?: string;
                        }[];
                        before_starting_info?: string;
                        start_reasons?: {
                          id?: string;
                          item?: string;
                        }[];
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
                };
              };
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
export type CategoryRequest = {
  data?: {
    Name?: string;
    Slug?: string;
  };
};
export type CategoryLocalizationResponse = {
  id?: string;
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
            attributes?: {
              Name?: string;
              Slug?: string;
              Description?: string;
              services?: {
                data?: {
                  id?: string;
                  attributes?: {};
                }[];
              };
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
        is_featured?: boolean;
        sort_order?: number;
        express?: {
          data?: {
            id?: string;
            attributes?: {
              name?: string;
              cost?: number;
              slug?: string;
              express_type?: {
                data?: {
                  id?: string;
                  attributes?: {
                    express?: {
                      data?: {
                        id?: string;
                        attributes?: {};
                      };
                    };
                    title?: string;
                    description?: string;
                    tags?: {
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
                      label?: string;
                    }[];
                    before_starting_info?: string;
                    start_reasons?: {
                      id?: string;
                      item?: string;
                    }[];
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
            };
          };
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
export type CategoryLocalizationRequest = {
  Name?: string;
  Slug?: string;
};
export type ExpressListResponse = {
  data?: {
    id?: string;
    attributes?: {
      name?: string;
      cost?: number;
      slug?: string;
      express_type?: {
        data?: {
          id?: string;
          attributes?: {
            express?: {
              data?: {
                id?: string;
                attributes?: {
                  name?: string;
                  cost?: number;
                  slug?: string;
                  express_type?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
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
                };
              };
            };
            title?: string;
            description?: string;
            tags?: {
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
              label?: string;
            }[];
            before_starting_info?: string;
            start_reasons?: {
              id?: string;
              item?: string;
            }[];
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
export type ExpressResponse = {
  data?: {
    id?: string;
    attributes?: {
      name?: string;
      cost?: number;
      slug?: string;
      express_type?: {
        data?: {
          id?: string;
          attributes?: {
            express?: {
              data?: {
                id?: string;
                attributes?: {
                  name?: string;
                  cost?: number;
                  slug?: string;
                  express_type?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
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
                };
              };
            };
            title?: string;
            description?: string;
            tags?: {
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
              label?: string;
            }[];
            before_starting_info?: string;
            start_reasons?: {
              id?: string;
              item?: string;
            }[];
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
    };
  };
  meta?: object;
};
export type ExpressRequest = {
  data?: {
    name?: string;
    slug?: string;
  };
};
export type ExpressTypeListResponse = {
  data?: {
    id?: string;
    attributes?: {
      express?: {
        data?: {
          id?: string;
          attributes?: {
            name?: string;
            cost?: number;
            slug?: string;
            express_type?: {
              data?: {
                id?: string;
                attributes?: {
                  express?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                  title?: string;
                  description?: string;
                  tags?: {
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
                    label?: string;
                  }[];
                  before_starting_info?: string;
                  start_reasons?: {
                    id?: string;
                    item?: string;
                  }[];
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
              };
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
          };
        };
      };
      title?: string;
      description?: string;
      tags?: {
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
        label?: string;
      }[];
      before_starting_info?: string;
      start_reasons?: {
        id?: string;
        item?: string;
      }[];
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
export type ExpressTypeResponse = {
  data?: {
    id?: string;
    attributes?: {
      express?: {
        data?: {
          id?: string;
          attributes?: {
            name?: string;
            cost?: number;
            slug?: string;
            express_type?: {
              data?: {
                id?: string;
                attributes?: {
                  express?: {
                    data?: {
                      id?: string;
                      attributes?: {};
                    };
                  };
                  title?: string;
                  description?: string;
                  tags?: {
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
                    label?: string;
                  }[];
                  before_starting_info?: string;
                  start_reasons?: {
                    id?: string;
                    item?: string;
                  }[];
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
              };
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
          };
        };
      };
      title?: string;
      description?: string;
      tags?: {
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
        label?: string;
      }[];
      before_starting_info?: string;
      start_reasons?: {
        id?: string;
        item?: string;
      }[];
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
export type ExpressTypeRequest = {
  data?: {
    title?: string;
    description?: string;
  };
};
export type ExpressTypeLocalizationResponse = {
  id?: string;
  express?: {
    data?: {
      id?: string;
      attributes?: {
        name?: string;
        cost?: number;
        slug?: string;
        express_type?: {
          data?: {
            id?: string;
            attributes?: {
              express?: {
                data?: {
                  id?: string;
                  attributes?: {};
                };
              };
              title?: string;
              description?: string;
              tags?: {
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
                label?: string;
              }[];
              before_starting_info?: string;
              start_reasons?: {
                id?: string;
                item?: string;
              }[];
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
          };
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
      };
    };
  };
  title?: string;
  description?: string;
  tags?: {
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
    label?: string;
  }[];
  before_starting_info?: string;
  start_reasons?: {
    id?: string;
    item?: string;
  }[];
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
export type ExpressTypeLocalizationRequest = {
  title?: string;
  description?: string;
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
                  express?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        name?: string;
                        cost?: number;
                        slug?: string;
                        express_type?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              express?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              title?: string;
                              description?: string;
                              tags?: {
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
                                label?: string;
                              }[];
                              before_starting_info?: string;
                              start_reasons?: {
                                id?: string;
                                item?: string;
                              }[];
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
                          };
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
                      };
                    };
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
      express?: {
        data?: {
          id?: string;
          attributes?: {};
        };
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
  meta?: {
    pagination?: {
      page?: number;
      pageSize?: number;
      pageCount?: number;
      total?: number;
    };
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
                  express?: {
                    data?: {
                      id?: string;
                      attributes?: {
                        name?: string;
                        cost?: number;
                        slug?: string;
                        express_type?: {
                          data?: {
                            id?: string;
                            attributes?: {
                              express?: {
                                data?: {
                                  id?: string;
                                  attributes?: {};
                                };
                              };
                              title?: string;
                              description?: string;
                              tags?: {
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
                                label?: string;
                              }[];
                              before_starting_info?: string;
                              start_reasons?: {
                                id?: string;
                                item?: string;
                              }[];
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
                          };
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
                      };
                    };
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
      express?: {
        data?: {
          id?: string;
          attributes?: {};
        };
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
              express?: {
                data?: {
                  id?: string;
                  attributes?: {
                    name?: string;
                    cost?: number;
                    slug?: string;
                    express_type?: {
                      data?: {
                        id?: string;
                        attributes?: {
                          express?: {
                            data?: {
                              id?: string;
                              attributes?: {};
                            };
                          };
                          title?: string;
                          description?: string;
                          tags?: {
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
                            label?: string;
                          }[];
                          before_starting_info?: string;
                          start_reasons?: {
                            id?: string;
                            item?: string;
                          }[];
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
                      };
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
                  };
                };
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
  express?: {
    data?: {
      id?: string;
      attributes?: {};
    };
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
  useGetCategoriesQuery,
  usePostCategoriesMutation,
  useGetCategoriesByIdQuery,
  usePutCategoriesByIdMutation,
  useDeleteCategoriesByIdMutation,
  usePostCategoriesByIdLocalizationsMutation,
  useGetExpressesQuery,
  usePostExpressesMutation,
  useGetExpressesByIdQuery,
  usePutExpressesByIdMutation,
  useDeleteExpressesByIdMutation,
  useGetExpressTypesQuery,
  usePostExpressTypesMutation,
  useGetExpressTypesByIdQuery,
  usePutExpressTypesByIdMutation,
  useDeleteExpressTypesByIdMutation,
  usePostExpressTypesByIdLocalizationsMutation,
  useGetServicesQuery,
  usePostServicesMutation,
  useGetServicesByIdQuery,
  usePutServicesByIdMutation,
  useDeleteServicesByIdMutation,
  usePostServicesByIdLocalizationsMutation,
} = injectedRtkApi;
