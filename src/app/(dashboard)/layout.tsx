import React from 'react';
import DashboardNavbar from './dashboard/_components/dashboard-nav-bar';

const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <DashboardNavbar />
      <div>
        {children}
      </div>
    </>
  );
}

export default DashboardLayout;