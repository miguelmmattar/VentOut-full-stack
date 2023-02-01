import useAsync from '../useAsync';
import useToken from '../useToken';

import * as reportApi from '../../services/reportApi';

export default function useTodaysMood() {
  const token = useToken();

  const {
    data: initialData,
    loading: initialDataLoading,
    error: initialDataError,
    act: getInitialData,
  } = useAsync(() => reportApi.loadInitialData(token), false);

  return {
    initialData,
    initialDataLoading,
    initialDataError,
    getInitialData,
  };
}
