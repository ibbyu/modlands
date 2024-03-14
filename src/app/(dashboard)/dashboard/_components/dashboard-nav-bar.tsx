import React from 'react';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerAuthSession } from '@/server/auth';
import NavAvatar from '@/components/nav-avatar';
import Avatar from '@/components/avatar';

const DashboardNavbar = async () => {
  const session = await getServerAuthSession();

  if (!session) {
    redirect("/sign-in");
  }

  return (
    <header className="sticky top-0 inset-x-0 light:bg-gray-100/60 backdrop-blur-md z-10 py-4">
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        <div className='flex items-center text-xl gap-4'>
          <Link href="/">
            <span className="font-extrabold text-foreground">modlands</span>
          </Link>
          <span className='text-muted-foreground'>/</span>
          <Link href="/dashboard" className='flex items-center text-xl gap-4'>
            <Avatar avatar={session?.user.image} fallback={session.user.name[0]!} className='w-6 h-6'/>
            <span className='text-[16px]'>{session?.user.name}</span>
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-8">
          <div className='flex gap-10'>
            <NavAvatar avatar={session?.user.image} username={session?.user.name} />
          </div>
        </div>
      </div>
    </header>
  );
}

export default DashboardNavbar;