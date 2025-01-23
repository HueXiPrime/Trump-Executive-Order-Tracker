"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  GitPullRequest,
  FileJson,
  AlertCircle,
  ArrowLeft,
  Github,
} from "lucide-react";
import { EOStatus } from "@/types/statusEnum";

export default function Contribute() {
  return (
    <div className="min-h-screen bg-white dark:bg-black">
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:text-primary-hover mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            How to Contribute
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
            Help us keep the Executive Orders Tracker accurate and up-to-date
          </p>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-12"
        >
          {/* Contribution Methods */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
              Two Ways to Contribute
            </h2>

            {/* GitHub Method */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-200">
                <GitPullRequest className="h-5 w-5 mr-2" />
                Via GitHub (Recommended)
              </h3>
              <ol className="list-decimal list-inside space-y-3 text-gray-600 dark:text-gray-400">
                <li>Fork our repository</li>
                <li>
                  Edit{" "}
                  <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                    data/executive-orders.json
                  </code>
                </li>
                <li>Submit a Pull Request</li>
              </ol>
              <a
                href="https://github.com/HueXiPrime/Trump-Executive-Order-Tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center mt-4 text-blue-600 hover:text-blue-800"
              >
                <Github className="h-4 w-4 mr-2" />
                View Repository
              </a>
            </div>

            {/* Issue Method */}
            <div>
              <h3 className="text-xl font-semibold mb-4 flex items-center text-gray-800 dark:text-gray-200">
                <AlertCircle className="h-5 w-5 mr-2" />
                Via GitHub Issues
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Don&apos;t want to edit JSON? Create an issue with your
                suggested changes.
              </p>
              <a
                href="https://github.com/HueXiPrime/Trump-Executive-Order-Tracker/issues/new"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-800"
              >
                Create an Issue →
              </a>
            </div>
          </div>

          {/* Guidelines */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white flex items-center">
              <FileJson className="h-6 w-6 mr-2" />
              Data Guidelines
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Required Fields
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  <li>Title of the Executive Order</li>
                  <li>Link to official document</li>
                  <li>Short summary (max 200 characters)</li>
                  <li>Current status</li>
                  <li>Date signed</li>
                  <li>Implementation notes</li>
                  <li>Known lawsuits (if any)</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Style Guidelines
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400">
                  <li>Keep summaries objective and factual</li>
                  <li>Avoid personal commentary or political opinions</li>
                  <li>Use clear, concise language</li>
                  <li>Include sources for lawsuit information</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-2 text-gray-800 dark:text-gray-200">
                  Status Guidelines
                </h3>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-400 mb-4">
                  <li>
                    Use &quot;Unclear&quot; if implementation status is
                    uncertain
                  </li>
                  <li>
                    Mark as &quot;Blocked&quot; only with official court orders
                  </li>
                  <li>
                    Use &quot;Implementation in progress&quot; for partial
                    rollouts
                  </li>
                  <li>Update &quot;lastUpdated&quot; field with each change</li>
                </ul>

                {/* New Status Values Section */}
                <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg">
                  <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-200">
                    Available Status Values
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {Object.values(EOStatus).map((status) => (
                      <div
                        key={status}
                        className="flex items-center space-x-2 text-sm"
                      >
                        <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-gray-700 dark:text-gray-300">
                          {status}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
