import useAsync from '../useAsync';
import useToken from '../useToken';

import * as moodApi from '../../services/moodApi';

export default function useMoods() {
  const token = useToken();

  const {
    data: moods,
    loading: moodsLoading,
    error: moodsError,
    act: getMoods,
  } = useAsync((data) => moodApi.loadUserMoods(data, token), false);

  return {
    moods,
    moodsLoading,
    moodsError,
    getMoods,
  };
}
