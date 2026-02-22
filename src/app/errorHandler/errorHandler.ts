import { isRejectedWithValue } from '@reduxjs/toolkit';
import type { MiddlewareAPI, Middleware } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';

const DEFAULT_ERROR_MESSAGE = ['Hubo un problema al realizar la accion. Intente nuevamente'];

export const errorHandler: Middleware = (api: MiddlewareAPI) => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    const messages = getErrorMessages(action);
    messages.map((message: string) => {
      toast.error(message);
    });
  }

  return next(action);
};

const getErrorMessages = (action) => {
  return action.payload?.data?.errors || DEFAULT_ERROR_MESSAGE;
};
