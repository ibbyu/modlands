import React from 'react';
import Link from 'next/link';

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle
} from '@/components/ui/card';
import Avatar from '@/components/avatar';

interface Props {
  name: string;
  avatar: string | null;
}

const MembersCard = ({ avatar, name }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project members</CardTitle>
      </CardHeader>
      <CardContent>
        <Link href={`/user/${name}`} className='flex items-center gap-4'>
          <Avatar avatar={avatar} fallback={name[0]!} className='w-12 h-12'/>
          <span className='font-bold'>{name}</span>
        </Link>
      </CardContent>
    </Card >
  );
}

export default MembersCard;