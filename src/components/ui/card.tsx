import { HTMLAttributes } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {}

export const Card = ({ className = '', ...props }: CardProps) => (
  <div
    className={`rounded-lg border bg-white shadow-sm ${className}`}
    {...props}
  />
);

export const CardHeader = ({ className = '', ...props }: CardProps) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
);

export const CardTitle = ({
  className = '',
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
);

export const CardContent = ({ className = '', ...props }: CardProps) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
);
