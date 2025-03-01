import DataGridBuilder from '@/Builders/DataGridBuilder.ts';
import FilterBuilder from '@/Builders/FilterBuilder';
import { FilterSetOperator } from '@/Enums/FilterSetOperator';
import { FilterOperator } from '@/Enums/FilterOperator';
import { SortOperator } from '@/Enums/SortOperator.ts';

interface UserDataGrid {
    id: number;
    name: string;
    age: number;
    created_at: Date;
    updated_at: Date;
}

describe('DataGridBuilder', () => {
    let dataGridBuilder: DataGridBuilder<UserDataGrid>;

    beforeEach(() => {
        dataGridBuilder = DataGridBuilder.make();
    });

    test('should add a filter set with AND operator', () => {
        dataGridBuilder.addFilterSet((builder: FilterBuilder<UserDataGrid>) => {
            builder.startsWith('name', 'John');
        });
        const { filter_sets } = dataGridBuilder.build();
        expect(filter_sets).toEqual([
            {
                filter_set_operator: FilterSetOperator.AND,
                filters: [{ alias: 'name', filter_operator: FilterOperator.STARTS_WITH, value: 'John' }],
            },
        ]);
    });

    test('should add a filter set with OR operator', () => {
        dataGridBuilder.addFilterSet((builder: FilterBuilder<UserDataGrid>) => {
            builder.contains('name', 'Doe');
        }, FilterSetOperator.OR);
        const { filter_sets } = dataGridBuilder.build();
        expect(filter_sets).toEqual([
            {
                filter_set_operator: FilterSetOperator.OR,
                filters: [{ alias: 'name', filter_operator: FilterOperator.CONTAINS, value: 'Doe' }],
            },
        ]);
    });

    test('should add multiple filter sets', () => {
        dataGridBuilder
            .addFilterSet((builder: FilterBuilder<UserDataGrid>) => {
                builder.startsWith('name', 'John');
            })
            .addFilterSet((builder: FilterBuilder<UserDataGrid>) => {
                builder.equals('age', 30);
            }, FilterSetOperator.OR);
        const { filter_sets } = dataGridBuilder.build();
        expect(filter_sets).toEqual([
            {
                filter_set_operator: FilterSetOperator.AND,
                filters: [{ alias: 'name', filter_operator: FilterOperator.STARTS_WITH, value: 'John' }],
            },
            {
                filter_set_operator: FilterSetOperator.OR,
                filters: [{ alias: 'age', filter_operator: FilterOperator.EQUALS, value: 30 }],
            },
        ]);
    });

    test('should set the first row', () => {
        dataGridBuilder.firstRow(10);
        const { first } = dataGridBuilder.build();
        expect(first).toBe(10);
    });

    test('should set the last row', () => {
        dataGridBuilder.lastRow(50);
        const { last } = dataGridBuilder.build();
        expect(last).toBe(50);
    });

    test('should add a sort by id in ascending order', () => {
        dataGridBuilder.addSort('id', SortOperator.ASC);
        const { sorts } = dataGridBuilder.build();
        expect(sorts).toEqual([{ alias: 'id', sort_operator: SortOperator.ASC }]);
    });

    test('should add a sort by name in descending order', () => {
        dataGridBuilder.addSort('name', SortOperator.DESC);
        const { sorts } = dataGridBuilder.build();
        expect(sorts).toEqual([{ alias: 'name', sort_operator: SortOperator.DESC }]);
    });

    test('should add multiple sorts', () => {
        const { sorts } = dataGridBuilder.addSort('id', SortOperator.ASC).addSort('name', SortOperator.DESC).build();
        expect(sorts).toEqual([
            { alias: 'id', sort_operator: SortOperator.ASC },
            { alias: 'name', sort_operator: SortOperator.DESC },
        ]);
    });
});
