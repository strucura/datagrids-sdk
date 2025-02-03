import { FilterOperator } from '@/Enums/FilterOperator';

export default interface Filter<T> {
    alias: keyof T;
    filter_operator: FilterOperator;
    value: unknown;
}
