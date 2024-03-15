import React from 'react';
import ModCard from './_components/mod-card';
import SearchFilter from './_components/search-filter';
import { getModsByQueryNameIncludeOwnerIncludeTagOnMod } from '@/server/data/mod';
import TagFilter from './_components/tag-filter';

export function generateMetadata() {
  return {
    title: "Search mods - modlands"
  };
}

interface Props {
  params: { slug: string };
  searchParams: Record<string, string | string[] | undefined>;
}

const MODS_PER_PAGE = 10;

const ModsPage = async ({ searchParams }: Props) => {
  const q = typeof searchParams.q === "string" ? searchParams.q : undefined;
  const page = typeof searchParams.p === "string" ? Number(searchParams.p) : 1;
  const categories = typeof searchParams.c === "string" ? [searchParams.c] : Array.isArray(searchParams.c) ? searchParams.c : [];
  const orderBy = typeof searchParams.o === "string" ? searchParams.o : "relevant";
  
  const mods = await getModsByQueryNameIncludeOwnerIncludeTagOnMod(MODS_PER_PAGE, q, orderBy);

  return (
    <div className='pt-16'>
      <div className='grid grid-cols-1 md:grid-cols-8 gap-6 h-full'>
        <div className='hidden md:flex flex-col rounded-2xl md:col-span-2 p-6 h-96 gap-4 bg-accent'>
          <TagFilter activeTags={categories} />
        </div>
        <div className='w-full h-full md:col-span-6 rounded-2xl flex flex-col gap-4'>
          <SearchFilter q={q} page={page} totalMods={mods.length} orderBy={orderBy ?? "relevant"}/>
          <div className='flex flex-col gap-4 pb-5'>
            {mods.length > 0 ? mods.map(m => {
              if (categories.length > 0) {
                if (m.tags.some(t => categories.includes(t.tag.name))) {
                  return <ModCard
                    key={m.id}
                    id={m.id}
                    slug={m.slug}
                    name={m.name}
                    ownerName={m.owner?.name ?? "Unknown"}
                    summary={m.summary}
                    downloads={m.downloads}
                    icon={m.icon}
                    updatedAt={m.updatedAt}
                  />
                }
                
                return null;
              }

              return <ModCard
                key={m.id}
                id={m.id}
                slug={m.slug}
                name={m.name}
                ownerName={m.owner?.name ?? "Unknown"}
                summary={m.summary}
                downloads={m.downloads}
                icon={m.icon}
                updatedAt={m.updatedAt}
              />
            }) : <div className='flex items-center justify-center'>no mods found</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModsPage;