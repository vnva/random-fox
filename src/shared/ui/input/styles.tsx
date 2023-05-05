import { cva } from 'class-variance-authority';

export const labelStyles = cva(['flex flex-col text-sm gap-1']);

export const inputStyles = cva([
  'font-sans',
  'transition-colors',
  'bg-neutral-2',
  'p-3',
  'rounded-1',
  'border-none',
  'disabled:bg-neutral-2',
]);
