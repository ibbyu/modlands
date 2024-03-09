import React from 'react';
import ModCard from '../../mods/_components/mod-card';
import UserInfoCard from './_components/user-info-card';
import { getUserByUsername, getUserByUsernameWithMods } from '@/server/data/user';

interface Props {
  params: {
    username: string
  }
}

export async function generateMetadata({ params }: Props) {
  const user = await getUserByUsername(params.username);

  return {
    title: user ? `${user.name} - Terraforge` : "Terraforge"
  };
}

const UserProfilePage = async ({ params }: Props) => {
  const user = await getUserByUsernameWithMods(params.username);

  if (!user) {
    return <div className='w-full flex h-full justify-center items-center'>User not found</div>;
  }

  return (
    <div className='grid grid-cols-1 lg:grid-cols-8 gap-6 pt-16 lg:grid-rows-1'>
      <div className='lg:col-span-2 flex flex-col gap-4'>
        <UserInfoCard
          name={user.name}
          image={user.image}
          createdAt={user.createdAt}
          totalDownloads={user.mods.reduce((acc, mod) => acc + mod.downloads, 0)}
        />
        <div className='row-start-3 flex flex-col gap-4'>
        </div>
      </div>
      <div className='w-full lg:col-span-6 flex flex-col gap-4 lg:row-start-1'>
        {user.mods.length > 0 ? user.mods.map(m => (<ModCard
          key={m.id}
          id={m.id}
          slug={m.slug}
          name={m.name}
          ownerName={user.name ?? "Unknown"}
          summary={m.summary}
          downloads={m.downloads}
          icon={m.icon}
          updatedAt={m.updatedAt}
        />)) : <div className='flex items-center justify-center'>no mods found</div>}
      </div>
    </div>
  );
}

export default UserProfilePage;