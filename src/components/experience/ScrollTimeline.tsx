import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollTimelineProps {
  containerRef: React.RefObject<HTMLElement>;
  onProgress: (progress: number, stageIndex: number) => void;
}

export const STAGES_COUNT = 12;

export const STAGE_TITLES = [
  { index: 1, title: 'Alpine Reveal', subtitle: 'Wärme. Neu gedacht.' },
  { index: 2, title: 'Architektur', subtitle: 'Panoramaglas & Eckdetails' },
  { index: 3, title: 'Material', subtitle: 'Karbonisiertes Thermoholz' },
  { index: 4, title: 'Manufaktur', subtitle: 'Präzisions-Montage' },
  { index: 5, title: 'Studio', subtitle: '360° Studio-Inspektion' },
  { index: 6, title: 'Versand', subtitle: 'Schutzverpackung' },
  { index: 7, title: 'Logistik', subtitle: 'Schweizer Transit' },
  { index: 8, title: 'Ankunft', subtitle: 'Villa am Berghang' },
  { index: 9, title: 'Installation', subtitle: 'Monolithische Integration' },
  { index: 10, title: 'Konfiguration', subtitle: 'Ausstattungsoptionen' },
  { index: 11, title: 'Individualität', subtitle: 'Grössen & Holzarten' },
  { index: 12, title: 'Finale', subtitle: 'Dein Rückzugsort. Neu definiert.' },
];

export const ScrollTimeline: React.FC<ScrollTimelineProps> = ({
  containerRef,
  onProgress,
}) => {
  useEffect(() => {
    if (!containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.6, // Silky smooth scrub
      onUpdate: (self) => {
        const progress = Math.max(0, Math.min(1, self.progress));
        const stageIndex = Math.min(
          STAGES_COUNT,
          Math.floor(progress * STAGES_COUNT) + 1
        );
        onProgress(progress, stageIndex);
      },
    });

    return () => {
      trigger.kill();
    };
  }, [containerRef, onProgress]);

  return null;
};
