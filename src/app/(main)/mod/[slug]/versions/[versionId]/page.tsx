import React from 'react'
import { getVersionById } from '@/server/data/version';

interface Props {
  params: {
    versionId: string;
  }
}

const Version = async ({ params } : Props) => {
  const version = await getVersionById(params.versionId);

  return (
    <div>{version?.title}</div>
  );
}

export default Version;