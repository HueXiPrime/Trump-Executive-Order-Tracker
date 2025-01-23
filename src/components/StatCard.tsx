import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: number;
  icon: ReactNode;
}

export default function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 overflow-hidden shadow-lg rounded-2xl p-6 transition-shadow duration-300 hover:shadow-xl"
    >
      <dt className="flex items-center text-sm font-medium text-gray-500 dark:text-gray-400">
        {icon}
        <span className="ml-2">{title}</span>
      </dt>
      <dd className="mt-4 text-4xl font-extrabold text-blue-600 dark:text-blue-400">
        {value}
      </dd>
    </motion.div>
  );
}
