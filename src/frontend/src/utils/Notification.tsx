import { notification } from "antd";
type NotificationType = 'success' | 'info' | 'warning' | 'error';

const openNotificationWithIcon = (
    type: NotificationType,
    message?: string,
    description?: string,
    placement?: any
) => {
    placement = placement || "topRight";
    notification[type]({ message, description, placement });
};
// const openNotificationWithIcon = (type: any, message: any, description: any, placement: any) => {
//     placement = placement || "topRight"
//     notification[type:]({ message, description, placement });
// }

export const successNotification = (message: any, description: any, placement: any) =>
    openNotificationWithIcon('success', message, description, placement);

export const errorNotification = (message: any, description: any, placement: any) =>
    openNotificationWithIcon('error', message, description, placement);

export const infoNotification = (message: any, description: any, placement: any) =>
    openNotificationWithIcon('info', message, description, placement);

export const warningNotification = (message: any, description: any, placement: any) =>
    openNotificationWithIcon('warning', message, description, placement);

