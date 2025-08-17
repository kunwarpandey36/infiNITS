
import { cn } from '@/lib/utils';
import * as React from 'react';

export function IcebergLogo({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      {...props}
    >
      <path d="M5 10L12 3L19 10H5Z" fill="currentColor" opacity="0.9" />
      <path d="M5 10H19V11H5V10Z" fill="currentColor" />
      <path d="M6 12L8 21L12 15L16 21L18 12" stroke="currentColor" fill="currentColor"  opacity="0.6"/>
    </svg>
  );
}
