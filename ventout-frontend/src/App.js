import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/dashboard';

import Home from './pages/dashboard/Home';
import AddReport from './pages/dashboard/AddReport';
import History from './pages/dashboard/History';
import Reports from './pages/dashboard/Reports';
import Moods from './pages/dashboard/Moods';
import Charts from './pages/dashboard/Charts';
import MyReport from './pages/dashboard/MyReport';

import { UserProvider } from './contexts/UserContext';

import useToken from './hooks/useToken';

function App() {
  return (
    <>
      <ToastContainer />
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />

            <Route
              path="/dashboard"
              element={(
                <ProtectedRouteGuard>
                  <Dashboard />
                </ProtectedRouteGuard>
                  )}
            >
              <Route path="home" element={<Home />} />
              <Route path="add/report" element={<AddReport />} />
              <Route path="history" element={<History />} />
              <Route path="history/reports" element={<Reports />} />
              <Route path="history/reports/:reportId" element={<MyReport />} />
              <Route path="history/moods" element={<Moods />} />
              <Route path="history/charts" element={<Charts />} />
              <Route index path="*" element={<Navigate to="/dashboard/home" />} />
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

function ProtectedRouteGuard({ children }) {
  const token = useToken();

  if (!token) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {children}
    </>
  );
}

export default App;
