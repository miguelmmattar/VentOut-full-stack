import {
  GithubAuthProvider, GoogleAuthProvider, FacebookAuthProvider, signInWithPopup,
} from 'firebase/auth';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import auth from '../../services/firebaseConfig';
import { googleAuth, githubAuth, facebookAuth } from '../../utils/authUtils';
import useSignIn from '../../hooks/api/useSignIn';
import useSignUp from '../../hooks/api/useSignUp';

import UserContext from '../../contexts/UserContext';
import { LogoWrapper } from '../../layouts/Auth';

export default function OAuth({ children, name, color }) {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { setUserData } = useContext(UserContext);
  const navigate = useNavigate();
  let result;

  async function handleOAuthSignIn() {
    let provider;
    let userData;

    if (name === googleAuth.name) {
      provider = new GoogleAuthProvider();
    }

    if (name === githubAuth.name) {
      provider = new GithubAuthProvider();
    }

    if (name === facebookAuth.name) {
      provider = new FacebookAuthProvider();
    }

    try {
      result = await signInWithPopup(auth, provider);
    } catch (error) {
      toast('E-mail already used for different account!');
      return;
    }

    const { email, accessToken, displayName } = result.user;

    try {
      userData = await signIn(email, accessToken);

      setUserData(userData);
      navigate('/dashboard/home');
    } catch {
      try {
        await signUp(displayName, email);
        userData = await signIn(email, accessToken);

        setUserData(userData);
        navigate('/dashboard');
      } catch {
        toast('Não foi possível fazer o login!');
      }
    }
  }

  return (
    <div onClick={handleOAuthSignIn}>
      <LogoWrapper color={color}>{children}</LogoWrapper>
    </div>
  );
}
