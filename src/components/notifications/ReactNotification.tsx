import {
  SHOW_NOTIFICATION_MESSAGE,
  HIDE_NOTIFICATION_MESSAGE,
} from '../constants/ActionTypes';

export const showNotificationMessage = (type: string, message: string) => {
  return {
    type: SHOW_NOTIFICATION_MESSAGE,
    payload: { showMessage: true, type: type, message: message },
  };
};

export const hideNotificationMessage = () => {
  return {
    type: HIDE_NOTIFICATION_MESSAGE,
  };
};
