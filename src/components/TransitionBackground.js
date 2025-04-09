import { motion } from 'framer-motion';

export default function TransitionBackground() {
  return (
    <motion.div
      className="fixed inset-0 -z-10 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    />
  );
} 