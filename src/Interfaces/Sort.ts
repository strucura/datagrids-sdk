export interface Sort<T> {
    alias: keyof T;
    direction: 'asc' | 'desc';
}
