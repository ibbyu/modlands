import React from 'react';

import { getModBySlug } from '@/server/data/mod';
import { getServerAuthSession } from '@/server/auth';

interface Props {
  params: {
    slug: string
  }
}

const DashboardModPage = async ({ params }: Props) => {
  const session = await getServerAuthSession();
  const mod = await getModBySlug(params.slug);

  if (!mod) {
    return <div className='w-full flex h-full justify-center items-center'>Mod not found</div>;
  }

  return (
    <div>Overview page</div>
  );
}

export default DashboardModPage;