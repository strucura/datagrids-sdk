import FilterBuilder from '@/Builders/FilterBuilder';
import { FilterSetOperator } from '@/Enums/FilterSetOperator';
import { FilterSet } from '@/Interfaces/FilterSet';
import { Sort } from '@/Interfaces/Sort';
import { SortDirection } from '@/Enums/SortDirection.ts';

export default class DataGridBuilder<T> {
    protected first: number = 0;
    protected last: number = 100;

    protected filterSets: FilterSet<T>[] = [];

    protected sorts: Sort<T>[] = [];

    static make<T>(): DataGridBuilder<T> {
        return new DataGridBuilder<T>();
    }

    addFilterSet(
        closure: (builder: FilterBuilder<T>) => void,
        operator: FilterSetOperator = FilterSetOperator.AND,
    ): this {
        const builder = new FilterBuilder<T>();
        closure(builder);
        this.filterSets.push({
            filter_set_operator: operator,
            filters: builder.build(),
        });
        return this;
    }

    addSort<K extends keyof T>(alias: K, direction: SortDirection = SortDirection.ASC): this {
        this.sorts.push({ alias, direction });
        return this;
    }

    firstRow(first: number): this {
        this.first = first;
        return this;
    }

    lastRow(last: number): this {
        this.last = last;
        return this;
    }

    build(): { filter_sets: FilterSet<T>[]; sorts: Sort<T>[]; first: number; last: number } {
        return {
            first: this.first,
            last: this.last,
            filter_sets: this.filterSets,
            sorts: this.sorts,
        };
    }
}
