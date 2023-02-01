import { Outlet } from 'react-router-dom';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DashboardLayout from '../../layouts/Dashboard';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <Header />
      <Footer />
      <>
        <Outlet />
      </>
    </DashboardLayout>
  );
}
