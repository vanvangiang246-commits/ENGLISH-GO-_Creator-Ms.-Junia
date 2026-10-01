import React from 'react';
import {
  BookOpen,
  Pencil,
  Backpack,
  Palette,
  Music,
  Sun,
  Users,
  Globe,
  Lightbulb,
  Star,
  Heart,
  Clock,
  Rocket,
  TreePine,
  Puzzle,
  GraduationCap,
  MessageCircle,
  Compass,
  Sparkles,
  Trophy,
  LucideIcon,
} from 'lucide-react';

export interface UnitIconConfig {
  icon: LucideIcon;
  label: string;
  bgClass: string;
  textClass: string;
  borderClass: string;
  hoverBgClass: string;
}

export const UNIT_ICONS_CONFIG: Record<number, UnitIconConfig> = {
  1: {
    icon: BookOpen,
    label: 'Storybook & Alphabet',
    bgClass: 'bg-sky-50',
    textClass: 'text-sky-600',
    borderClass: 'border-sky-200',
    hoverBgClass: 'group-hover:bg-sky-600',
  },
  2: {
    icon: Pencil,
    label: 'Pencil & Writing',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-600',
    borderClass: 'border-amber-200',
    hoverBgClass: 'group-hover:bg-amber-600',
  },
  3: {
    icon: Backpack,
    label: 'School Backpack',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-600',
    borderClass: 'border-emerald-200',
    hoverBgClass: 'group-hover:bg-emerald-600',
  },
  4: {
    icon: Palette,
    label: 'Art & Colors',
    bgClass: 'bg-violet-50',
    textClass: 'text-violet-600',
    borderClass: 'border-violet-200',
    hoverBgClass: 'group-hover:bg-violet-600',
  },
  5: {
    icon: Music,
    label: 'Songs & Chants',
    bgClass: 'bg-rose-50',
    textClass: 'text-rose-600',
    borderClass: 'border-rose-200',
    hoverBgClass: 'group-hover:bg-rose-600',
  },
  6: {
    icon: Sun,
    label: 'Weather & Daytime',
    bgClass: 'bg-orange-50',
    textClass: 'text-orange-600',
    borderClass: 'border-orange-200',
    hoverBgClass: 'group-hover:bg-orange-600',
  },
  7: {
    icon: Users,
    label: 'Friends & Family',
    bgClass: 'bg-indigo-50',
    textClass: 'text-indigo-600',
    borderClass: 'border-indigo-200',
    hoverBgClass: 'group-hover:bg-indigo-600',
  },
  8: {
    icon: Globe,
    label: 'English World',
    bgClass: 'bg-teal-50',
    textClass: 'text-teal-600',
    borderClass: 'border-teal-200',
    hoverBgClass: 'group-hover:bg-teal-600',
  },
  9: {
    icon: Lightbulb,
    label: 'Bright Ideas',
    bgClass: 'bg-yellow-50',
    textClass: 'text-yellow-600',
    borderClass: 'border-yellow-200',
    hoverBgClass: 'group-hover:bg-yellow-500',
  },
  10: {
    icon: Star,
    label: 'Mid-term Star',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-500',
    borderClass: 'border-amber-200',
    hoverBgClass: 'group-hover:bg-amber-500',
  },
  11: {
    icon: Heart,
    label: 'Likes & Hobbies',
    bgClass: 'bg-pink-50',
    textClass: 'text-pink-600',
    borderClass: 'border-pink-200',
    hoverBgClass: 'group-hover:bg-pink-600',
  },
  12: {
    icon: Clock,
    label: 'Daily Routines',
    bgClass: 'bg-cyan-50',
    textClass: 'text-cyan-600',
    borderClass: 'border-cyan-200',
    hoverBgClass: 'group-hover:bg-cyan-600',
  },
  13: {
    icon: Rocket,
    label: 'English Adventure',
    bgClass: 'bg-purple-50',
    textClass: 'text-purple-600',
    borderClass: 'border-purple-200',
    hoverBgClass: 'group-hover:bg-purple-600',
  },
  14: {
    icon: TreePine,
    label: 'Nature & Animals',
    bgClass: 'bg-green-50',
    textClass: 'text-green-600',
    borderClass: 'border-green-200',
    hoverBgClass: 'group-hover:bg-green-600',
  },
  15: {
    icon: Puzzle,
    label: 'Word Games',
    bgClass: 'bg-blue-50',
    textClass: 'text-blue-600',
    borderClass: 'border-blue-200',
    hoverBgClass: 'group-hover:bg-blue-600',
  },
  16: {
    icon: GraduationCap,
    label: 'Level Milestone',
    bgClass: 'bg-fuchsia-50',
    textClass: 'text-fuchsia-600',
    borderClass: 'border-fuchsia-200',
    hoverBgClass: 'group-hover:bg-fuchsia-600',
  },
  17: {
    icon: MessageCircle,
    label: 'Conversation Club',
    bgClass: 'bg-sky-50',
    textClass: 'text-sky-700',
    borderClass: 'border-sky-200',
    hoverBgClass: 'group-hover:bg-sky-700',
  },
  18: {
    icon: Compass,
    label: 'Places & Travel',
    bgClass: 'bg-emerald-50',
    textClass: 'text-emerald-700',
    borderClass: 'border-emerald-200',
    hoverBgClass: 'group-hover:bg-emerald-700',
  },
  19: {
    icon: Sparkles,
    label: 'Special Review',
    bgClass: 'bg-amber-50',
    textClass: 'text-amber-600',
    borderClass: 'border-amber-200',
    hoverBgClass: 'group-hover:bg-amber-600',
  },
  20: {
    icon: Trophy,
    label: 'Mastery Challenge',
    bgClass: 'bg-yellow-50',
    textClass: 'text-yellow-700',
    borderClass: 'border-yellow-300',
    hoverBgClass: 'group-hover:bg-yellow-600',
  },
};

export const getUnitIconConfig = (unitNumber: number): UnitIconConfig => {
  return (
    UNIT_ICONS_CONFIG[unitNumber] || {
      icon: BookOpen,
      label: 'English Lesson',
      bgClass: 'bg-slate-50',
      textClass: 'text-slate-600',
      borderClass: 'border-slate-200',
      hoverBgClass: 'group-hover:bg-blue-600',
    }
  );
};
