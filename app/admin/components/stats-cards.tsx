'use client';

import { Users, GraduationCap, BookOpen, School, UserCheck } from 'lucide-react';

interface StatsCardsProps {
  gradeCounts: Record<string, number>;
  totalCount: number;
}

export function StatsCards({ gradeCounts, totalCount }: StatsCardsProps) {
  const gradeCards = [
    { title: 'Senior', count: gradeCounts.Senior || 0, Icon: GraduationCap, iconColor: 'text-purple-700' },
    { title: 'Junior', count: gradeCounts.Junior || 0, Icon: BookOpen, iconColor: 'text-emerald-700' },
    { title: 'Sophomore', count: gradeCounts.Sophomore || 0, Icon: School, iconColor: 'text-amber-700' },
    { title: 'Freshman', count: gradeCounts.Freshman || 0, Icon: UserCheck, iconColor: 'text-red-700' },
  ];

  return (
    <div>
      {/* Total Count Display */}
      <div className="text-center mb-4">
        <p className="text-lg font-medium text-slate-700">
          Total Attendance: <span className="font-bold text-slate-900">{totalCount}</span>
        </p>
      </div>
      
      {/* 2x2 Grid for Grade Cards */}
      <div className="grid grid-cols-2 gap-3">
        {gradeCards.map((card) => (
          <div
            key={card.title}
            className="bg-white/70 backdrop-blur-xl p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-600">{card.title}</h3>
              <card.Icon className={`h-6 w-6 ${card.iconColor}`} />
            </div>
            <p className="text-3xl font-bold text-slate-900">{card.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
