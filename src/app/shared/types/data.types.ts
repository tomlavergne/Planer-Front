/**
 * Types pour les données métier
 */

/***** Types de base *****/
export type ID = string | number;
export type Timestamp = number | Date;

/***** Pagination *****/
export interface PaginationParams {
  page: number;
  pageSize: number;
  total?: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

/***** Tri *****/
export type SortOrder = 'asc' | 'desc';

export interface SortParams {
  field: string;
  order: SortOrder;
}

/***** Filtres *****/
export interface FilterParams {
  [key: string]: any;
}

/***** Requêtes API *****/
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: ApiError;
  message?: string;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
}

export interface AsyncData<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

/***** Formulaires *****/
export interface FormField<T = any> {
  value: T;
  error: string | null;
  touched: boolean;
  dirty: boolean;
}

export type ValidationRule = {
  type: 'required' | 'email' | 'minLength' | 'maxLength' | 'pattern' | 'custom';
  message: string;
  value?: any;
  validator?: (value: any) => boolean;
};

/***** Dates et horaires *****/
export interface DateRange {
  start: Date;
  end: Date;
}

export interface TimeSlot {
  start: string; // Format HH:mm
  end: string; // Format HH:mm
}
