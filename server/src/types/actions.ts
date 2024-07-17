export interface ActionPostRequest {
    emoji: string,
    label: string,
}

export interface Action extends ActionPostRequest{
    id: number,
}