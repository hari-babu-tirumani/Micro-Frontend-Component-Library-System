import React from 'react';
import clsx from 'clsx';
import styles from './Input.module.css';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Input label */
  label?: string;
  /** Helper text displayed below input */
  helperText?: string;
  /** Error message */
  error?: string;
  /** Full width input */
  fullWidth?: boolean;
  /** Icon element to display before input */
  startIcon?: React.ReactNode;
  /** Icon element to display after input */
  endIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      fullWidth = false,
      startIcon,
      endIcon,
      className,
      id,
      required,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = React.useId();
    const inputId = id || `input-${generatedId}`;
    const helperTextId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const hasError = Boolean(error);

    return (
      <div className={clsx(styles.container, { [styles.fullWidth]: fullWidth }, className)}>
        {label && (
          <label htmlFor={inputId} className={styles.label}>
            {label}
            {required && (
              <span className={styles.required} aria-label="required">
                *
              </span>
            )}
          </label>
        )}
        <div className={clsx(styles.inputWrapper, { [styles.hasError]: hasError })}>
          {startIcon && <span className={styles.startIcon}>{startIcon}</span>}
          <input
            ref={ref}
            id={inputId}
            className={clsx(styles.input, {
              [styles.withStartIcon]: startIcon,
              [styles.withEndIcon]: endIcon,
            })}
            aria-invalid={hasError}
            aria-describedby={
              hasError ? errorId : helperText ? helperTextId : undefined
            }
            required={required}
            disabled={disabled}
            {...props}
          />
          {endIcon && <span className={styles.endIcon}>{endIcon}</span>}
        </div>
        {error && (
          <p id={errorId} className={styles.error} role="alert">
            {error}
          </p>
        )}
        {helperText && !error && (
          <p id={helperTextId} className={styles.helperText}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
