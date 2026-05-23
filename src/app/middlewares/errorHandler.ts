import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const DEFAULT_ERROR_MESSAGE = [
  'Hubo un problema al realizar la accion. Intente nuevamente',
];

const SESSION_CLOSED_MESSAGE = ['Su sesión ha expirado. Por favor, inicie sesión nuevamente.'];

export const errorHandler: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const messages = getErrorMessages(action);
    if (messages === SESSION_CLOSED_MESSAGE) {
      toast(SESSION_CLOSED_MESSAGE[0], {
        icon: '⚠️',
        duration: 3000,
      });
    } else {
      messages.forEach((message: string) => {
        toast.error(message);
      });
    }

  }

  return next(action);
};

const getErrorMessages = (action: any) => {
  const requestUrl = action.payload.path;
  
  if (requestUrl?.includes('/refresh-token')) {
    return SESSION_CLOSED_MESSAGE;
  }

  return action.payload?.data?.errors || DEFAULT_ERROR_MESSAGE;
};
