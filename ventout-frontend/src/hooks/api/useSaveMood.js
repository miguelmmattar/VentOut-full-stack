import useAsync from '../useAsync';
import useToken from '../useToken';

import * as moodApi from '../../services/moodApi';

export default function useSaveMood() {
  const token = useToken();

  const {
    loading: saveMoodLoading,
    error: saveMoodError,
    act: saveMood,
  } = useAsync((data) => moodApi.upsertMood(data, token), false);

  return {
    saveMoodLoading,
    saveMoodError,
    saveMood,
  };
}
