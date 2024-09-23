import { ToastClipboard, ToastNotifications } from "../components";

export const notificationConfig = {
  variants: {
    notification: {
      component: ToastNotifications,
      config: {
        notificationPosition: "top",
        duration: 5000,
      },
    },
    toast: {
      component: ToastClipboard,
      config: {
        notificationPosition: "bottom",
        duration: 7000,
      },
    },
  },
  isNotch: true,
};
