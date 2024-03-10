"use client";
import React from 'react';

import { Separator } from '@/components/ui/separator';
import { Badge } from "@/components/ui/badge";
import ModIcon from '@/components/mod-icon';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';

interface Props {
  modId: string;
  icon: string | null;
  name: string;
  summary: string | null;
  downloads: number;
  createdAtTimeStamp: string;
  updatedAtTimeStamp: string;
  approved: boolean;
  draft: boolean;
  slug: string;
}

const InfoCard = ({ modId, icon, name, summary, downloads, createdAtTimeStamp, updatedAtTimeStamp, approved, draft, slug }: Props) => {
  return (
    <Card className='md:flex flex-col border-accent border rounded-2xl md:col-span-2 gap-2'>
      <CardHeader className='flex flex-col gap-2 pb-0'>
        <CardTitle>
          <div>
            <ModIcon icon={icon} className='w-24' />
          </div>
          <div className='flex gap-2 items-center'>
            <h1 className='font-bold text-3xl'>{name}</h1>
            {draft && <Badge variant="outline">Draft</Badge>}
          </div>
        </CardTitle>
        <CardDescription className='text-sm'>
          <span className='text-muted-foreground'>{summary ?? <span className='italic'>No summary</span>}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className='flex flex-col gap-2'>
        <Separator />
        <div className='flex items-center justify-between'>
          <span>Downloads</span>
          <span>{downloads}</span>
        </div>
        <div className='w-full flex items-center text-sm text-muted-foreground'>
          <div className='w-full flex items-center justify-between'>
            <span>Created</span>
            <span>{createdAtTimeStamp}</span>
          </div>
        </div>
        <div className='w-full flex items-center text-sm text-muted-foreground'>
          <div className='w-full flex items-center justify-between'>
            <span>Updated</span>
            <span>{updatedAtTimeStamp}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default InfoCard;