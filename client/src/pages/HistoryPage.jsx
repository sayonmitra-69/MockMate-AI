import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { useEffect, useState } from "react";
import API from "../api/api";
function HistoryPage() {
  const [history, setHistory] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState("latest");
  const { darkMode } = useTheme();
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await API.get("/interviews/history", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setHistory(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  let filteredHistory = history.filter((item) =>
    item.role.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (sortType === "highest") {
    filteredHistory = [...filteredHistory].sort((a, b) => b.score - a.score);
  }

  if (sortType === "lowest") {
    filteredHistory = [...filteredHistory].sort((a, b) => a.score - b.score);
  }

  return (
    <div
      className={`min-h-screen flex transition-all duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-black via-slate-950 to-black text-white"
          : "bg-slate-100 text-black"
      }`}
    >
      <Sidebar />

      <main className="flex-1 p-8">
        <h1 className="text-5xl font-bold mb-8">Interview History</h1>

        {/* Search + Sort */}

        <div
          className={`flex flex-col md:flex-row gap-4 mb-8 ${
            darkMode ? "" : ""
          }`}
        >
          <input
            type="text"
            placeholder="Search by role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`flex-1 rounded-xl px-4 py-3 outline-none border ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white border-gray-300"
            }`}
          />

          <select
            value={sortType}
            onChange={(e) => setSortType(e.target.value)}
            className={`w-full md:w-52 rounded-xl px-4 py-3 border ${
              darkMode
                ? "bg-white/5 border-white/10"
                : "bg-white border-gray-300"
            }`}
          >
            <option value="latest">Latest</option>
            <option value="highest">Highest Score</option>
            <option value="lowest">Lowest Score</option>
          </select>
        </div>

        {filteredHistory.length === 0 ? (
          <div className="bg-white/5 rounded-3xl p-8">
            No matching interviews found.
          </div>
        ) : (
          <div className="space-y-6">
            {filteredHistory.map((item, index) => (
              <div
                key={index}
                className={`backdrop-blur-xl border rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02]
                ${
                  darkMode
                    ? "bg-white/5 border-white/10"
                    : "bg-white border-gray-200 shadow-lg"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-2xl font-bold">{item.role}</h2>

                    <p className="text-gray-400 mt-2">{item.difficulty}</p>

                    <p className="text-gray-500 text-sm mt-1">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-4xl font-bold text-cyan-400">
                    {item.score}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default HistoryPage;
