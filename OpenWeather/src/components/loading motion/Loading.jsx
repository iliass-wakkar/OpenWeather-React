
import { motion } from "motion/react";

function LoadingThreeDotsPulse({color}) {
  const dotVariants = {
    pulse: {
      scale: [1, 1.5, 1],
      transition: {
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      animate="pulse"
      transition={{ staggerChildren: -0.2, staggerDirection: -1 }}
      className={`container `}
    >
      <motion.div className={`dot ${color}`} variants={dotVariants} />
      <motion.div className={`dot ${color}`} variants={dotVariants} />
      <motion.div className={`dot ${color}`} variants={dotVariants} />
      <StyleSheet />
    </motion.div>
  );
}

/**
 * ==============   Styles   ================
 */
function StyleSheet() {
  return (
    <style>
      {`
            .container {
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
            }

            .dot {
                width: 10px;
                height: 10px;
                border-radius: 50%;
                will-change: transform;
            }
            `}
    </style>
  );
}

export default LoadingThreeDotsPulse;
