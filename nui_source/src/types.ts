export interface OpenedModal {
    canClose: boolean;
    onClose: (() => void) | null;
    [key: string]: any;
}
