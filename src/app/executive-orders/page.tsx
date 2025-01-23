"use client";

import { useState, useMemo } from "react";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import executiveOrders from "@/data/executive-orders.json";
import { EOStatus, type ExecutiveOrder } from "@/types/statusEnum";
import Link from "next/link";

// Cast the JSON data to match the ExecutiveOrder type
const typedExecutiveOrders = executiveOrders as unknown as ExecutiveOrder[];

export default function ExecutiveOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<EOStatus | "ALL">("ALL");
  const [sortColumn, setSortColumn] =
    useState<keyof ExecutiveOrder>("signedDate");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const filteredAndSortedEOs = useMemo(() => {
    return typedExecutiveOrders
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
  }, [searchTerm, selectedStatus, sortColumn, sortDirection]);

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <main className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-8 text-center">
          Executive Orders Tracker
        </h1>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search executive orders..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm transition duration-150 ease-in-out"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select
            className="px-4 py-3 rounded-lg border border-gray-300 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-150 ease-in-out"
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
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow-xl">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150 ease-in-out"
                  onClick={() => handleSort("name")}
                >
                  Title {renderSortIcon("name")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150 ease-in-out"
                  onClick={() => handleSort("status")}
                >
                  Status {renderSortIcon("status")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150 ease-in-out"
                  onClick={() => handleSort("signedDate")}
                >
                  Date Issued {renderSortIcon("signedDate")}
                </th>
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition duration-150 ease-in-out"
                  onClick={() => handleSort("forecastImpact")}
                >
                  Impact {renderSortIcon("forecastImpact")}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {filteredAndSortedEOs.map((eo: ExecutiveOrder) => (
                <tr
                  key={eo.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150 ease-in-out"
                >
                  <td className="px-6 py-4">
                    <Link
                      href={`/executive-orders/${eo.id}`}
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 font-medium"
                    >
                      {eo.name}
                    </Link>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                        eo.status
                      )}`}
                    >
                      {eo.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {new Date(eo.signedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <span className="mr-2">{eo.forecastImpact}</span>
                      <div className="w-24 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${(eo.forecastImpact / 5) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

function getStatusColor(status: EOStatus): string {
  switch (status) {
    case EOStatus.ACTIVE:
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case EOStatus.IN_PROGRESS:
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case EOStatus.BLOCKED:
    case EOStatus.PARTIALLY_BLOCKED:
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    case EOStatus.RESCINDED:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    case EOStatus.AWAITING_REVIEW:
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    case EOStatus.UNCLEAR:
      return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
    case EOStatus.COMPLETE:
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
  }
}
