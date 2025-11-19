import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface DataPoint {
  year: number;
  total: number;
  refugees: number;
  labor: number;
}

const migrationData: DataPoint[] = [
  { year: 2015, total: 244, refugees: 21.3, labor: 150 },
  { year: 2016, total: 248, refugees: 22.5, labor: 153 },
  { year: 2017, total: 258, refugees: 25.4, labor: 160 },
  { year: 2018, total: 266, refugees: 27.8, labor: 164 },
  { year: 2019, total: 272, refugees: 29.6, labor: 168 },
  { year: 2020, total: 274, refugees: 31.2, labor: 169 },
  { year: 2021, total: 276, refugees: 33.8, labor: 167 },
  { year: 2022, total: 277, refugees: 36.4, labor: 168 },
  { year: 2023, total: 281, refugees: 38.8, labor: 172 },
  { year: 2024, total: 281.5, refugees: 43.4, labor: 169 },
];

type ChartMode = 'total' | 'refugees' | 'labor';

export default function MigrationChart() {
  const [mode, setMode] = useState<ChartMode>('total');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getData = () => {
    switch (mode) {
      case 'refugees': return migrationData.map(d => d.refugees);
      case 'labor': return migrationData.map(d => d.labor);
      default: return migrationData.map(d => d.total);
    }
  };

  const getLabel = () => {
    switch (mode) {
      case 'refugees': return 'Беженцы';
      case 'labor': return 'Трудовые мигранты';
      default: return 'Всего мигрантов';
    }
  };

  const getColor = () => {
    switch (mode) {
      case 'refugees': return 'hsl(var(--accent))';
      case 'labor': return 'hsl(var(--secondary))';
      default: return 'hsl(var(--primary))';
    }
  };

  const data = getData();
  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;

  const chartWidth = 100;
  const chartHeight = 60;
  const padding = { top: 5, right: 5, bottom: 15, left: 10 };
  const innerWidth = chartWidth - padding.left - padding.right;
  const innerHeight = chartHeight - padding.top - padding.bottom;

  const xScale = (index: number) => padding.left + (index / (data.length - 1)) * innerWidth;
  const yScale = (value: number) => {
    const normalized = (value - minValue) / range;
    return chartHeight - padding.bottom - normalized * innerHeight;
  };

  const pathData = data.map((value, i) => {
    const x = xScale(i);
    const y = yScale(value);
    return i === 0 ? `M ${x},${y}` : `L ${x},${y}`;
  }).join(' ');

  const areaData = `${pathData} L ${xScale(data.length - 1)},${chartHeight - padding.bottom} L ${xScale(0)},${chartHeight - padding.bottom} Z`;

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-semibold text-lg mb-1">Динамика миграции 2015-2024</h3>
          <p className="text-sm text-muted-foreground">{getLabel()}: {data[data.length - 1]}M человек</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant={mode === 'total' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('total')}
          >
            Всего
          </Button>
          <Button
            variant={mode === 'refugees' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('refugees')}
          >
            Беженцы
          </Button>
          <Button
            variant={mode === 'labor' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMode('labor')}
          >
            Трудовые
          </Button>
        </div>
      </div>

      <div className="relative">
        <svg
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-64"
          style={{ overflow: 'visible' }}
        >
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={getColor()} stopOpacity="0.3" />
              <stop offset="100%" stopColor={getColor()} stopOpacity="0.05" />
            </linearGradient>
            <filter id="chartGlow">
              <feGaussianBlur stdDeviation="0.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <g opacity="0.15">
            {[0, 1, 2, 3, 4].map((i) => {
              const y = padding.top + (i / 4) * innerHeight;
              return (
                <line
                  key={i}
                  x1={padding.left}
                  y1={y}
                  x2={chartWidth - padding.right}
                  y2={y}
                  stroke="hsl(var(--border))"
                  strokeWidth="0.3"
                />
              );
            })}
          </g>

          <path
            d={areaData}
            fill="url(#chartGradient)"
          />

          <path
            d={pathData}
            fill="none"
            stroke={getColor()}
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#chartGlow)"
          />

          {data.map((value, i) => {
            const x = xScale(i);
            const y = yScale(value);
            const isHovered = hoveredIndex === i;

            return (
              <g key={i}>
                <circle
                  cx={x}
                  cy={y}
                  r={isHovered ? "1" : "0.6"}
                  fill={getColor()}
                  className="cursor-pointer transition-all duration-200"
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  filter={isHovered ? "url(#chartGlow)" : "none"}
                />
                
                {isHovered && (
                  <g>
                    <rect
                      x={x - 6}
                      y={y - 8}
                      width="12"
                      height="6"
                      rx="1"
                      fill="hsl(var(--card))"
                      stroke={getColor()}
                      strokeWidth="0.2"
                    />
                    <text
                      x={x}
                      y={y - 4.5}
                      fontSize="2.5"
                      fill="hsl(var(--foreground))"
                      textAnchor="middle"
                      className="font-mono font-semibold"
                    >
                      {value}M
                    </text>
                  </g>
                )}

                <text
                  x={x}
                  y={chartHeight - padding.bottom + 4}
                  fontSize="2"
                  fill="hsl(var(--muted-foreground))"
                  textAnchor="middle"
                  className="font-mono"
                >
                  {migrationData[i].year}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <Icon name="TrendingUp" size={14} className="text-primary" />
            <span className="text-muted-foreground">
              Прирост за 10 лет: +{(data[data.length - 1] - data[0]).toFixed(1)}M (+{((data[data.length - 1] / data[0] - 1) * 100).toFixed(1)}%)
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
