import { cva, cx } from 'class-variance-authority';

export const foxImageWrapperStyles = cx(['bg-amber-100', 'w-[400px] h-[300px]', 'rounded-10']);

export const foxImageStyles = cva(
  ['rounded-10', 'w-full', 'h-full', 'object-cover', 'object-center'],
  {
    variants: {
      loading: {
        true: ['animate-shake-x animate-count-infinite animate-duration-1s', 'filter-sepia-40'],
        false: [],
      },
    },
    defaultVariants: {
      loading: true,
    },
  }
);
