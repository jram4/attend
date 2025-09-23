'use client';

import { Users, GraduationCap, BookOpen, School, UserCheck } from 'lucide-react';

interface StatsCardsProps {
  gradeCounts: Record<string, number>;
  totalCount: number;
}

export function StatsCards({ gradeCounts, totalCount }: StatsCardsProps) {
  const cards = [
    { title: 'Total', count: totalCount, Icon: Users, color: 'text-blue-700' },
    { title: 'Senior', count: gradeCounts.Senior || 0, Icon: GraduationCap, color: 'text-purple-700' },
    { title: 'Junior', count: gradeCounts.Junior || 0, Icon: BookOpen, color: 'text-emerald-700' },
    { title: 'Sophomore', count: gradeCounts.Sophomore || 0, Icon: School, color: 'text-amber-700' },
    { title: 'Freshman', count: gradeCounts.Freshman || 0, Icon: UserCheck, color: 'text-red-700' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white p-6 rounded-lg border border-slate-200 shadow-sm hover:shadow-lg transition-shadow duration-300"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-slate-600">{card.title}</h3>
            <card.Icon className={`h-8 w-8 ${card.color}`} />
          </div>
          <p className="text-5xl font-bold text-slate-900">{card.count}</p>
        </div>
      ))}
    </div>
  );
}
