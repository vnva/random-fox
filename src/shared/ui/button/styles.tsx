import { cva } from 'class-variance-authority';

export const buttonStyles = cva([
  'transition-colors',
  'cursor-pointer',
  'bg-neutral-3',
  'hover:bg-amber-2',
  'p-3',
  'rounded-1',
  'border-none',
  'disabled:bg-neutral-2',
  'font-sans',
  'disabled:hover:bg-neutral-2',
  'disabled:cursor-default',
]);
