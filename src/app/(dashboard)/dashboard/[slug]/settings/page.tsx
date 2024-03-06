import React from 'react';
import { getServerAuthSession } from '@/server/auth';
import { getModBySlug } from '@/server/data/mod';
import DeleteModCard from './_components/delete-mod-card';

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const mod = await getModBySlug(params.slug);

  return {
    title: `${mod?.name} - Settings - modlands`
  };
}

const DashboardModSettingsPage = async ({ params }: Props) => {
  const session = await getServerAuthSession();
  const mod = await getModBySlug(params.slug);

  if (!session || session.user.id !== mod?.ownerId) {
    return <div>404 not found</div>
  }

  return (
    <>
      <h1 className='text-2xl'>Settings</h1>
      <div className='flex flex-col gap-4 pt-6'>
        <DeleteModCard modId={mod.id} />
      </div>
    </>
  );
}

export default DashboardModSettingsPage;