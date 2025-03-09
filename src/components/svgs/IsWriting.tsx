import { motion as m } from "framer-motion";

const dotVariant = {
  initial: { opacity: 0.3 },
  animate: { opacity: 1 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.4, // Creates the staggered effect
    },
  },
};

export default function IsWriting({ invertColor, animate }: { invertColor?: boolean, animate: boolean }) {
  const bubbleColor = invertColor ? "#569CFF" : "#E9E9EB";
  const dotColor = invertColor ? "#E8F1FF" : "#8D8D8E";

  return (
    <m.svg
      layout
      initial={{ opacity: "0%", y: 10 }}
      animate={{ opacity: "100%", y: 0 }}
      exit={animate ? { opacity: 0, y: 10 } : {}}
      transition={{ delay: 0.2 }}
      width="55" height="33" viewBox="0 0 55 33" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.2682 30.3892C5.2682 31.8311 4.08887 33 2.6341 33C1.17933 33 0 31.8311 0 30.3892C0 28.9474 1.17933 27.7785 2.6341 27.7785C4.08887 27.7785 5.2682 28.9474 5.2682 30.3892Z" fill={bubbleColor} />
      <path d="M14.751 24.1234C14.751 27.2956 12.1564 29.8671 8.95594 29.8671C5.75544 29.8671 3.16092 27.2956 3.16092 24.1234C3.16092 20.9513 5.75544 18.3797 8.95594 18.3797C12.1564 18.3797 14.751 20.9513 14.751 24.1234Z" fill={bubbleColor} />
      <path d="M6.11111 14.9335C6.11111 6.68598 12.8569 0 21.1782 0H39.933C48.2543 0 55 6.68598 55 14.9335C55 23.1811 48.2543 29.8671 39.933 29.8671H21.1782C12.8569 29.8671 6.11111 23.1811 6.11111 14.9335Z" fill={bubbleColor} />
      <m.g variants={staggerContainer} initial="initial" animate="animate">
        <m.path
          variants={dotVariant}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          d="M23.6015 14.9335C23.6015 16.9522 21.9505 18.5886 19.9138 18.5886C17.8771 18.5886 16.2261 16.9522 16.2261 14.9335C16.2261 12.9149 17.8771 11.2785 19.9138 11.2785C21.9505 11.2785 23.6015 12.9149 23.6015 14.9335Z" fill={dotColor} />
        <m.path
          variants={dotVariant}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          d="M34.1379 14.9335C34.1379 16.9522 32.4869 18.5886 30.4502 18.5886C28.4135 18.5886 26.7625 16.9522 26.7625 14.9335C26.7625 12.9149 28.4135 11.2785 30.4502 11.2785C32.4869 11.2785 34.1379 12.9149 34.1379 14.9335Z" fill={dotColor} />
        <m.path
          variants={dotVariant}
          transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
          d="M44.6743 14.9335C44.6743 16.9522 43.0233 18.5886 40.9866 18.5886C38.9499 18.5886 37.2989 16.9522 37.2989 14.9335C37.2989 12.9149 38.9499 11.2785 40.9866 11.2785C43.0233 11.2785 44.6743 12.9149 44.6743 14.9335Z" fill={dotColor} />
      </m.g>
    </m.svg>
  )
}