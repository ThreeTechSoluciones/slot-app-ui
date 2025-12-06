import type { JSX } from "react"

export enum ModalType {
    EDIT = "Edit",
    CREATE = "Create"
}

export type ModalConfig = {
    contentRef: React.RefObject<any>,
    content: JSX.Element,
    onConfirm: () => void
}