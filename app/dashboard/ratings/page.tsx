import DashboardLayout from '@/components/DashboardLayout';

export default function RatingsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-neutral-50 to-white">
      <DashboardLayout>
        <div className="container-custom py-8">
          <div className="glass p-responsive rounded-xl shadow-lg">
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-neutral-900">All Ratings</h1>
              <p className="text-neutral-600 mb-6">View and analyze all ratings submitted by customers.</p>
              {/* Ratings table or list will go here */}
              <div className="bg-white border border-neutral-200 rounded-lg p-6 text-center text-neutral-400">
                Ratings data will be displayed here.
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
      <footer className="bg-neutral-900 text-white py-8 mt-16">
        <div className="container-custom text-center">
          <img src="/logo.png" alt="Frontline Rating" className="h-8 w-6 mx-auto mb-2" />
          <p className="text-neutral-400">&copy; {new Date().getFullYear()} Frontline Rating System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
