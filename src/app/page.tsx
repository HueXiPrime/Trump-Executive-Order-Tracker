import Link from "next/link";
import executiveOrders from "@/data/executive-orders.json";

export default function Home() {
  // Calculate statistics
  const totalEOs = executiveOrders.length;
  const blockedByLawsuit = executiveOrders.filter(
    (eo) => eo.status === "Blocked by lawsuit"
  ).length;
  const inProgress = executiveOrders.filter(
    (eo) => eo.status === "Implementation in progress"
  ).length;
  const active = executiveOrders.filter((eo) => eo.status === "Active").length;
  const unclear = executiveOrders.filter(
    (eo) => eo.status === "Unclear / Hard to implement"
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <main className="max-w-4xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            Trump Executive Orders Tracker
          </h1>
          <p className="mt-3 text-base text-gray-500 dark:text-gray-400 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl">
            A community-driven effort to track the status, implementation, and
            legal challenges of Trump's Executive Orders.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-12">
          <StatCard title="Total EOs" value={totalEOs} />
          <StatCard title="Blocked" value={blockedByLawsuit} />
          <StatCard title="In Progress" value={inProgress} />
          <StatCard title="Active" value={active} />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/executive-orders"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            View All Executive Orders
          </Link>
          <Link
            href="/contribute"
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            How to Contribute
          </Link>
        </div>
      </main>
    </div>
  );
}

// Stat Card Component
function StatCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg p-6">
      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
        {title}
      </dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900 dark:text-white">
        {value}
      </dd>
    </div>
  );
}
