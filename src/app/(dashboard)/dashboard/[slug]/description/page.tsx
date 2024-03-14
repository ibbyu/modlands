import React from 'react';
import { notFound } from 'next/navigation';
import { getServerAuthSession } from '@/server/auth';
import { getModBySlug } from '@/server/data/mod';
import UpdateDescriptionForm from './_components/update-description-form';

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const mod = await getModBySlug(params.slug);

  return {
    title: `${mod?.name} - Description - modlands`
  };
}

const DescriptionPage = async ({ params }: Props) => {
  const session = await getServerAuthSession();
  const mod = await getModBySlug(params.slug);

  if (!session || session.user.id !== mod?.ownerId) {
    notFound();
  }

  return (
    <>
      <h1 className='text-2xl'>Description</h1>
      <div className='flex flex-col gap-4'>
        <UpdateDescriptionForm modId={mod.id} description={mod.description as string ?? undefined}/>
      </div>
    </>
  );
}

export default DescriptionPage;