import axios from 'axios';

export const parseApiError = (err: unknown) => {
  if (axios.isAxiosError(err)) {
    return {
      message: err.response?.data?.message || err.message,
      code: err.response?.data?.code || 'AXIOS_ERROR',
    };
  }

  return {
    message: 'Unknown error',
    code: 'UNKNOWN_ERROR',
  };
};
