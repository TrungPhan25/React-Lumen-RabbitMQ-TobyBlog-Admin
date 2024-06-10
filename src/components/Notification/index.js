// toastNotifications.js
import { toast } from "react-toastify";

export const showNotification = (type, message) => {
  const options = {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  };

  switch (type) {
    case "success":
      toast.success(message, options);
      break;
    case "error":
      toast.error(message, options);
      break;
    case "warning":
      toast.warn(message, options);
      break;
    case "info":
      toast.warn(message, options);
      break;
    default:
      toast.info(message, options);
      break;
  }
};
