import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
function SkillBreakdown() {
  const { darkMode } = useTheme();
  const skills = [
    {
      name: "React",
      progress: 90,
    },
    {
      name: "JavaScript",
      progress: 85,
    },
    {
      name: "HTML/CSS",
      progress: 95,
    },
    {
      name: "Problem Solving",
      progress: 75,
    },
  ];

  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 300,
      }}
      className={`rounded-2xl p-6 border
${
  darkMode ? "bg-white/5 border-white/10" : "bg-white border-gray-200 shadow-lg"
}`}
    >
      <h2 className="text-2xl font-bold mb-6">Skill Breakdown</h2>

      <div className="space-y-5">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-2">
              <span>{skill.name}</span>

              <span>{skill.progress}%</span>
            </div>

            <div className="w-full h-3 bg-white/10 rounded-full">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${skill.progress}%`,
                }}
                transition={{
                  duration: 1,
                }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="h-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default SkillBreakdown;
