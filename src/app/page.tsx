import { options } from '@/app/api/auth/[...nextauth]/options';
import { getServerSession } from 'next-auth';
import Image from 'next/image';

export default async function HomePage() {
  const session = await getServerSession(options);

  console.log(session?.user);
  return (
    <div>
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
