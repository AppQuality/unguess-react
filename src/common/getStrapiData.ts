import {
  CategoryListResponse,
  CategoryResponse,
  ServiceListResponse,
  ServiceResponse,
} from 'src/features/backoffice';

interface StrapiObject {
  [key: string]: string | number | boolean | object | undefined;
}

interface StrapiListItem {
  id: number;
  attributes: object;
}

export default (
  strapiData:
    | CategoryListResponse
    | ServiceListResponse
    | CategoryResponse
    | ServiceResponse
    | undefined
): any => {
  if (strapiData !== undefined) {
    if (strapiData.data !== undefined) {
      if (Array.isArray(strapiData.data)) {
        const items: Array<StrapiObject> = [];
        strapiData.data.forEach((item) => {
          items.push({
            ...(item.id && { id: item.id }),
            ...item.attributes,
          });
        });

        items.forEach((item) => {
          Object.entries(item).forEach(([key, value]) => {
            const obj: any = value;
            if (typeof obj === 'object') {
              if (obj.data !== undefined) {
                if (Array.isArray(obj.data)) {
                  const childrens: Array<StrapiObject> = [];
                  obj.data.forEach((children: StrapiListItem) => {
                    // override item key with formatted children
                    if (item[`${key}`] !== undefined) {
                      childrens.push({
                        ...(children.id && { id: children.id }),
                        ...children.attributes,
                      });
                    }
                  });

                  item[`${key}`] = childrens;
                }
              }
            }
          });
        });

        return items; // Return list
      }

      return strapiData.data; // Return single object
    }
  }

  return {}; // Return empty object
};
