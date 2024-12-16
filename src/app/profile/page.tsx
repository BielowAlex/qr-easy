'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';

const Page: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      <h1>Welcome, {session?.user?.name}</h1>
      <p>Email: {session?.user?.email}</p>
      <Image
        width={150}
        height={150}
        src={session?.user?.image || '/default-avatar.png'}
        alt="Avatar"
      />
    </>
  );
};

export default Page;
