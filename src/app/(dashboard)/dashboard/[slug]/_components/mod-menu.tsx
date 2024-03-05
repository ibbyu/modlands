"use client"
import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  SettingsIcon,
  HomeIcon,
  TextIcon,
  FileStackIcon
} from 'lucide-react';

interface Props {
  slug: string;
}

const ModMenu = ({ slug }: Props) => {
  const pathname = usePathname();
  return (
    <div className='flex flex-col gap-4'>
      <nav className={cn("flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-2")}>
        <NavLink href={`/dashboard/${slug}`} pathname={pathname}>
          <div className='flex gap-2 items-center'>
            <HomeIcon className='text-foreground' size={18} />
            <span>Overview</span>
          </div>
        </NavLink>
        <NavLink href={`/dashboard/${slug}/description`} pathname={pathname}>
          <div className='flex gap-2 items-center'>
            <TextIcon className='text-foreground' size={18} />
            <span>Description</span>
          </div>
        </NavLink>
        <NavLink href={`/dashboard/${slug}/versions`} pathname={pathname}>
          <div className='flex gap-2 items-center'>
            <FileStackIcon className='text-foreground' size={18} />
            <span>Versions</span>
          </div>
        </NavLink>
        <NavLink href={`/dashboard/${slug}/settings`} pathname={pathname}>
          <div className='flex gap-2 items-center'>
            <SettingsIcon className='text-foreground' size={18} />
            <span>Settings</span>
          </div>
        </NavLink>
      </nav>
    </div>
  );
}
interface LinkProps {
  pathname: string;
  href: string;
  children: React.ReactNode;
}

const NavLink = ({ pathname, href, children }: LinkProps) => {
  return <Link href={href} className={cn(buttonVariants({ variant: "ghost" }),
    pathname === href
      ? "bg-muted hover:bg-muted"
      : "hover:bg-muted", "justify-start")}>{children}</Link>
}

export default ModMenu;