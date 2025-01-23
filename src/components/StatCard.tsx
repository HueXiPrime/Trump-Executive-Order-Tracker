import type { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-gray-900 p-6 rounded-lg shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-gray-400">{icon}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
      <div className="mt-2 text-sm font-medium text-gray-400">{title}</div>
    </div>
  );
}
