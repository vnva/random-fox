import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { agentRequestAction } from '@/app/agent/actions';

interface RandomFoxSlice {
  image: string | null;
  expires: string;
  loading: boolean;
}

const initialState: RandomFoxSlice = {
  image: null,
  expires: '5s',
  loading: false,
};

export const randmFoxSlice = createSlice({
  name: 'randomfox',
  initialState,
  reducers: {
    setImage(state, action: PayloadAction<{ image: string }>) {
      state.image = action.payload.image;
    },
    setImageLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setExpires(state, action: PayloadAction<string>) {
      state.expires = action.payload;
    },
  },
});

export const { setExpires: setRandomFoxExpires } = randmFoxSlice.actions;

export const fetchRandomFoxImage = (expires: string, disableCache = false) =>
  agentRequestAction<never, { image: string }>({
    url: 'https://randomfox.ca/floof/',
    onStart: randmFoxSlice.actions.setImageLoading(true),
    onEnd: randmFoxSlice.actions.setImageLoading(false),
    onSuccess: randmFoxSlice.actions.setImage,
    cache: { expires, disabled: disableCache },
  });

export const fetchRandomFoxImageWithoutCache = () =>
  agentRequestAction<never, { image: string }>({
    url: 'https://randomfox.ca/floof/',
    onStart: randmFoxSlice.actions.setImageLoading(true),
    onEnd: randmFoxSlice.actions.setImageLoading(false),
    onSuccess: randmFoxSlice.actions.setImage,
  });
