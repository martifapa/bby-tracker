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