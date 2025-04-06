import { useState, useCallback, useEffect } from 'react';

interface AsyncState<T> {
  status: 'idle' | 'pending' | 'success' | 'error';
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  immediate = true,
  ...args: any[]
) {
  const [state, setState] = useState<AsyncState<T>>({
    status: 'idle',
    data: null,
    error: null,
    isLoading: false,
    isSuccess: false,
    isError: false,
  });

  const execute = useCallback(
    async (...executeArgs: any[]) => {
      const argsToUse = executeArgs.length > 0 ? executeArgs : args;
      
      setState({
        status: 'pending',
        data: null,
        error: null,
        isLoading: true,
        isSuccess: false,
        isError: false,
      });

      try {
        const response = await asyncFunction(...argsToUse);
        setState({
          status: 'success',
          data: response,
          error: null,
          isLoading: false,
          isSuccess: true,
          isError: false,
        });
        return response;
      } catch (error) {
        setState({
          status: 'error',
          data: null,
          error: error as Error,
          isLoading: false,
          isSuccess: false,
          isError: true,
        });
        throw error;
      }
    },
    [asyncFunction, ...args]
  );

  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { ...state, execute };
}
