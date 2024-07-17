export interface QuickActionRequest {
    emoji: string,
    label: string,
}

export interface QuickAction extends QuickActionRequest {
    id: number,
}

export interface QuickActionState {
    status: string,
    pinned: QuickAction[],
}

export interface AsyncThunkConfig {
    rejectValue: string,
}



export interface Log {
    id: number,
    datetime: string,
    label: string,
    emoji: string,
    text?: string,
}

export interface LogsState {
    status: string,
    logs: Log[],
    previewLogs: number,
    view: Log[],
}



export interface SummaryStatType {
    emoji: string,
    title: string,
    times: number,
    cadence: string,
    total?: string,
}


export interface SleepData {
    date: string,
    totalHours: number,
    daytimeHours: number,
    nighttimeHours: number,
    [key: string]: unknown,
}


export interface FeedData {
    date: string,
    times: number,
    averageSpan: number,
}


export interface CustomLabelListProps {
    x: number,
    y: number,
    index: number,
    value: number,
    width: number,
    height: number,
}