import React from 'react'

import InfoCard from './_components/info-card';
import Navbar from './_components/navbar';
import MembersCard from './_components/members-card';
/* import ExternalResourcesCard from './_components/external-resources-card'; */
import Tiptap from '@/components/tiptap';
import { getModBySlug, getModBySlugWithOwner } from '@/server/data/mod';

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props) {
  const mod = await getModBySlug(params.slug);
  
  return {
    title: `${mod?.name} - modlands`
  };
}

const ModPage = async ({ params }: Props) => {
  const mod = await getModBySlugWithOwner(params.slug);

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
          {/* <ExternalResources
            issues={mod.externalResources?.issues}
            source={mod.externalResources?.source}
            wiki={mod.externalResources?.wiki}
            discord={mod.externalResources?.discord}
          /> */}
          <MembersCard name={mod.owner.name} avatar={mod.owner.image} />
        </div>
      </div>
      <div className='w-full lg:col-span-6 flex flex-col gap-4 lg:row-start-1'>
        <Navbar slug={mod.slug}/>
        <Tiptap defaultValue={mod.description as string ?? undefined} placeholder="No description" />
      </div>
    </div>
  );
}

export default ModPage;