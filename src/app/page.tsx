"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart2,
  FileText,
  Scale,
  AlertTriangle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { EOStatus } from "@/types/statusEnum";
import StatCard from "@/components/StatCard";

export default function Home() {
  const [stats, setStats] = useState({
    totalEOs: 0,
    blockedByLawsuit: 0,
    inProgress: 0,
    unclear: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/HueXiPrime/executive-orders-data/refs/heads/main/executive-orders.json"
    )
      .then((res) => res.json())
      .then((executiveOrders) => {
        setStats({
          totalEOs: executiveOrders.length,
          blockedByLawsuit: executiveOrders.filter(
            (eo: any) => eo.status === "Blocked by lawsuit"
          ).length,
          inProgress: executiveOrders.filter(
            (eo: any) => eo.status === "Implementation in progress"
          ).length,
          unclear: executiveOrders.filter(
            (eo: any) => eo.status === "Unclear / Hard to implement"
          ).length,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <main className="max-w-5xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Trump Executive Orders Tracker
          </h1>
          <p className="mt-6 text-lg text-gray-300 sm:mx-auto sm:max-w-2xl">
            A community-driven effort to track the status, implementation, and
            legal challenges of Trump&apos;s Executive Orders.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-6 sm:grid-cols-4 mb-16"
        >
          <StatCard
            title="Total EOs"
            value={stats.totalEOs}
            icon={<FileText />}
            status="ALL"
          />
          <StatCard
            title="Blocked"
            value={stats.blockedByLawsuit}
            icon={<Scale />}
            status={EOStatus.BLOCKED}
          />
          <StatCard
            title="In Progress"
            value={stats.inProgress}
            icon={<BarChart2 />}
            status={EOStatus.IN_PROGRESS}
          />
          <StatCard
            title="Unclear"
            value={stats.unclear}
            icon={<AlertTriangle />}
            status={EOStatus.UNCLEAR}
          />
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          <Link
            href="/executive-orders"
            className="group inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-black bg-white rounded-md hover:bg-gray-100 transition-colors duration-300"
          >
            View All Executive Orders
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            href="/contribute"
            className="group inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-gray-900 rounded-md hover:bg-gray-800 transition-colors duration-300 border border-gray-600"
          >
            How to Contribute
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
