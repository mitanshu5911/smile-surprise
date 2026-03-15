import { motion } from "framer-motion";

export default function FloatingHearts({ show }) {

  if (!show) return null;

  const hearts = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">

      {hearts.map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: 0, opacity: 1 }}
          animate={{ y: -300, opacity: 0 }}
          transition={{
            duration: 2,
            delay: i * 0.1
          }}
          className="absolute text-pink-500 text-3xl"
          style={{
            left: `${Math.random() * 100}%`,
            bottom: "0%"
          }}
        >
          ❤️
        </motion.div>
      ))}

    </div>
  );
}