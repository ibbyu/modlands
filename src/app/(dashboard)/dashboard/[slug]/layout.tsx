import React from 'react';
import ModMenu from './_components/mod-menu';

const DashboardModLayout = ({
  children,
  params
}: {
  children: React.ReactNode;
  params: { slug: string };
}) => {
  return (
    <>
      <div className="container max-w-7xl mx-auto pt-6 flex">
        <div className="space-y-6 p-10 pb-16 md:block w-full">
          <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
            <aside className="-mx-4 lg:w-1/6">
              <ModMenu slug={params.slug} />
            </aside>
            <div className="flex flex-col gap-4 w-full px-12">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardModLayout;