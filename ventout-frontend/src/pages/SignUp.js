import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useState } from 'react';
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
import useSignUp from '../hooks/api/useSignUp';

export default function SignUp() {
  const { signUp } = useSignUp();
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [
    createUserWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useCreateUserWithEmailAndPassword(auth);

  async function handleSignUp(e) {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      toast("Passwords don't match");
      return;
    }

    try {
      await createUserWithEmailAndPassword(data.email, data.password);
      await signUp(data.name, data.email);

      toast('Registered successfully!');
      navigate('/');
    } catch {
      toast('Unable to coplete registration!');
      setData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      });
    }
  }

  if (error) {
    toast('Unable to coplete registration!');
  }

  return (
    <Auth>
      <div className="container">
        <img src={logo} alt="VentOut Logo" />
        <h2>SIGN UP</h2>
        <form onSubmit={handleSignUp}>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            minLength="3"
            maxLength="30"
            pattern="[a-zA-Z0-9 ]+"
            required
          />
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
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm password"
            value={data.confirmPassword}
            onChange={(e) => setData({ ...data, confirmPassword: e.target.value })}
            minLength="6"
            maxLength="20"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 3}$"
            required
          />
          <input
            type="submit"
            name="signUp"
            value="SIGN UP"
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

        <Link to="/">Have an account already? Login here!</Link>
      </div>
    </Auth>
  );
}
