"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, Scale, Clock } from "lucide-react";
import Link from "next/link";
import executiveOrders from "@/data/executive-orders.json";
import { ExecutiveOrder } from "@/types/statusEnum";

export default function ExecutiveOrderDetail() {
  const { id } = useParams();
  const eo = (executiveOrders as unknown as ExecutiveOrder[]).find(
    (eo) => eo.id === id
  );

  if (!eo) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Executive Order not found</h1>
          <Link
            href="/executive-orders"
            className="text-primary hover:text-primary-hover hover:underline mt-4 inline-block"
          >
            Back to Executive Orders
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Back Button */}
        <Link
          href="/executive-orders"
          className="inline-flex items-center text-primary hover:text-primary-hover mb-8"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Executive Orders
        </Link>

        {/* Title Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-800 rounded-lg shadow-lg p-8 mb-8"
        >
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-white mb-4">{eo.name}</h1>
            <a
              href={eo.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary-hover inline-flex items-center"
            >
              Official Link
              <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold
              ${
                eo.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : eo.status === "Blocked by lawsuit"
                  ? "bg-red-100 text-red-800"
                  : eo.status === "Implementation in progress"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {eo.status}
            </span>
            <span className="text-sm text-gray-500">
              Signed: {new Date(eo.signedDate).toLocaleDateString()}
            </span>
          </div>

          <p className="text-gray-300 text-lg mb-4">{eo.summary}</p>
        </motion.div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Implementation Notes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2" />
              Implementation Notes
            </h2>
            <p className="text-gray-300">{eo.notes}</p>
          </motion.div>

          {/* Forecast */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gray-800 rounded-lg shadow-lg p-6"
          >
            <h2 className="text-xl font-semibold mb-4">Forecast</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 mb-1">Impact Rating</p>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className={`h-2 w-8 mr-1 rounded ${
                        i < eo.forecastImpact ? "bg-blue-500" : "bg-gray-200"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm">{eo.forecastImpact}/5</span>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-1">Stall Probability</p>
                <div className="flex items-center">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${eo.forecastStall * 100}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm">
                    {Math.round(eo.forecastStall * 100)}%
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Lawsuits Section */}
        {eo.lawsuits.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gray-800 rounded-lg shadow-lg p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Scale className="h-5 w-5 mr-2" />
              Active Lawsuits
            </h2>
            <ul className="space-y-4">
              {eo.lawsuits.map((lawsuit, index) => (
                <li
                  key={index}
                  className="border-b last:border-0 pb-4 last:pb-0"
                >
                  <h3 className="font-semibold">{lawsuit.caseName}</h3>
                  <p className="text-gray-300 text-sm">{lawsuit.description}</p>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Footer */}
        <div className="text-center text-sm text-gray-500">
          <p>Last updated: {new Date(eo.lastUpdated).toLocaleDateString()}</p>
          <a
            href="https://github.com/HueXiPrime/Trump-Executive-Order-Tracker/issues/new"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-primary-hover mt-2 inline-block"
          >
            Spot something wrong? Create an Issue →
          </a>
        </div>
      </main>
    </div>
  );
}
