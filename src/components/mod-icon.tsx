import React from 'react';
import Image from 'next/image';
import { BoxIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  icon: string | null | undefined;
  className?: string;
}

const ModIcon = ({ icon, className } : Props) => {
  return (
    <div className={cn("aspect-square relative overflow-hidden rounded-2xl", className)}>
      {icon ? <Image
        src={icon}
        alt="Mod icon"
        fill
      /> : <div className='flex items-center justify-center h-full'>
        <BoxIcon className='w-full h-full' />
        </div>}
    </div>
  );
};

export default ModIcon;