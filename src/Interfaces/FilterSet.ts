import { FilterSetOperator } from '@/Enums/FilterSetOperator';
import Filter from '@/Interfaces/Filter';

export interface FilterSet<T> {
    filter_set_operator: FilterSetOperator;
    filters: Filter<T>[];
}
