import api from './api';

export async function signUp(name, email) {
  const response = await api.post('/auth/sign-up', { name, email });
  return response.data;
}

export async function signIn(email, token) {
  const response = await api.post('/auth/sign-in', { email, token });
  return response.data;
}

export async function signOut(userId) {
  const response = await api.delete(`/auth/sign-out/${userId}`);
  return response.data;
}
