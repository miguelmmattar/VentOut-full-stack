import api from './api';

export async function loadTodaysMood(filter, token) {
  const response = await api.get(`/moods/today?filterDate=${filter.date}&filterParam=${filter.param}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function upsertMood(body, token) {
  const response = await api.post('/moods', body, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}

export async function loadUserMoods(offset, token) {
  const response = await api.get(`/moods/history?offset=${offset}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
}
