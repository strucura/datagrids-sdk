import FilterBuilder from '@/Builders/FilterBuilder';
import { FilterOperator } from '@/Enums/FilterOperator';

interface UserDataGrid {
    id: number;
    name: string;
    age: number;
    status: 'active' | 'pending';
    created_at: string;
    updated_at: string;
}

describe('FilterBuilder', () => {
    let filterBuilder: FilterBuilder<UserDataGrid>;

    beforeEach(() => {
        filterBuilder = new FilterBuilder();
    });

    test('should create an instance of FilterBuilder using make method', () => {
        const instance = FilterBuilder.make();
        expect(instance).toBeInstanceOf(FilterBuilder);
    });

    test('should add a filter with startsWith operator', () => {
        filterBuilder.startsWith('name', 'John');
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'name', filter_operator: FilterOperator.STARTS_WITH, value: 'John' }
        ]);
    });

    test('should add a filter with endsWith operator', () => {
        filterBuilder.endsWith('name', 'John');
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'name', filter_operator: FilterOperator.ENDS_WITH, value: 'John' }
        ]);
    });

    test('should add a filter with contains operator', () => {
        filterBuilder.contains('name', 'John');
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'name', filter_operator: FilterOperator.CONTAINS, value: 'John' }
        ]);
    });

    test('should add multiple filters', () => {
        filterBuilder.startsWith('name', 'John').lessThan('age', 30);
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'name', filter_operator: FilterOperator.STARTS_WITH, value: 'John' },
            { alias: 'age', filter_operator: FilterOperator.LESS_THAN, value: 30 }
        ]);
    });

    test('should add a filter with equals operator', () => {
        filterBuilder.equals('age', 30);
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'age', filter_operator: FilterOperator.EQUALS, value: 30 }
        ]);
    });

    test('should add a filter with not equals operator', () => {
        filterBuilder.notEquals('age', 30);
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'age', filter_operator: FilterOperator.NOT_EQUALS, value: 30 }
        ]);
    });

    test('should add a filter with in operator', () => {
        filterBuilder.in('status', ['active', 'pending']);
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'status', filter_operator: FilterOperator.IN, value: ['active', 'pending'] }
        ]);
    });

    test('should add a filter with greaterThan operator', () => {
        filterBuilder.greaterThan('age', 50);
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'age', filter_operator: FilterOperator.GREATER_THAN, value: 50 }
        ]);
    });

    test('should add a filter with lessThan operator', () => {
        filterBuilder.lessThan('age', 50);
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'age', filter_operator: FilterOperator.LESS_THAN, value: 50 }
        ]);
    });

    test('should add a filter with notContains operator', () => {
        filterBuilder.notContains('name', 'John');
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'name', filter_operator: FilterOperator.NOT_CONTAINS, value: 'John' }
        ]);
    });

    test('should add a filter with notEquals operator', () => {
        filterBuilder.notEquals('age', 30);
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'age', filter_operator: FilterOperator.NOT_EQUALS, value: 30 }
        ]);
    });

    test('should add a filter with lessThanOrEqualTo operator', () => {
        filterBuilder.lessThanOrEqualTo('age', 50);
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'age', filter_operator: FilterOperator.LESS_THAN_OR_EQUAL_TO, value: 50 }
        ]);
    });

    test('should add a filter with greaterThanOrEqualTo operator', () => {
        filterBuilder.greaterThanOrEqualTo('age', 50);
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'age', filter_operator: FilterOperator.GREATER_THAN_OR_EQUAL_TO, value: 50 }
        ]);
    });

    test('should add a filter with is operator', () => {
        filterBuilder.is('status', 'active');
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'status', filter_operator: FilterOperator.IS, value: 'active' }
        ]);
    });

    test('should add a filter with isNot operator', () => {
        filterBuilder.isNot('status', 'pending');
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'status', filter_operator: FilterOperator.IS_NOT, value: 'pending' }
        ]);
    });

    test('should add a filter with before operator', () => {
        filterBuilder.before('created_at', '2023-01-01');
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'created_at', filter_operator: FilterOperator.BEFORE, value: '2023-01-01' }
        ]);
    });

    test('should add a filter with after operator', () => {
        filterBuilder.after('created_at', '2023-01-01');
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'created_at', filter_operator: FilterOperator.AFTER, value: '2023-01-01' }
        ]);
    });

    test('should add a filter with dateIs operator', () => {
        filterBuilder.dateIs('created_at', '2023-01-01');
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'created_at', filter_operator: FilterOperator.DATE_IS, value: '2023-01-01' }
        ]);
    });

    test('should add a filter with dateIsNot operator', () => {
        filterBuilder.dateIsNot('created_at', '2023-01-01');
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'created_at', filter_operator: FilterOperator.DATE_IS_NOT, value: '2023-01-01' }
        ]);
    });

    test('should add a filter with dateBefore operator', () => {
        filterBuilder.dateBefore('created_at', '2023-01-01');
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'created_at', filter_operator: FilterOperator.DATE_BEFORE, value: '2023-01-01' }
        ]);
    });

    test('should add a filter with dateAfter operator', () => {
        filterBuilder.dateAfter('created_at', '2023-01-01');
        const filters = filterBuilder.build();
        expect(filters).toEqual([
            { alias: 'created_at', filter_operator: FilterOperator.DATE_AFTER, value: '2023-01-01' }
        ]);
    });
});
