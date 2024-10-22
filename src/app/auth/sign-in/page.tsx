import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

const SignInPage: React.FC = () => {
  return (
    <div>
      <button>
        <FontAwesomeIcon icon={faGoogle} />
        <span>SignIn</span>
      </button>
    </div>
  );
};

export default SignInPage;
