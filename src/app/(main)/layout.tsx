import React from 'react';
import Navbar from './_components/navbar';

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