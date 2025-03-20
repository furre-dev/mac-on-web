'use client';

import { Application, TrashCan } from '@/types/applicationTypes';
import { applications, trashCan } from '@/utils/applications';
import {
  MotionValue,
  animate,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { useApplications } from './context/ApplicationsContext';

const SCALE = 2.25; // max scale factor of an icon
const DISTANCE = 110; // pixels before mouse affects an icon
const NUDGE = 40; // pixels icons are moved away from mouse
const SPRING = {
  mass: 0.1,
  stiffness: 170,
  damping: 12,
};

export default function Dock() {
  const mouseLeft = useMotionValue(-Infinity);
  const mouseRight = useMotionValue(-Infinity);
  const left = useTransform(mouseLeft, [0, 40], [0, -40]);
  const right = useTransform(mouseRight, [0, 40], [0, -40]);
  const leftSpring = useSpring(left, SPRING);
  const rightSpring = useSpring(right, SPRING);

  return (
    <>
      <motion.div
        onMouseMove={(e) => {
          const { left, right } = e.currentTarget.getBoundingClientRect();
          const offsetLeft = e.clientX - left;
          const offsetRight = right - e.clientX;
          mouseLeft.set(offsetLeft);
          mouseRight.set(offsetRight);
        }}
        onMouseLeave={() => {
          mouseLeft.set(-Infinity);
          mouseRight.set(-Infinity);
        }}
        className="mx-auto hidden h-16 items-end gap-3 px-2 pb-3 sm:flex relative mt-auto mb-1 z-[199999999]"
      >
        <motion.div
          className="absolute rounded-2xl inset-y-0 bg-gray-700 border border-gray-600 -z-10"
          style={{ left: leftSpring, right: rightSpring }}
        />

        {Array.from(Array(applications.length).keys()).map((i) => (
          <AppIcon key={i} mouseLeft={mouseLeft}>
            {applications[i]}
          </AppIcon>
        ))}

        <AppIcon key={trashCan.application_name} mouseLeft={mouseLeft}>
          {trashCan}
        </AppIcon>
      </motion.div>

      <div className="sm:hidden">
        <div className="mx-auto flex h-16 max-w-full items-end gap-4 overflow-x-scroll rounded-2xl bg-gray-700 px-4 pb-3 sm:hidden">
          {Array.from(Array(8).keys()).map((i) => (
            <div
              key={i}
              className="aspect-square w-10 flex-shrink-0 rounded-full bg-gray-100"
            />
          ))}
        </div>
        <p className="mt-4 text-center text-xs font-medium text-gray-300">
          View at 640px with a mouse
          <br /> to see the interaction.
        </p>
      </div>
    </>
  );
}

function AppIcon({
  mouseLeft,
  children,
}: {
  mouseLeft: MotionValue;
  children: Application | TrashCan;
}) {
  const { openApp } = useApplications();

  const ref = useRef<HTMLButtonElement>(null);

  const distance = useTransform(() => {
    const bounds = ref.current
      ? { x: ref.current.offsetLeft, width: ref.current.offsetWidth }
      : { x: 0, width: 0 };

    return mouseLeft.get() - bounds.x - bounds.width / 2;
  });

  const scale = useTransform(distance, [-DISTANCE, 0, DISTANCE], [1, SCALE, 1]);
  const x = useTransform(() => {
    const d = distance.get();
    if (d === -Infinity) {
      return 0;
    } else if (d < -DISTANCE || d > DISTANCE) {
      return Math.sign(d) * -1 * NUDGE;
    } else {
      return (-d / DISTANCE) * NUDGE * scale.get();
    }
  });

  const scaleSpring = useSpring(scale, SPRING);
  const xSpring = useSpring(x, SPRING);
  const y = useMotionValue(0);

  const isTrashCan = children.application_name === "trash";

  return (
    <motion.button
      ref={ref}
      style={{ x: xSpring, scale: scaleSpring, y, marginLeft: isTrashCan ? 10 : 0 }}
      onClick={() => {
        if (!isTrashCan) {
          animate(y, [0, -40, 0], {
            repeat: 2,
            ease: [
              [0, 0, 0.2, 1],
              [0.8, 0, 1, 1],
            ],
            duration: 0.7,
          });
        }
        openApp(children.application_name)
      }}
      className="aspect-square block w-10 rounded-full origin-bottom"
    >
      <Image className='rounded-[10px]' alt={children.application_name} src={children.image_src} />
    </motion.button>
  );
}
