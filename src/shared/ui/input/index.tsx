import { InputHTMLAttributes, LabelHTMLAttributes, forwardRef } from 'react';

import { inputStyles, labelStyles } from './styles';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  labelClassName?: string;
  labelProps?: Omit<LabelHTMLAttributes<HTMLLabelElement>, 'className'>;
};

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { className, label, labelClassName, labelProps, ...rest } = props;

  return (
    <label className={labelStyles({ className: labelClassName })} {...labelProps}>
      {label}
      <input ref={ref} className={inputStyles({ className })} {...rest} />
    </label>
  );
});

Input.displayName = 'Input';
