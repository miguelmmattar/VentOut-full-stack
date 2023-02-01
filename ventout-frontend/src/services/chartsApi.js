import api from './api';

async function loadChartsData(filter, token) {
  const response = await api.get(`/data/filter?date=${filter.date}&param=${filter.param}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

const chartsApi = {
  loadChartsData,
};

export default chartsApi;
