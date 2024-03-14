import React from 'react';
import { notFound } from 'next/navigation';
import { getServerAuthSession } from '@/server/auth';
import { getModBySlug, getModBySlugWithVersions } from '@/server/data/mod';
import { VersionTable } from './_components/versions-table';
import { type Version, columns } from "./_components/columns";
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const mod = await getModBySlug(params.slug);

  return {
    title: `${mod?.name} - Versions - modlands`
  };
}

const ModVersionsPages = async ({ params }: Props) => {
  const session = await getServerAuthSession();
  const mod = await getModBySlugWithVersions(params.slug);

  if (!session || session.user.id !== mod?.ownerId) {
    notFound();
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-between'>
        <h1 className='text-2xl'>Versions</h1>
        <Link href={`/dashboard/${mod.slug}/versions/new`} className={buttonVariants({ variant: "default" })}>New version</Link>
      </div>
      <VersionTable columns={columns} data={mod.versions} />
    </div>
  );
}

export default ModVersionsPages;