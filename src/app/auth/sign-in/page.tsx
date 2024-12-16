'use client';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

import style from './style.module.scss';

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
  }, [status]);

  return (
    <div className={style.container}>
      <h2 className={style.title}>
        Log in to your <br /> account
      </h2>
      <button className={style.button} onClick={handleLogin}>
        <FontAwesomeIcon icon={faGoogle} className={style.icon} />
        <span>Sign-in</span>
      </button>
      <span className={style.warn}>
        By clicking the button, you agree to the privacy policy.
      </span>
    </div>
  );
};

export default SignInPage;
