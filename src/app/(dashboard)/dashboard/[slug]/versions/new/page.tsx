import React from 'react';
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

  if (!mod) {
    return <div className='w-full flex h-full justify-center items-center'>Mod not found</div>;
  }

  if (session?.user.id !== mod.ownerId) {
    return <div className='w-full flex h-full justify-center items-center'>Unauthorized</div>;
  }

  return (
    <div>
      <NewVersionCard modId={mod.id} modSlug={mod.slug} />
    </div>
  );
}

export default NewVersionPage;