import { useContext, useEffect, useState } from 'react';
import { AdminContext } from '../../context/AdminContext';

const Metrics = () => {
  const { getMetricsData, metrics } = useContext(AdminContext);
  const [todaysVisitCount, setTodaysVisitCount] = useState(0);

  useEffect(() => {
    getMetricsData();
  }, []);

  useEffect(() => {
    if (metrics?.recentVisits?.length) {
      const today = new Date().toDateString();
      const todayVisits = metrics.recentVisits.filter(
        (entry) => new Date(entry.visitedAt).toDateString() === today
      ).length;
      setTodaysVisitCount(todayVisits);
    }
  }, [metrics]);

  if (!metrics) {
    return <p className="p-6 text-lg text-gray-600">Loading analytics...</p>;
  }

  const { totalVisitors = 0, uniqueVisitors = 0, recentVisits = [] } = metrics;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Analytics Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <OverviewCard title="Total Visitors" value={totalVisitors} />
        <OverviewCard title="Unique Visitors" value={uniqueVisitors} />
        <OverviewCard title="Today’s Visits" value={todaysVisitCount} />
        <OverviewCard title="Top Region (WIP)" value="N/A" />
      </div>

      {/* Visitor Table */}
      <RecentVisitorsTable recentVisits={recentVisits} />
    </div>
  );
};

const OverviewCard = ({ title, value }) => (
  <div className="bg-white shadow-md rounded-2xl p-5 text-center border border-gray-200 transition hover:shadow-lg">
    <h2 className="text-sm font-medium text-gray-500 mb-2">{title}</h2>
    <p className="text-2xl font-bold text-indigo-600">{value}</p>
  </div>
);

const RecentVisitorsTable = ({ recentVisits }) => {
  if (!Array.isArray(recentVisits) || recentVisits.length === 0) {
    return (
      <div className="text-gray-500 mt-6">No visitor data available.</div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Visitors</h2>
      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">IP Address</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">Time</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {recentVisits.map((visitor, index) => {
              const { ip, visitedAt } = visitor;
              const date = new Date(visitedAt);
              return (
                <tr key={index}>
                  <td className="px-6 py-4 text-sm text-gray-700">{ip || 'Unknown'}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{date.toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{date.toLocaleTimeString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Metrics;
