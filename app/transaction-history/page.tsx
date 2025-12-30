"use client";

import React, { useState, useEffect } from "react";
import {
  FaSearch,
  FaMoon,
  FaSun,
  FaBars,
  FaThLarge,
  FaList,
  FaCreditCard,
  FaYoutube,
  FaListUl,
  FaCheckCircle,
  FaPlay,
  FaHome,
  FaCompass,
  FaDownload,
  FaUser,
  FaBell,
  FaHistory,
  FaCog,
  FaShoppingBag,
  FaVideo,
  FaFilter,
  FaCalendar,
  FaDownload as FaDownloadIcon,
} from "react-icons/fa";
import SideMenu from "@/components/SideMenu";
import { useTheme } from "@/components/ThemeProvider";

const TransactionHistoryPage = () => {
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      date: "2024-12-15",
      description: "Monthly Premium Subscription",
      amount: "R149.99",
      status: "Completed",
      type: "subscription",
      category: "Subscription",
    },
    {
      id: 2,
      date: "2024-12-10",
      description: "Video Purchase: Loetoeng Kasarung",
      amount: "R29.99",
      status: "Completed",
      type: "purchase",
      category: "Content Purchase",
    },
    {
      id: 3,
      date: "2024-12-01",
      description: "Monthly Premium Subscription",
      amount: "R149.99",
      status: "Completed",
      type: "subscription",
      category: "Subscription",
    },
    {
      id: 4,
      date: "2024-11-15",
      description: "Video Purchase: Neon Nights",
      amount: "R19.99",
      status: "Completed",
      type: "purchase",
      category: "Content Purchase",
    },
    {
      id: 5,
      date: "2024-11-01",
      description: "Monthly Premium Subscription",
      amount: "R149.99",
      status: "Completed",
      type: "subscription",
      category: "Subscription",
    },
    {
      id: 6,
      date: "2024-10-15",
      description: "Refund: Gajah Langka",
      amount: "-R29.99",
      status: "Refunded",
      type: "refund",
      category: "Refund",
    },
  ];

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch = transaction.description
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || transaction.type === filter;
    return matchesSearch && matchesFilter;
  });

  const totalSpent = filteredTransactions
    .filter((t) => t.type !== "refund")
    .reduce(
      (sum, t) => sum + parseFloat(t.amount.replace("R", "").replace("-", "")),
      0
    );

  const totalRefunded = filteredTransactions
    .filter((t) => t.type === "refund")
    .reduce(
      (sum, t) => sum + parseFloat(t.amount.replace("R", "").replace("-", "")),
      0
    );

  return (
    <div
      className={`min-h-screen transition-colors duration-1000 font-sans p-4 lg:p-12 relative overflow-hidden ${
        isDarkMode ? "bg-[#0a0a0a] text-white" : "bg-[#f0f4f7] text-slate-800"
      }`}
    >
      {/* Background Gradients - Strictly Red and Green Fades */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={`absolute -top-[10%] -left-[10%] w-[60%] h-[60%] rounded-full blur-[120px] transition-all duration-1000 opacity-20 ${
            isDarkMode ? "bg-red-900/40" : "bg-red-200/50"
          }`}
        />
        <div
          className={`absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full blur-[120px] transition-all duration-1000 opacity-20 ${
            isDarkMode ? "bg-green-900/30" : "bg-green-200/50"
          }`}
        />
      </div>

      {/* Sidebar Overlay */}
      <SideMenu
        isOpen={isSideMenuOpen}
        onClose={() => setIsSideMenuOpen(false)}
        isDarkMode={isDarkMode}
        activePage="transaction-history"
      />

      <main
        className={`relative z-10 max-w-7xl mx-auto backdrop-blur-3xl rounded-[3rem] border shadow-2xl p-6 lg:p-10 transition-all duration-700 ${
          isDarkMode
            ? "bg-white/5 border-white/10"
            : "bg-white/40 border-white/60 shadow-xl shadow-slate-200/50"
        }`}
      >
        {/* Navbar */}
        <nav className="flex items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setIsSideMenuOpen(true)}
              className={`p-3 transition-all border rounded-2xl shadow-sm ${
                isDarkMode
                  ? "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                  : "bg-slate-500/10 border-slate-200 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <FaBars size={18} />
            </button>
            <div className="hidden text-xl italic font-black tracking-tighter text-red-600 sm:block">
              TESE
            </div>
          </div>

          <div className="relative flex-1 max-w-xl">
            <FaSearch
              className={`absolute -translate-y-1/2 left-4 top-1/2 ${
                isDarkMode ? "opacity-30" : "opacity-50 text-slate-500"
              }`}
            />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full py-3 pl-12 pr-4 text-sm transition-all border outline-none rounded-2xl ${
                isDarkMode
                  ? "bg-white/5 border-white/10 text-white placeholder-white/20"
                  : "bg-slate-500/10 border-slate-200 text-slate-800 placeholder-slate-400"
              }`}
            />
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-3 transition-transform border rounded-full hover:scale-110 ${
                isDarkMode
                  ? "bg-white/10 border-white/20"
                  : "bg-white border-slate-200 shadow-sm"
              }`}
            >
              {isDarkMode ? (
                <FaSun className="text-yellow-400" />
              ) : (
                <FaMoon className="text-slate-600" />
              )}
            </button>
            <div className="relative">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
                className="w-10 h-10 rounded-full border-2 border-red-500 p-0.5"
                alt="user"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
            </div>
          </div>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-4xl font-black text-red-600">
            Transaction History
          </h1>
          <p className="mb-6 text-slate-500">
            View and manage your payment history and transactions
          </p>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
            <div
              className={`p-6 border rounded-2xl ${
                isDarkMode ? "border-white/10 bg-white/5" : "border-white/60 bg-white/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Spent</p>
                  <p className="text-2xl font-black text-green-600">
                    R{totalSpent.toFixed(2)}
                  </p>
                </div>
                <FaCreditCard className="text-green-600" size={32} />
              </div>
            </div>

            <div
              className={`p-6 border rounded-2xl ${
                isDarkMode ? "border-white/10 bg-white/5" : "border-white/60 bg-white/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Total Refunded</p>
                  <p className="text-2xl font-black text-red-600">
                    R{totalRefunded.toFixed(2)}
                  </p>
                </div>
                <FaDownloadIcon className="text-red-600" size={32} />
              </div>
            </div>

            <div
              className={`p-6 border rounded-2xl ${
                isDarkMode ? "border-white/10 bg-white/5" : "border-white/60 bg-white/40"
              }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Net Total</p>
                  <p className="text-2xl font-black text-slate-600">
                    R{(totalSpent - totalRefunded).toFixed(2)}
                  </p>
                </div>
                <FaHistory className="text-slate-600" size={32} />
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 pb-4 overflow-x-auto no-scrollbar">
            {[
              { id: "all", label: "All Transactions" },
              { id: "subscription", label: "Subscriptions" },
              { id: "purchase", label: "Purchases" },
              { id: "refund", label: "Refunds" },
            ].map((filterOption) => (
              <button
                key={filterOption.id}
                onClick={() => setFilter(filterOption.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl border backdrop-blur-md transition-all text-sm font-bold whitespace-nowrap ${
                  filter === filterOption.id
                    ? "bg-red-600 border-red-600 text-white shadow-lg shadow-red-500/30"
                    : isDarkMode
                    ? "bg-white/5 border-white/5 text-white/50 hover:bg-white/10"
                    : "bg-slate-500/10 border-white/60 text-slate-500 hover:bg-slate-500/20"
                }`}
              >
                <FaFilter />
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div
          className={`overflow-hidden border rounded-3xl ${
            isDarkMode
              ? "border-white/10 bg-white/5"
              : "border-white/60 bg-white/40"
          }`}
        >
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-black text-red-600">
                Transactions ({filteredTransactions.length})
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold transition-all border rounded-xl border-slate-300 text-slate-600 hover:bg-slate-100">
                <FaDownloadIcon />
                Export CSV
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead
                className={`text-[10px] uppercase tracking-widest ${
                  isDarkMode
                    ? "bg-white/5 text-white/30"
                    : "bg-slate-100 text-slate-400"
                }`}
              >
                <tr>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Description</th>
                  <th className="px-6 py-4">Category</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  isDarkMode ? "divide-white/5" : "divide-slate-200/50"
                }`}
              >
                {filteredTransactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    className="transition-all hover:bg-red-500/5 group"
                  >
                    <td className="flex items-center gap-2 px-6 py-4 font-medium">
                      <FaCalendar className={`${isDarkMode ? "text-white/40" : "text-slate-400"}`} size={12} />
                      {transaction.date}
                    </td>
                    <td className="px-6 py-4">{transaction.description}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 text-xs font-bold rounded-md bg-slate-200 text-slate-700">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold">
                      {transaction.type === "refund" ? (
                        <span className="text-red-600">
                          {transaction.amount}
                        </span>
                      ) : (
                        <span className="text-green-600">
                          +{transaction.amount}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-bold rounded-md ${
                          transaction.status === "Completed"
                            ? "bg-green-500/20 text-green-600"
                            : transaction.status === "Refunded"
                            ? "bg-red-500/20 text-red-600"
                            : "bg-yellow-500/20 text-yellow-600"
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default TransactionHistoryPage;
