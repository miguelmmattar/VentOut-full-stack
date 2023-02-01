import useAsync from '../useAsync';
import useToken from '../useToken';

import * as moodApi from '../../services/moodApi';

export default function useTodaysMood() {
  const token = useToken();

  const {
    data: todaysMood,
    loading: todaysMoodLoading,
    error: todaysMoodError,
    act: getTodaysMood,
  } = useAsync((data) => moodApi.loadTodaysMood(data, token), false);

  return {
    todaysMood,
    todaysMoodLoading,
    todaysMoodError,
    getTodaysMood,
  };
}
