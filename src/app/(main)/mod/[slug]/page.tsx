import React from 'react'

import Tiptap from '@/components/tiptap';
import { getModBySlug } from '@/server/data/mod';

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
  const mod = await getModBySlug(params.slug);

  if (!mod) {
    return <div className='w-full flex h-full justify-center items-center'>Mod not found</div>;
  }

  return <Tiptap defaultValue={mod.description as string ?? undefined} placeholder="No description" />
}

export default ModPage;