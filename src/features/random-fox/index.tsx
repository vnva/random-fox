import { ChangeEvent, useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { fetchRandomFoxImage, fetchRandomFoxImageWithoutCache, setRandomFoxExpires } from './slice';
import { foxImageStyles, foxImageWrapperStyles } from './styles';

export const RandomFox = () => {
  const dispatch = useAppDispatch();

  const { expires, image, loading } = useAppSelector((state) => state.randomFox);

  const handleChangeExpires = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setRandomFoxExpires(e.target.value));
  };

  const handleFetchRandomFoxImageWithExpires = () => {
    dispatch(fetchRandomFoxImage(expires));
  };

  const handleFetchRandomFoxImageWithDisabledCache = () => {
    dispatch(fetchRandomFoxImage(expires, true));
  };

  const handleFetchRandomFoxImageWithoutCache = () => {
    dispatch(fetchRandomFoxImageWithoutCache());
  };

  useEffect(() => {
    dispatch(fetchRandomFoxImage(expires));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-amber-50">
      <div className="flex flex-col items-center gap-4">
        <div className={foxImageWrapperStyles}>
          {image && <img src={image} className={foxImageStyles({ loading })} />}
        </div>
        <Input
          label="Cache expires"
          value={expires}
          onChange={handleChangeExpires}
          placeholder="Cache expires"
          labelClassName="w-full mb-3"
        />
        <Button
          className="w-full"
          disabled={loading}
          onClick={handleFetchRandomFoxImageWithExpires}
        >
          Enabled cache
        </Button>
        <Button
          className="w-full"
          disabled={loading}
          onClick={handleFetchRandomFoxImageWithDisabledCache}
        >
          Disabled cache
        </Button>
        <Button
          className="w-full"
          disabled={loading}
          onClick={handleFetchRandomFoxImageWithoutCache}
        >
          Without cache
        </Button>
      </div>
    </div>
  );
};
