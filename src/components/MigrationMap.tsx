import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';

interface MigrationFlow {
  from: { x: number; y: number; country: string };
  to: { x: number; y: number; country: string };
  count: number;
  color: string;
}

interface Country {
  name: string;
  x: number;
  y: number;
  region: string;
}

const countries: Country[] = [
  { name: 'США', x: 20, y: 35, region: 'Северная Америка' },
  { name: 'Мексика', x: 18, y: 45, region: 'Северная Америка' },
  { name: 'Канада', x: 22, y: 25, region: 'Северная Америка' },
  { name: 'Великобритания', x: 48, y: 30, region: 'Европа' },
  { name: 'Германия', x: 52, y: 32, region: 'Европа' },
  { name: 'Франция', x: 50, y: 35, region: 'Европа' },
  { name: 'Испания', x: 48, y: 38, region: 'Европа' },
  { name: 'Италия', x: 53, y: 38, region: 'Европа' },
  { name: 'Польша', x: 55, y: 31, region: 'Европа' },
  { name: 'Турция', x: 58, y: 38, region: 'Азия' },
  { name: 'ОАЭ', x: 62, y: 45, region: 'Азия' },
  { name: 'Индия', x: 68, y: 45, region: 'Азия' },
  { name: 'Китай', x: 75, y: 35, region: 'Азия' },
  { name: 'Япония', x: 82, y: 36, region: 'Азия' },
  { name: 'Австралия', x: 82, y: 68, region: 'Океания' },
  { name: 'Бразилия', x: 32, y: 62, region: 'Южная Америка' },
  { name: 'Аргентина', x: 30, y: 72, region: 'Южная Америка' },
  { name: 'ЮАР', x: 55, y: 72, region: 'Африка' },
  { name: 'Египет', x: 55, y: 48, region: 'Африка' },
  { name: 'Нигерия', x: 50, y: 52, region: 'Африка' },
];

export default function MigrationMap({ 
  selectedCountries, 
  selectedRegions, 
  timeRange 
}: { 
  selectedCountries: string[]; 
  selectedRegions: string[]; 
  timeRange: string 
}) {
  const [flows, setFlows] = useState<MigrationFlow[]>([]);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  useEffect(() => {
    const generateFlows = () => {
      const newFlows: MigrationFlow[] = [];
      const colors = ['hsl(var(--flow-blue))', 'hsl(var(--flow-orange))', 'hsl(var(--flow-purple))'];
      
      let filteredCountries = countries;
      
      if (selectedCountries.length > 0) {
        filteredCountries = countries.filter(c => selectedCountries.includes(c.name));
      } else if (selectedRegions.length > 0) {
        filteredCountries = countries.filter(c => selectedRegions.includes(c.region));
      }

      for (let i = 0; i < Math.min(filteredCountries.length, 12); i++) {
        const from = filteredCountries[Math.floor(Math.random() * filteredCountries.length)];
        const to = filteredCountries[Math.floor(Math.random() * filteredCountries.length)];
        
        if (from !== to) {
          newFlows.push({
            from: { x: from.x, y: from.y, country: from.name },
            to: { x: to.x, y: to.y, country: to.name },
            count: Math.floor(Math.random() * 50000) + 10000,
            color: colors[Math.floor(Math.random() * colors.length)]
          });
        }
      }
      
      setFlows(newFlows);
    };

    generateFlows();
    const interval = setInterval(generateFlows, 5000);
    return () => clearInterval(interval);
  }, [selectedCountries, selectedRegions, timeRange]);

  return (
    <Card className="relative w-full h-[600px] bg-card/50 backdrop-blur-sm border-border/50 overflow-hidden">
      <svg 
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {flows.map((flow, index) => {
          const midX = (flow.from.x + flow.to.x) / 2;
          const midY = (flow.from.y + flow.to.y) / 2 - 8;
          
          const path = `M ${flow.from.x},${flow.from.y} Q ${midX},${midY} ${flow.to.x},${flow.to.y}`;
          
          return (
            <g key={`flow-${index}`}>
              <path
                d={path}
                stroke={flow.color}
                strokeWidth="0.3"
                fill="none"
                opacity="0.6"
                strokeDasharray="2 2"
                className="animate-flow"
                style={{
                  animationDelay: `${index * 0.3}s`,
                  filter: 'url(#glow)'
                }}
              />
            </g>
          );
        })}

        {countries.map((country) => {
          const isHighlighted = selectedCountries.includes(country.name) || 
                              selectedRegions.includes(country.region) ||
                              hoveredCountry === country.name;
          
          return (
            <g 
              key={country.name}
              onMouseEnter={() => setHoveredCountry(country.name)}
              onMouseLeave={() => setHoveredCountry(null)}
              className="cursor-pointer"
            >
              <circle
                cx={country.x}
                cy={country.y}
                r={isHighlighted ? "1.5" : "1"}
                fill="hsl(var(--primary))"
                className="transition-all duration-300 animate-pulse-slow"
                style={{
                  filter: isHighlighted ? 'url(#glow)' : 'none',
                  opacity: isHighlighted ? 1 : 0.7
                }}
              />
              {isHighlighted && (
                <text
                  x={country.x}
                  y={country.y - 2.5}
                  fontSize="2.5"
                  fill="hsl(var(--foreground))"
                  textAnchor="middle"
                  className="font-medium pointer-events-none"
                >
                  {country.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="absolute bottom-4 left-4 space-y-2">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-0.5 bg-primary"></div>
          <span className="text-muted-foreground">Миграция (высокая)</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-0.5 bg-accent"></div>
          <span className="text-muted-foreground">Миграция (средняя)</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-0.5 bg-secondary"></div>
          <span className="text-muted-foreground">Миграция (низкая)</span>
        </div>
      </div>
    </Card>
  );
}
