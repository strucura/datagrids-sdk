import { FilterOperator } from '@/Enums/FilterOperator';
import Filter from '@/Interfaces/Filter';

class FilterBuilder<T> {
    private filters: Filter<T>[] = [];

    static make<T>(): FilterBuilder<T> {
        return new FilterBuilder<T>();
    }

    addFilter<K extends keyof T>(alias: K, operator: FilterOperator, value: unknown): this {
        this.filters.push({ alias, filter_operator: operator, value });
        return this;
    }

    startsWith<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.STARTS_WITH, value);
    }

    contains<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.CONTAINS, value);
    }

    notContains<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.NOT_CONTAINS, value);
    }

    endsWith<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.ENDS_WITH, value);
    }

    equals<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.EQUALS, value);
    }

    notEquals<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.NOT_EQUALS, value);
    }

    in<K extends keyof T>(alias: K, value: T[K][]): this {
        return this.addFilter(alias, FilterOperator.IN, value);
    }

    lessThan<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.LESS_THAN, value);
    }

    lessThanOrEqualTo<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.LESS_THAN_OR_EQUAL_TO, value);
    }

    greaterThan<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.GREATER_THAN, value);
    }

    greaterThanOrEqualTo<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.GREATER_THAN_OR_EQUAL_TO, value);
    }

    is<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.IS, value);
    }

    isNot<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.IS_NOT, value);
    }

    before<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.BEFORE, value);
    }

    after<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.AFTER, value);
    }

    dateIs<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.DATE_IS, value);
    }

    dateIsNot<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.DATE_IS_NOT, value);
    }

    dateBefore<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.DATE_BEFORE, value);
    }

    dateAfter<K extends keyof T>(alias: K, value: T[K]): this {
        return this.addFilter(alias, FilterOperator.DATE_AFTER, value);
    }

    build(): Filter<T>[] {
        return this.filters;
    }
}

export default FilterBuilder;
