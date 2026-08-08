import { useTheme } from "../context/ThemeContext";

function Footer() {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`py-8 text-center ${
        darkMode
          ? "border-t border-gray-800 text-gray-500"
          : "border-t border-gray-200 text-gray-600"
      }`}
    >
      © 2026 MockMate AI. All rights reserved.
    </footer>
  );
}

export default Footer;
