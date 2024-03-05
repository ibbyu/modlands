import React from 'react';
import CreateModCard from './_components/create-mod-card';

const NewModPage = () => {
  return (
    <div className='flex items-center justify-center pt-32'>
      <div className='w-[450px]'>
        <CreateModCard />
      </div>
    </div>
  );
}

export default NewModPage;