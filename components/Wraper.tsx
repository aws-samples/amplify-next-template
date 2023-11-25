'use client';

import type { ReactNode } from 'react';

type ProviderProps = {
  children: ReactNode;
};

export function Wraper({children }: ProviderProps) {
  return (
    <div className='mt-[25vh] w-full h-auto'>
      <div className="content-layout">
        {children}
      </div>
    </div>
  );
}
