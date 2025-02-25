"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { Search, ChevronDown, ChevronUp, ArrowLeft } from "lucide-react";
import { EOStatus, type ExecutiveOrder } from "@/types/statusEnum";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";

function ExecutiveOrdersContent() {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<EOStatus | "ALL">(
    (searchParams.get("status") as EOStatus | "ALL") || "ALL"
  );
  const [sortColumn, setSortColumn] =
    useState<keyof ExecutiveOrder>("signedDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [executiveOrders, setExecutiveOrders] = useState<ExecutiveOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/HueXiPrime/executive-orders-data/refs/heads/main/executive-orders.json"
    )
      .then((res) => res.json())
      .then((data) => {
        setExecutiveOrders(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const filteredAndSortedEOs = useMemo(() => {
    return executiveOrders
      .filter((eo: ExecutiveOrder) => {
        const matchesSearch =
          eo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          eo.summary.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus =
          selectedStatus === "ALL" || eo.status === selectedStatus;
        return matchesSearch && matchesStatus;
      })
      .sort((a: ExecutiveOrder, b: ExecutiveOrder) => {
        if (a[sortColumn] < b[sortColumn])
          return sortDirection === "asc" ? -1 : 1;
        if (a[sortColumn] > b[sortColumn])
          return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
  }, [searchTerm, selectedStatus, sortColumn, sortDirection, executiveOrders]);

  const handleSort = (column: keyof ExecutiveOrder) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const renderSortIcon = (column: keyof ExecutiveOrder) => {
    if (sortColumn !== column) return null;
    return sortDirection === "asc" ? (
      <ChevronUp className="inline w-4 h-4" />
    ) : (
      <ChevronDown className="inline w-4 h-4" />
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-4 mb-8"
        >
          <Link
            href="/"
            className="inline-flex items-center text-primary hover:text-primary-hover transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-foreground text-center">
            Executive Orders Tracker
          </h1>
        </motion.div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 mb-8"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search executive orders..."
              className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-150 ease-in-out"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-2 rounded-md border border-gray-700 bg-gray-800 text-white focus:ring-2 focus:ring-gray-400 focus:border-transparent transition duration-150 ease-in-out"
            value={selectedStatus}
            onChange={(e) =>
              setSelectedStatus(e.target.value as EOStatus | "ALL")
            }
          >
            <option value="ALL">All Statuses</option>
            {Object.values(EOStatus).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="overflow-x-auto bg-gray-800 rounded-lg shadow-sm border border-gray-700"
        >
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition duration-150 ease-in-out"
                  onClick={() => handleSort("name")}
                >
                  Title {renderSortIcon("name")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition duration-150 ease-in-out"
                  onClick={() => handleSort("status")}
                >
                  Status {renderSortIcon("status")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition duration-150 ease-in-out"
                  onClick={() => handleSort("signedDate")}
                >
                  Date Issued {renderSortIcon("signedDate")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hover:bg-gray-700 transition duration-150 ease-in-out"
                  onClick={() => handleSort("forecastImpact")}
                >
                  Impact {renderSortIcon("forecastImpact")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredAndSortedEOs.map((eo: ExecutiveOrder) => (
                <tr
                  key={eo.id}
                  className="hover:bg-gray-700 transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/executive-orders/${eo.id}`}
                      className="text-white hover:text-gray-300 font-medium"
                    >
                      {eo.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1.5 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        eo.status
                      )}`}
                    >
                      {eo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {new Date(eo.signedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    <div className="flex items-center gap-3">
                      <span className="min-w-[1rem] text-center">
                        {eo.forecastImpact}
                      </span>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-3 w-8 mr-1 rounded ${
                              i < eo.forecastImpact
                                ? "bg-blue-500"
                                : "bg-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </main>
    </div>
  );
}

export default function ExecutiveOrders() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
          <div className="text-xl">Loading...</div>
        </div>
      }
    >
      <ExecutiveOrdersContent />
    </Suspense>
  );
}

function getStatusColor(status: EOStatus): string {
  switch (status) {
    case EOStatus.ACTIVE:
      return "bg-green-800/30 text-green-400";
    case EOStatus.IN_PROGRESS:
      return "bg-yellow-800/30 text-yellow-400";
    case EOStatus.BLOCKED:
    case EOStatus.PARTIALLY_BLOCKED:
      return "bg-red-800/30 text-red-400";
    case EOStatus.RESCINDED:
      return "bg-gray-800/30 text-gray-400";
    case EOStatus.AWAITING_REVIEW:
      return "bg-purple-800/30 text-purple-400";
    case EOStatus.UNCLEAR:
      return "bg-orange-800/30 text-orange-400";
    case EOStatus.COMPLETE:
      return "bg-blue-800/30 text-blue-400";
    default:
      return "bg-gray-800/30 text-gray-400";
  }
}
