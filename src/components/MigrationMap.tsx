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

        <g opacity="0.3">
          <path d="M 10,20 L 15,22 L 20,25 L 25,28 L 28,32 L 30,40 L 28,48 L 25,52 L 22,55 L 18,58 L 12,60 L 10,58 L 8,52 L 7,45 L 8,38 L 9,32 L 10,28 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 15,60 L 18,62 L 22,65 L 25,70 L 28,75 L 30,82 L 28,88 L 25,90 L 20,88 L 15,85 L 12,80 L 11,72 L 12,65 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 20,15 L 25,12 L 30,10 L 35,12 L 38,18 L 38,25 L 35,30 L 30,32 L 25,30 L 22,25 L 20,20 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 45,25 L 48,26 L 50,28 L 52,31 L 51,35 L 49,38 L 46,39 L 43,37 L 42,33 L 43,29 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 48,28 L 51,29 L 54,30 L 57,29 L 59,26 L 58,23 L 55,22 L 52,23 L 50,26 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 47,32 L 50,33 L 53,36 L 54,40 L 52,43 L 48,44 L 45,42 L 44,38 L 45,35 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 46,36 L 48,37 L 50,40 L 49,43 L 46,44 L 43,42 L 43,39 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 51,35 L 54,36 L 57,39 L 58,42 L 56,45 L 53,46 L 50,44 L 49,40 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 53,28 L 57,29 L 60,31 L 62,35 L 61,40 L 58,42 L 54,41 L 52,37 L 52,32 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 56,35 L 60,36 L 64,39 L 66,43 L 65,48 L 62,51 L 58,52 L 55,50 L 54,45 L 55,40 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 60,42 L 64,43 L 68,45 L 70,49 L 68,53 L 64,54 L 60,52 L 58,48 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 64,38 L 70,40 L 75,43 L 78,48 L 78,54 L 75,58 L 70,60 L 65,58 L 62,53 L 62,47 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 72,28 L 78,30 L 82,33 L 85,38 L 84,43 L 80,46 L 75,45 L 71,42 L 70,37 L 71,32 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 80,32 L 85,33 L 88,36 L 89,41 L 87,45 L 83,46 L 79,44 L 78,39 L 79,35 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 78,60 L 84,62 L 88,65 L 90,70 L 88,76 L 84,80 L 78,82 L 72,80 L 70,75 L 71,68 L 75,63 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 28,55 L 33,58 L 37,62 L 39,68 L 38,75 L 35,80 L 30,82 L 25,79 L 23,73 L 24,65 L 26,60 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 26,68 L 30,70 L 34,75 L 35,82 L 33,88 L 28,90 L 23,87 L 21,81 L 22,75 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 52,68 L 57,70 L 60,75 L 59,80 L 56,83 L 51,82 L 48,78 L 48,73 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 52,45 L 56,46 L 59,49 L 60,54 L 58,58 L 54,59 L 50,57 L 49,52 L 50,48 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
          
          <path d="M 47,48 L 51,50 L 54,54 L 54,59 L 51,62 L 47,63 L 43,60 L 42,55 L 44,51 Z" 
                fill="none" stroke="hsl(var(--border))" strokeWidth="0.15" />
        </g>

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