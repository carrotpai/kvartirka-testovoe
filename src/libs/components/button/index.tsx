import React from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => any;
  href?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { children, className, onClick, href },
  ref
) {
  return (
    <button ref={ref} onClick={onClick} type="button" className={`${className} ${styles.button}`}>
      {children}
      <a hidden href={href}></a>
    </button>
  );
});

export default Button;
