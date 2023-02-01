export default function createTitle(location) {
  let title;

  if (location === '/dashboard/home') title = 'VentOut';
  if (location === '/dashboard/add/report') title = 'New Report';
  if (location === '/dashboard/history') title = 'History';
  if (location === '/dashboard/history/reports') title = 'My Reports';
  if (location === '/dashboard/history/moods') title = 'My Moods';
  if (location === '/dashboard/history/charts') title = 'My Charts';
  if (location.includes('/dashboard/history/reports/')) title = 'My Report';

  return title;
}
