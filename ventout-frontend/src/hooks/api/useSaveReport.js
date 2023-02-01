import useAsync from '../useAsync';
import useToken from '../useToken';

import * as reportApi from '../../services/reportApi';

export default function useSaveReport() {
  const token = useToken();

  const {
    loading: saveReportLoading,
    error: saveReportError,
    act: saveReport,
  } = useAsync((data) => reportApi.postReport(data, token), false);

  return {
    saveReportLoading,
    saveReportError,
    saveReport,
  };
}
