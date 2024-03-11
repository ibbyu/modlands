import React from 'react';
import { getServerAuthSession } from '@/server/auth';
import { getModBySlug, getModBySlugWithVersions } from '@/server/data/mod';
import { VersionTable } from './_components/versions-table';
import { columns } from "./_components/columns";

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

const VersionsPage = async ({ params }: Props) => {
  const session = await getServerAuthSession();
  const mod = await getModBySlugWithVersions(params.slug);

  if (!session || session.user.id !== mod?.ownerId) {
    return <div>404 not found</div>
  }

  return (
    <div className='flex flex-col gap-4'>
      <VersionTable columns={columns} data={mod.versions} />
    </div>
  );
}

export default VersionsPage;