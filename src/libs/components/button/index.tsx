import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => any;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className, onClick },
  ref
) {
  return (
    <button ref={ref} onClick={onClick} type="button" className={`${className} ${styles.button}`}>
      {children}
    </button>
  );
});

export default Button;
