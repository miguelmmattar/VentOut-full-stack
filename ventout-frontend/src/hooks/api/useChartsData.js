import useAsync from '../useAsync';
import useToken from '../useToken';

import chartsApi from '../../services/chartsApi';

export default function useChartsData() {
  const token = useToken();

  const {
    data: chartsData,
    loading: chartsDataLoading,
    error: chartsDataError,
    act: getChartsData,
  } = useAsync((data) => chartsApi.loadChartsData(data, token), false);

  return {
    chartsData,
    chartsDataLoading,
    chartsDataError,
    getChartsData,
  };
}
