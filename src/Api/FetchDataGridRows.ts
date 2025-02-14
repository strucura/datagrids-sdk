import DataGridBuilder from '@/Builders/DataGridBuilder';

export default async function fetchDataGridRows<T>(
    url: string,
    closure: (builder: DataGridBuilder<T>) => DataGridBuilder<T>,
    headers: HeadersInit = {},
): Promise<{
    rows: T[];
    total_row_count: number;
}> {
    const builder = DataGridBuilder.make<T>();
    closure(builder);

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            ...headers,
        },
        body: JSON.stringify(builder.build()),
    });
    return await response.json();
}
