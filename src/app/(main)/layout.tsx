import React from 'react';
import Navbar from './_components/nav-bar';

const MainLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <Navbar />
      <div className="container max-w-7xl mx-auto">
        {children}
      </div>
    </>
  );
}

export default MainLayout;