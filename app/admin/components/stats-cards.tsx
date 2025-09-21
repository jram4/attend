'use client';

interface StatsCardsProps {
  gradeCounts: Record<string, number>;
  totalCount: number;
}

export function StatsCards({ gradeCounts, totalCount }: StatsCardsProps) {
  const cards = [
    { title: 'Total', count: totalCount, color: 'bg-blue-100' },
    { title: 'Senior', count: gradeCounts.Senior || 0, color: 'bg-green-100' },
    { title: 'Junior', count: gradeCounts.Junior || 0, color: 'bg-yellow-100' },
    { title: 'Sophomore', count: gradeCounts.Sophomore || 0, color: 'bg-orange-100' },
    { title: 'Freshman', count: gradeCounts.Freshman || 0, color: 'bg-red-100' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`${card.color} p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow`}
        >
          <h3 className="text-lg font-semibold text-gray-700">{card.title}</h3>
          <p className="text-3xl font-bold text-gray-900">{card.count}</p>
        </div>
      ))}
    </div>
  );
}
