import { InputHTMLAttributes, LabelHTMLAttributes, forwardRef } from 'react';

import { inputStyles, labelStyles } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  labelClassName?: string;
  labelProps?: Omit<LabelHTMLAttributes<HTMLLabelElement>, 'className'>;
  error?: string | boolean;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, label, labelClassName, labelProps, error, ...rest } = props;

  return (
    <label className={labelStyles({ className: labelClassName, error: !!error })} {...labelProps}>
      {label}
      <input ref={ref} className={inputStyles({ className, error: !!error })} {...rest} />
    </label>
  );
});

Input.displayName = 'Input';
