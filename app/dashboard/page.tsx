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

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-neutral-50 to-white">
      {/* Navigation and layout handled by DashboardLayout */}
      <DashboardLayout>
        <div className="container-custom py-8">
          <div className="glass p-responsive rounded-xl shadow-lg">
            {renderDashboard()}
          </div>
        </div>
      </DashboardLayout>
      {/* Footer for consistency */}
      <footer className="bg-neutral-900 text-white py-8 mt-16">
        <div className="container-custom text-center">
          <img src="/logo.png" alt="Frontline Rating" className="h-8 w-6 mx-auto mb-2" />
          <p className="text-neutral-400">&copy; {new Date().getFullYear()} Frontline Rating System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}