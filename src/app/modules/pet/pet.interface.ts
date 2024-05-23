export type petFilterRequest = {
  species?: string | undefined;
  breed?: string | undefined;
  age?: string | undefined;
  size?: number | undefined;
  location?: number | undefined;
  page?: number | undefined;
  limit?: number | undefined;
  sortBy?: number | undefined;
  sortOrder?: number | undefined;
  searchTerm?: string | undefined;
};
