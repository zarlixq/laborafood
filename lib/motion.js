export const easeOut = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
};

export const stagger = (delay = 0.08) => ({
  hidden: {},
  show: {
    transition: { staggerChildren: delay, delayChildren: 0.05 },
  },
});

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export const viewportOnce = { once: true, amount: 0.2 };

export const trustLogos = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `https://placehold.co/180x70/F4F4EE/4A5567?text=MARKA+${i + 1}`,
  alt: `Müşteri Marka ${i + 1}`,
}));
