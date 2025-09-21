import { GAMES } from './game-config';

// Type for a single attendance record
export interface DemoAttendanceRecord {
  timestamp: Date;
  grade: string;
}

// Grade distribution weights (must sum to 1)
const GRADE_WEIGHTS = {
  'Senior': 0.4,
  'Junior': 0.3,
  'Sophomore': 0.2,
  'Freshman': 0.1,
} as const;

// Helper to get a random integer between min and max (inclusive)
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Helper to get a random timestamp between start and end
const getRandomTimestamp = (start: Date, end: Date): Date => {
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
};

// Helper to get a random grade based on weights
const getRandomGrade = (): string => {
  const random = Math.random();
  let sum = 0;
  
  for (const [grade, weight] of Object.entries(GRADE_WEIGHTS)) {
    sum += weight;
    if (random <= sum) return grade;
  }
  
  return 'Senior'; // Fallback
};

// Main function to generate demo attendance data
export async function generateDemoAttendanceData(gameId: string): Promise<DemoAttendanceRecord[]> {
  // Find the game configuration
  const game = GAMES.find(g => g.id === gameId);
  if (!game) throw new Error(`Game not found: ${gameId}`);

  // Convert string dates to Date objects
  const checkInStart = new Date(game.checkInStart);
  const checkInEnd = new Date(game.checkInEnd);

  // Generate a random total number of check-ins (between 150 and 500)
  const totalCheckIns = getRandomInt(150, 500);

  // Generate individual check-in records
  const records: DemoAttendanceRecord[] = [];

  for (let i = 0; i < totalCheckIns; i++) {
    records.push({
      timestamp: getRandomTimestamp(checkInStart, checkInEnd),
      grade: getRandomGrade(),
    });
  }

  // Sort records by timestamp
  records.sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

  return records;
}

// Helper to process raw attendance data into grade counts
export function processGradeCounts(data: DemoAttendanceRecord[]): Record<string, number> {
  return data.reduce((acc, record) => {
    acc[record.grade] = (acc[record.grade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
}

// Helper to process raw attendance data into time series data
export function processTimeSeriesData(
  data: DemoAttendanceRecord[],
  startTime: Date,
  endTime: Date,
  intervalMinutes: number = 15
): Array<{ time: string; Senior: number; Junior: number; Sophomore: number; Freshman: number }> {
  // Initialize time intervals
  const intervals: Date[] = [];
  let currentTime = new Date(startTime);
  
  while (currentTime <= endTime) {
    intervals.push(new Date(currentTime));
    currentTime = new Date(currentTime.getTime() + intervalMinutes * 60000);
  }

  // Initialize result array with time intervals
  const result = intervals.map(time => ({
    time: time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
    Senior: 0,
    Junior: 0,
    Sophomore: 0,
    Freshman: 0,
  }));

  // Process each attendance record
  data.forEach(record => {
    // Find the appropriate interval index
    const intervalIndex = intervals.findIndex(
      (interval, i) => 
        record.timestamp >= interval && 
        (i === intervals.length - 1 || record.timestamp < intervals[i + 1])
    );

    if (intervalIndex >= 0) {
      // Add to all intervals from this point forward (cumulative)
      for (let i = intervalIndex; i < result.length; i++) {
        if (record.grade === 'Senior') result[i].Senior++;
        else if (record.grade === 'Junior') result[i].Junior++;
        else if (record.grade === 'Sophomore') result[i].Sophomore++;
        else if (record.grade === 'Freshman') result[i].Freshman++;
      }
    }
  });

  return result;
}
