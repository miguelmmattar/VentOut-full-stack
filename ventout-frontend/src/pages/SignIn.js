import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { BsGoogle } from 'react-icons/bs';
import { FiGithub } from 'react-icons/fi';
import { ImFacebook } from 'react-icons/im';

import auth from '../services/firebaseConfig';
import Auth, { Divider, Line, OAuthWrapper } from '../layouts/Auth';

import logo from '../assets/images/ventout-logo.png';
import OAuth from '../components/Auth/OAuth';
import { facebookAuth, githubAuth, googleAuth } from '../utils/authUtils';
import useSignIn from '../hooks/api/useSignIn';
import UserContext from '../contexts/UserContext';

export default function SignIn() {
  const { signIn } = useSignIn();
  const navigate = useNavigate();
  const { setUserData } = useContext(UserContext);
  const [data, setData] = useState({
    email: '',
    password: '',
  });
  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  async function handleSignUp(e) {
    e.preventDefault();
    let session;

    try {
      await signInWithEmailAndPassword(data.email, data.password);

      if (user) {
        session = await signIn(data.email, user.user.accessToken);

        setUserData(session);
      } else {
        toast('Unable to login!');
        return;
      }

      navigate('/dashboard/home');
    } catch {
      if (error) {
        console.log(error);
      }
      toast('Unable to login!');
      setData({
        email: '',
        password: '',
      });
    }
  }

  return (
    <Auth>
      <div className="container">
        <img src={logo} alt="VentOut Logo" />
        <h2>LOGIN</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="E-Mail"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            required
          />
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            minLength="6"
            maxLength="20"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 3}$"
            required
          />
          <input
            type="submit"
            name="login"
            value="LOGIN"
            disabled={loading}
          />
        </form>

        <Divider>
          <Line />
          <h5>OR</h5>
          <Line />
        </Divider>

        <OAuthWrapper>
          <OAuth name={googleAuth.name} color={googleAuth.color}>
            <BsGoogle color={googleAuth.color} />
          </OAuth>

          <OAuth name={githubAuth.name} color={githubAuth.color}>
            <FiGithub color={githubAuth.color} />
          </OAuth>

          <OAuth name={facebookAuth.name} color={facebookAuth.color}>
            <ImFacebook color={facebookAuth.color} />
          </OAuth>
        </OAuthWrapper>

        <Link to="/sign-up">Not registered yet? Sign up here!</Link>
      </div>
    </Auth>
  );
}
