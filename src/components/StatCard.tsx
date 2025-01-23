import type { ReactNode } from "react";
import Link from "next/link";
import { EOStatus } from "@/types/statusEnum";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  status?: EOStatus | "ALL";
}

export default function StatCard({
  title,
  value,
  icon,
  status = "ALL",
}: StatCardProps) {
  return (
    <Link
      href={`/executive-orders?status=${status}`}
      className="block bg-gray-900 p-6 rounded-lg shadow-sm hover:bg-gray-800 transition-colors duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="text-gray-400">{icon}</div>
        <div className="text-2xl font-bold text-white">{value}</div>
      </div>
      <div className="mt-2 text-sm font-medium text-gray-400">{title}</div>
    </Link>
  );
}
