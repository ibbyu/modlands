"use client"
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import NavAvatar from "@/components/nav-avatar";
import ToggleTheme from '@/components/toggle-theme';

const Navbar = () => {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 inset-x-0 light:bg-gray-100/60 backdrop-blur-md shadow-md z-10 py-4">
      <div className='container max-w-7xl h-full mx-auto flex items-center justify-between gap-2'>
        <div className='flex items-center text-xl gap-8'>
          <Link href="/">
            <span className="font-extrabold text-foreground">modlands</span>
          </Link>
          <Link href="/mods" >
            <span className={cn("font-semibold text-lg text-muted-foreground underline-offset-4 hover:underline hover:text-foreground", pathname === "/mods" ? "underline text-foreground" : "")}>Mods</span>
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-8">
          {status === "authenticated" ?
            <div className='flex gap-10'>
              <NavAvatar avatar={session.user.image} username={session.user.name} />
            </div> :
            <div className='flex gap-4'>
              <Link href="/sign-in" className={buttonVariants({ variant: "outline" })}>Sign in</Link>
            </div>}
        </div>
      </div>
    </header>
  );
}

export default Navbar;