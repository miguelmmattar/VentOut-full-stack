import useAsync from '../useAsync';

import * as authApi from '../../services/authApi';

export default function useSignOut() {
  const {
    loading: signOutLoading,
    error: signOutError,
    act: signOut,
  } = useAsync((userId) => authApi.signOut(userId), false);

  return {
    signOutLoading,
    signOutError,
    signOut,
  };
}
