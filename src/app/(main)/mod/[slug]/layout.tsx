import React from 'react';
import InfoCard from './_components/info-card';
import ExternalResourcesCard from './_components/external-resources-card';
import MembersCard from './_components/members-card';
import Navbar from './_components/navbar';
import { getModBySlugWithOwnerWithExternalResources } from '@/server/data/mod';

const ModLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  const mod = await getModBySlugWithOwnerWithExternalResources(params.slug);

  if (!mod?.owner) {
    return <div className='w-full flex h-full justify-center items-center'>Mod not found</div>;
  }
  
  return (
    <div className='grid grid-cols-1 lg:grid-cols-8 gap-6 pt-16 lg:grid-rows-1'>
      <div className='lg:col-span-2 flex flex-col gap-4'>
        <InfoCard
          modId={mod.id}
          icon={mod.icon}
          name={mod.name}
          summary={mod.summary}
          downloads={mod.downloads}
          createdAtTimeStamp={mod.createdAt.toLocaleDateString()}
          updatedAtTimeStamp={mod.updatedAt.toLocaleDateString()}
          approved={mod.approved}
          draft={mod.draft}
          slug={mod.slug}
        />
        <div className='row-start-3 flex flex-col gap-4'>
          <ExternalResourcesCard
            issues={mod.modExternalResources?.issues}
            source={mod.modExternalResources?.source}
            wiki={mod.modExternalResources?.wiki}
            discord={mod.modExternalResources?.discord}
          />
          <MembersCard name={mod.owner.name} avatar={mod.owner.image} />
        </div>
      </div>
      <div className='w-full lg:col-span-6 flex flex-col gap-4 lg:row-start-1'>
        <Navbar slug={mod.slug}/>
        {children}
      </div>
    </div>
  );
}

export default ModLayout;