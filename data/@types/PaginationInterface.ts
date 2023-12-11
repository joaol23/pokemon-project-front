export interface PaginateInterface<T> {
    data: T[],
    current_page: number,
    first_page_url: string,
    last_page: number,
    last_page_url: string,
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url: string,
    total: number,
    links: LinksPaginationInterface[]
} 

export interface LinksPaginationInterface {
    url: string,
    label: string,
    active: boolean,
}