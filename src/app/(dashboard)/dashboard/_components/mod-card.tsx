import React from 'react';
import {
  Card,
  CardHeader,
} from "@/components/ui/card";
import ModIcon from '@/components/mod-icon';

interface Props {
  name: string;
  icon: string | null;
  summary: string;
}

const ModCard = ({ name, icon, summary }: Props) => {
  return (
    <Card>
      <CardHeader className='p-4'>
        <div className='w-full flex gap-4'>
          <ModIcon icon={icon} className='w-24 h-24'/>
          <div className='flex flex-col'>
            <div>
              {name}
            </div>
            <div className='text-muted-foreground'>
              {summary}
            </div>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
}

export default ModCard;