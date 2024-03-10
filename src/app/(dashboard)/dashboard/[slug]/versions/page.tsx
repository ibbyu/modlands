import React from 'react';
import { getServerAuthSession } from '@/server/auth';
import { getModBySlug } from '@/server/data/mod';
import { VersionTable } from './_components/versions-table';
import { type Version, columns } from "./_components/columns";
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

async function getVersions(): Promise<Version[]> {
  return [
    {
      id: "1",
      title: "Auto Load Text Mods 1.0.0",
      published: new Date().toLocaleDateString(),
      size: "1 MB",
      type: "PythonSDK",
      downloads: 0,
    },
    {
      id: "2",
      title: "Auto Load Text Mods 0.1.0",
      published: new Date().toLocaleDateString(),
      size: "1 MB",
      type: "Text",
      downloads: 0,
    },
    {
      id: "3",
      title: "Auto Load Text Mods 0.0.1",
      published: new Date().toLocaleDateString(),
      size: "1 MB",
      type: "BLCMM",
      downloads: 0,
    }
  ];
}

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
  const mod = await getModBySlug(params.slug);

  if (!session || session.user.id !== mod?.ownerId) {
    return <div>404 not found</div>
  }

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex justify-end'>
        <Link href={`/dashboard/${mod.slug}/versions/new`} className={buttonVariants({ variant: "default" })}>New version</Link>
      </div>
      <VersionTable columns={columns} data={await getVersions()}/>
    </div>
  );
}

export default ModVersionsPages;