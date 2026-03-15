import { motion } from "framer-motion";

export default function LoveFrame({ image }) {

  return (
    <motion.div
      initial={{ y: 120, opacity: 0, scale: 0.8 }}
      animate={{ y: -220, opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -260 }}
      transition={{ duration: 3, ease: "easeOut" }}
      className="fixed bottom-0 left-1/2 -translate-x-1/2 z-50 flex justify-center"
    >

      <div className="bg-white/90 backdrop-blur-lg p-5 rounded-3xl shadow-2xl text-center border-4 border-pink-300">

        <h2 className="text-xl text-pink-600 font-bold mb-3">
          Your Beautiful Smile ❤️
        </h2>

        <div className="overflow-hidden rounded-xl">

          <img
            src={image}
            alt="smile capture"
            className="w-72 h-52 object-cover"
          />

        </div>

        <p className="mt-3 text-pink-700 font-semibold">
          This smile made my world brighter ✨
        </p>

      </div>

    </motion.div>
  );
}