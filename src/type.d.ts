/// <reference types="nativewind/types" />

type ApiResponse<T = void> = T extends void
  ? {
      status: 200;
      message: string;
    }
  : {
      data: T;
      status: 200;
      message: string;
    };

type ApiResponsePagination<T> = ApiResponse<{
  page: number;
  totalPage: number;
  totalCount: number;
  data: T[];
}>;

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
