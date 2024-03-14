import React from 'react';
import { notFound } from 'next/navigation';

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
    notFound();
  }

  return (
    <div>Overview page</div>
  );
}

export default DashboardModPage;