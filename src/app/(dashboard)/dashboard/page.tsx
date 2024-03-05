import Link from 'next/link';
import { getServerAuthSession } from '@/server/auth';
import React from 'react';
import ModCard from './_components/mod-card';
import { buttonVariants } from '@/components/ui/button';
import { getUserByUsernameIncludeMods } from '@/server/data/user';
import { redirect } from 'next/navigation';

const Dashboard = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/login");
  }

  const user = await getUserByUsernameIncludeMods(session.user.name);

  return (
    <div className="container max-w-7xl mx-auto">
      <div className='flex flex-col items-center pt-16'>
        <div className='w-full py-4 flex items-center justify-between'>
          <h1 className='text-4xl font-bold'>Mods</h1>
          <Link href="/dashboard/new" className={buttonVariants({ variant: "default" })}>
            Create a new mod
          </Link>
        </div>
        <div className='w-full grid grid-cols-1 sm:grid-cols-3 gap-4'>
          {user?.mods.map((mod) => (
            <Link href={`/dashboard/${mod.slug}`} key={mod.id}>
              <ModCard
                name={mod.name}
                icon={mod.icon}
                summary={mod.summary}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;