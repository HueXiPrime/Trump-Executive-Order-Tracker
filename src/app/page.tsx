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
import executiveOrders from "@/data/executive-orders.json";
import StatCard from "@/components/StatCard";

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <main className="max-w-5xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl md:text-7xl">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Trump Executive Orders Tracker
            </span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300 sm:mx-auto sm:max-w-2xl">
            A community-driven effort to track the status, implementation, and
            legal challenges of Trump's Executive Orders.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="grid grid-cols-2 gap-6 sm:grid-cols-4 mb-16"
        >
          <StatCard title="Total EOs" value={totalEOs} icon={<FileText />} />
          <StatCard title="Blocked" value={blockedByLawsuit} icon={<Scale />} />
          <StatCard
            title="In Progress"
            value={inProgress}
            icon={<BarChart2 />}
          />
          <StatCard title="Unclear" value={unclear} icon={<AlertTriangle />} />
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
            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300"
          >
            View All Executive Orders
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
          <Link
            href="/contribute"
            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-blue-600 bg-white rounded-full hover:bg-gray-100 transition-colors duration-300 border-2 border-blue-600"
          >
            How to Contribute
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
