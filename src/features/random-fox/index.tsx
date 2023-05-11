import ms from 'ms';
import { ChangeEvent, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@/app/store';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';

import { fetchRandomFoxImage, fetchRandomFoxImageWithoutCache, setExpires } from './slice';
import { foxImageStyles, foxImageWrapperStyles } from './styles';

export const RandomFox = () => {
  const dispatch = useAppDispatch();

  const [expiresIsValid, setExpiresIsValid] = useState(true);
  const { expires, image, loading } = useAppSelector((state) => state.randomFox);

  const handleChangeExpires = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(setExpires(e.target.value));

    try {
      ms(e.target.value);
      setExpiresIsValid(true);
    } catch {
      setExpiresIsValid(false);
    }
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

  const requestsDisabled = loading || !expiresIsValid;

  useEffect(() => {
    dispatch(fetchRandomFoxImage(expires));
  }, []);

  return (
    <div className="flex items-center justify-center h-screen bg-amber-50">
      <div className="flex flex-col items-center gap-4">
        <div className={foxImageWrapperStyles}>
          {image && (
            <img
              src={image}
              className={foxImageStyles({ loading })}
              onLoad={() => console.log('load image')}
            />
          )}
        </div>
        <Input
          label="Cache expires"
          value={expires}
          onChange={handleChangeExpires}
          placeholder="Cache expires"
          labelClassName="w-full mb-3"
          error={!expiresIsValid}
        />
        <Button
          className="w-full"
          disabled={requestsDisabled}
          onClick={handleFetchRandomFoxImageWithExpires}
        >
          Enabled cache
        </Button>
        <Button
          className="w-full"
          disabled={requestsDisabled}
          onClick={handleFetchRandomFoxImageWithDisabledCache}
        >
          Disabled cache
        </Button>
        <Button
          className="w-full"
          disabled={requestsDisabled}
          onClick={handleFetchRandomFoxImageWithoutCache}
        >
          Without cache
        </Button>
      </div>
    </div>
  );
};
