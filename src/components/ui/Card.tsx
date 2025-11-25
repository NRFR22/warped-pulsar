import React from 'react';
import { cn } from '@/lib/utils';
import styles from './Card.module.css';

type CardProps = React.HTMLAttributes<HTMLDivElement>;

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    ({ className, ...props }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(styles.card, className)}
                {...props}
            />
        );
    }
);

Card.displayName = 'Card';
