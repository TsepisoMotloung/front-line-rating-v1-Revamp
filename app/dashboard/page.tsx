import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import DashboardLayout from '@/components/DashboardLayout';
import AdminDashboard from '@/components/dashboards/AdminDashboard';
import HODDashboard from '@/components/dashboards/HODDashboard';
import AgentDashboard from '@/components/dashboards/AgentDashboard';

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/login');
  }

  const renderDashboard = () => {
    switch (session.user.role) {
      case 'ADMIN':
        return <AdminDashboard />;
      case 'HOD':
        return <HODDashboard />;
      case 'AGENT':
        return <AgentDashboard />;
      default:
        return <div>Invalid role</div>;
    }
  };

  return <DashboardLayout>{renderDashboard()}</DashboardLayout>;
}