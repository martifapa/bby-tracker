export interface NewQuickActionForm {
    emoji: string,
    label: string
}

export interface QuickAction extends NewQuickActionForm {
    id: number
}

export interface QuickActionState {
    status: string,
    pinned: QuickAction[]
}



export interface Log {
    id: number,
    datetime: string,
    label: string,
    emoji: string,
    text?: string
}

export interface LogsState {
    status: string,
    logs: Log[],
    previewLogs: number,
    view: Log[]
}



export interface SummaryStatType {
    emoji: string,
    title: string,
    times: number,
    cadence: string,
    total?: string
}