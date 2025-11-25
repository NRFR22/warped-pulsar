import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(styles.button, styles[variant], className)}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';
