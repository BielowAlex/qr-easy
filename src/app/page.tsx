'use client';
import { Header } from '@/feature/Header';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

export default function HomePage() {
  const { data: session } = useSession();

  return (
    <div>
      <Header />
      <h1>Welcome, {session?.user?.name}</h1>
      <p>Email: {session?.user?.email}</p>
      <Image
        width={150}
        height={150}
        src={session?.user?.image || '/default-avatar.png'}
        alt="Avatar"
      />
    </div>
  );
}
