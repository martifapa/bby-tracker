export interface LogRequest {
    datetime: string,
    emoji: string,
    label: string,
}

export interface Log extends LogRequest {
    id: number,
}