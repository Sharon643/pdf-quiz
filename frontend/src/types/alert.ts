export type AlertType =
    | "success"
    | "error"
    | "warning"
    | "info";

export interface AlertMessage {
    type: AlertType;
    message: string;
}