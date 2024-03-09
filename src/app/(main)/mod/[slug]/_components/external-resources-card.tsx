import React from 'react';
import Link from 'next/link';

import { cn } from '@/lib/utils';

interface Props {
  className?: string;
  issues?: string | null;
  source?: string | null;
  wiki?: string | null;
  discord?: string | null;
}

const ExternalResources = ({ className, issues, source, wiki, discord } : Props) => {
  if (!issues && !source && !wiki && !discord) {
    return null;
  }
  
  return (
    <div className={cn(className, "md:flex flex-col border-accent border rounded-2xl md:col-span-2 p-4 gap-2")}>
      <h1 className='text-xl font-bold'>External resources</h1>
      <div className='grid grid-cols-3 gap-y-2'>
        {issues && <Link href={issues} className='underline'>Issues</Link>}
        {source && <Link href={source} className='underline'>Source</Link>}
        {wiki && <Link href={wiki} className='underline'>Wiki</Link>}
        {discord && <Link href={discord} className='underline'>Discord</Link>}
      </div>
    </div>
  );
}

export default ExternalResources;