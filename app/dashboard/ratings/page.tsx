import DashboardLayout from '@/components/DashboardLayout';

export default function RatingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-neutral-900">All Ratings</h1>
        <p className="text-neutral-600 mb-6">View and analyze all ratings submitted by customers.</p>
        {/* Ratings table or list will go here */}
        <div className="bg-white border border-neutral-200 rounded-lg p-6 text-center text-neutral-400">
          Ratings data will be displayed here.
        </div>
      </div>
    </DashboardLayout>
  );
}
