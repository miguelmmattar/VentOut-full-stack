import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useSignUp() {
  const {
    loading: signUpLoading,
    error: signUpError,
    act: signUp,
  } = useAsync((name, email) => authApi.signUp(name, email), false);

  return {
    signUpLoading,
    signUpError,
    signUp,
  };
}
