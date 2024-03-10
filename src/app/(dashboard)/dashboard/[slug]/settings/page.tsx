import React from 'react';
import { getServerAuthSession } from '@/server/auth';
import { getModBySlug, getModBySlugExternalResources } from '@/server/data/mod';
import UpdateIconCard from './_components/update-icon-card';
import UpdateModSummaryCard from './_components/update-mod-summary-card';
import UpdateExternalResourcesCard from './_components/update-external-resources-card';
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
  const mod = await getModBySlugExternalResources(params.slug);

  if (!session || session.user.id !== mod?.ownerId) {
    return <div>404 not found</div>
  }

  return (
    <>
      <h1 className='text-2xl'>Settings</h1>
      <UpdateIconCard modId={mod.id} icon={mod.icon} />
      <UpdateModSummaryCard modId={mod.id} summary={mod.summary} />
      <UpdateExternalResourcesCard
          modId={mod.id} modExternalResourcesId={mod.modExternalResources?.id} 
          issues={mod.modExternalResources?.issues}
          source={mod.modExternalResources?.source}
          wiki={mod.modExternalResources?.wiki}
          discord={mod.modExternalResources?.discord} 
        />
      <div className='flex flex-col gap-4 pt-6'>
        <DeleteModCard modId={mod.id} />
      </div>
    </>
  );
}

export default DashboardModSettingsPage;