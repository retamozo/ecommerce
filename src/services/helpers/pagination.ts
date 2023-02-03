type PaginationObj = {
  page?: number;
  size?: number;
};

type Paginate = (params: PaginationObj) => {
  limit: number;
  offset: number;
};

export const buildPaginationQuery: Paginate = ({ page = 0, size = 10 }) => ({
  limit: size,
  offset: page * size,
});

export const pageIndicators = (count: number, size: number, page: number) => ({
  current_page: +page || 0,
  total_pages: Math.ceil(count / size),
});
