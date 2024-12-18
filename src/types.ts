export type SearchParams = {
  pageNumber: number;
  pageSize: number;
  name?: string;
};

export interface IObjectsResponse {
  total: number;
  data: IObjectResponse[];
}

export interface IObjectResponse {
  id: string;
  name: string;
  abv: number;
  ibu: number;
  type: string;
  country: string;
  description: string;
}

export interface RequestSearchParams {
  pageNumber: number;
  searchString?: string;
}

export interface ISelectedItems {
  [id: string]: {
    name: string;
    abv: string;
    ibu: string;
    type: string;
    country: string;
  };
}
