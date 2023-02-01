import useAsync from '../useAsync';
import useToken from '../useToken';

import * as reportApi from '../../services/reportApi';

export default function useReport() {
  const token = useToken();

  const {
    loading: reportLoading,
    error: reportError,
    act: getReport,
  } = useAsync((data) => reportApi.loadReport(data, token), false);

  return {
    reportLoading,
    reportError,
    getReport,
  };
}
