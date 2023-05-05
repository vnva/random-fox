import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, type TypedUseSelectorHook, useSelector } from 'react-redux';

import { agentMiddleware } from '../agent';
import { AGENT_REQUEST_ACTION } from '../agent/actions';
import { randmFoxSlice } from '@/features/random-fox/slice';

export const store = configureStore({
  reducer: {
    randomFox: randmFoxSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [AGENT_REQUEST_ACTION],
      },
    }).concat(agentMiddleware()),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
