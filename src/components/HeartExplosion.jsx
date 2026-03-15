import { motion } from "framer-motion";

export default function HeartExplosion({ show }) {
  if (!show) return null;

  const hearts = Array.from({ length: 15 });

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
      {hearts.map((_, i) => {
        const x = (Math.random() - 0.5) * 300;
        const y = (Math.random() - 0.5) * 300;

        return (
          <motion.div
            key={i}
            initial={{ x: 0, y: 0, opacity: 1, scale: 0.5 }}
            animate={{ x, y, opacity: 0, scale: 1.5 }}
            transition={{ duration: 1.2 }}
            className="absolute text-pink-500 text-3xl"
          >
            💋
          </motion.div>
        );
      })}
    </div>
  );
}