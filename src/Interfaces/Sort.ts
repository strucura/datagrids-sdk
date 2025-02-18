export interface Sort<T> {
    alias: keyof T;
    sort_operator: 'asc' | 'desc';
}
