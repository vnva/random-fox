import { ButtonHTMLAttributes, FC } from 'react';

import { buttonStyles } from './styles';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = (props) => {
  const { children, className, ...rest } = props;

  return (
    <button className={buttonStyles({ className })} {...rest}>
      {children}
    </button>
  );
};
