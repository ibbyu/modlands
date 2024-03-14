import React from 'react';
import { notFound } from 'next/navigation';
import { getServerAuthSession } from '@/server/auth';
import { getModBySlug } from '@/server/data/mod';
import NewVersionCard from './_components/new-version-card';

interface Props {
  params: {
    slug: string
  }
}

const NewVersionPage = async ({ params }: Props) => {
  const session = await getServerAuthSession();
  const mod = await getModBySlug(params.slug);

  if (!mod || session?.user.id !== mod.ownerId) {
    notFound();
  }

  return (
    <div>
      <NewVersionCard modId={mod.id} modSlug={mod.slug} />
    </div>
  );
}

export default NewVersionPage;