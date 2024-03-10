import React from 'react';
import Link from 'next/link';
import { formatDistance, format } from "date-fns";
import { RefreshCcw, Download } from 'lucide-react';

import ModIcon from '@/components/mod-icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface Props {
  id: string;
  slug: string;
  name: string;
  ownerName: string;
  icon: string | null | undefined;
  summary: string | null;
  downloads: number;
  updatedAt: Date;
}

const ModCard = ({ id, slug, name, ownerName, icon, summary, downloads, updatedAt } : Props) => {
  return (
    <Card >
      <CardContent className="p-4 grid md:grid-cols-2 gap-4">
        <Link href={`/mod/${slug}`} className='md:row-span-3 col-end-1 w-28'>
          <ModIcon icon={icon} />
        </Link>
        <div className='flex items-end gap-2 md:col-span-3 flex-wrap'>
          <Link href={`/mod/${slug}`} className='font-bold text-2xl'>{name}</Link>
          <span className='text-muted-foreground'>by</span>
          <Link href={`/user/${ownerName}`} className='underline text-muted-foreground hover:text-foreground'>{ownerName}</Link>
        </div>
        <div className='md:col-span-3'>
          <p className='text-muted-foreground'>{summary ?? <span className='italic'>No summary</span>}</p>
        </div>
        <div className='flex items-center gap-2 md:col-span-2 text-muted-foreground'><Download size={16} /><span className='font-bold'>{downloads}</span> downloads</div>
        <div className='md:col-start-3 text-muted-foreground'>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger className='hover:cursor-default'>
                <div className='flex items-center gap-2'>
                  <RefreshCcw size={16} />{`Updated ${formatDistance(updatedAt, new Date())} ago`}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{format(updatedAt, "MMMM d, yyyy 'at' h:m a")}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}

export default ModCard;