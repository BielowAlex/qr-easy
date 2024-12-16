'use client';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

const SignInPage: React.FC = () => {
  const router = useRouter();
  const { status } = useSession();
  const handleLogin = async () => {
    await signIn('google');
  };

  React.useEffect(() => {
    console.log(status);

    if (status === 'authenticated') {
      router.push('/');
    }
  }, [router, status]);

  return (
    <div>
      <h2>
        Log in to your <br /> account
      </h2>
      <button onClick={handleLogin}>
        <FontAwesomeIcon icon={faGoogle} />
        <span>Sign-in</span>
      </button>
      <span>By clicking the button, you agree to the privacy policy.</span>
    </div>
  );
};

export default SignInPage;
