import React from 'react';
import { formatDistance } from 'date-fns';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription
} from '@/components/ui/card';
import { CakeIcon, DownloadIcon } from 'lucide-react';
import Avatar from '@/components/avatar';

interface Props {
  name: string;
  image: string | null;
  createdAt: Date
  totalDownloads: number;
}

const UserInfoCard = ({ name, image, createdAt, totalDownloads }: Props) => {
  return (
    <Card className='md:flex flex-col border-accent border rounded-2xl md:col-span-2 gap-2'>
      <CardHeader className='flex flex-col gap-2 pb-2'>
        <CardTitle>
          <Avatar avatar={image} fallback={name[0]!} className='w-24 h-24'/>
        </CardTitle>
        <CardDescription className='text-xl font-bold'>
          <span className='text-foreground'>{name}</span>
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent className='flex flex-col gap-2 pt-0'>
        <div className='flex items-center gap-2'>
          <CakeIcon size={16} />{`Joined ${formatDistance(createdAt, new Date())} ago`}
        </div>
        <div className='flex items-center gap-2'>
          <DownloadIcon size={16} />{`Total downloads: ${totalDownloads}`}
        </div>
      </CardContent>
    </Card>
  );
}

export default UserInfoCard;