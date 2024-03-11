"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface Props {
  slug: string;
}

const Navbar = ({ slug } : Props) => {
  const pathname = usePathname();
  const DESCRIPTION_PATH = `/mod/${slug}`;
  const RELEASES_PATH = `/mod/${slug}/versions`;
  const GALLERY_PATH = `/mod/${slug}/gallery`;
  
  return (
    <div className='flex gap-2'>
      <Link href={DESCRIPTION_PATH} className={cn(buttonVariants({ variant: "link" }), pathname === DESCRIPTION_PATH ? "underline" : "")}>Description</Link>
      <Link href={GALLERY_PATH} className={cn(buttonVariants({ variant: "link" }), pathname === GALLERY_PATH ? "underline" : "")}>Gallery</Link>
      <Link href={RELEASES_PATH} className={cn(buttonVariants({ variant: "link" }), pathname === RELEASES_PATH ? "underline" : "")}>Versions</Link>
    </div>
  );
}

export default Navbar;