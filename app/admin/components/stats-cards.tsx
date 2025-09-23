'use client';

import { Users, GraduationCap, BookOpen, School, UserCheck } from 'lucide-react';

interface StatsCardsProps {
  gradeCounts: Record<string, number>;
  totalCount: number;
}

export function StatsCards({ gradeCounts, totalCount }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total',
      count: totalCount,
      icon: Users,
      iconColor: 'text-blue-700'
    },
    {
      title: 'Senior',
      count: gradeCounts.Senior || 0,
      icon: GraduationCap,
      iconColor: 'text-purple-700'
    },
    {
      title: 'Junior',
      count: gradeCounts.Junior || 0,
      icon: BookOpen,
      iconColor: 'text-emerald-700'
    },
    {
      title: 'Sophomore',
      count: gradeCounts.Sophomore || 0,
      icon: School,
      iconColor: 'text-amber-700'
    },
    {
      title: 'Freshman',
      count: gradeCounts.Freshman || 0,
      icon: UserCheck,
      iconColor: 'text-red-700'
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
      {cards.map((card) => {
        const IconComponent = card.icon;
        return (
          <div
            key={card.title}
            className="bg-white p-10 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-slate-600">{card.title}</h3>
              <IconComponent className={`h-8 w-8 ${card.iconColor}`} />
            </div>
            <p className="text-5xl font-bold text-slate-900">{card.count}</p>
          </div>
        );
      })}
    </div>
  );
}
