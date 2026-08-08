import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Interviews",
    value: "12",
  },
  {
    title: "Average Score",
    value: "82%",
  },
  {
    title: "Questions Solved",
    value: "156",
  },
  {
    title: "Topics Covered",
    value: "24",
  },
];

function StatsCards() {
  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          whileHover={{
            y: -8,
            scale: 1.03,
            boxShadow: "0px 10px 30px rgba(6,182,212,0.25)",
          }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <p className="text-gray-400">{stat.title}</p>

          <h2 className="text-4xl font-bold mt-3">{stat.value}</h2>
        </motion.div>
      ))}
    </div>
  );
}

export default StatsCards;
