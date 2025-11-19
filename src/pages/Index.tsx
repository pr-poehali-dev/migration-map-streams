import { useState } from 'react';
import MigrationMap from '@/components/MigrationMap';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

const regions = ['Европа', 'Азия', 'Северная Америка', 'Южная Америка', 'Африка', 'Океания'];
const countries = [
  'США', 'Мексика', 'Канада', 'Великобритания', 'Германия', 'Франция', 
  'Испания', 'Италия', 'Польша', 'Турция', 'ОАЭ', 'Индия', 
  'Китай', 'Япония', 'Австралия', 'Бразилия', 'Аргентина', 'ЮАР', 'Египет', 'Нигерия'
];

export default function Index() {
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [timeRange, setTimeRange] = useState('2024');

  const toggleCountry = (country: string) => {
    setSelectedCountries(prev => 
      prev.includes(country) ? prev.filter(c => c !== country) : [...prev, country]
    );
  };

  const toggleRegion = (region: string) => {
    setSelectedRegions(prev => 
      prev.includes(region) ? prev.filter(r => r !== region) : [...prev, region]
    );
  };

  const clearFilters = () => {
    setSelectedCountries([]);
    setSelectedRegions([]);
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Icon name="Globe" className="text-primary" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight">MigrationFlow</h1>
                <p className="text-xs text-muted-foreground">Анализ миграционных потоков в реальном времени</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-6">
              <a href="#map" className="text-sm font-medium hover:text-primary transition-colors">Карта</a>
              <a href="#stats" className="text-sm font-medium hover:text-primary transition-colors">Статистика</a>
              <a href="#analytics" className="text-sm font-medium hover:text-primary transition-colors">Аналитика</a>
              <a href="#methodology" className="text-sm font-medium hover:text-primary transition-colors">Методология</a>
              <a href="#about" className="text-sm font-medium hover:text-primary transition-colors">О проекте</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8">
        <section id="map" className="space-y-4">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight mb-2">Глобальная карта миграции</h2>
              <p className="text-muted-foreground">Визуализация миграционных потоков между странами</p>
            </div>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Выберите период" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024 год</SelectItem>
                <SelectItem value="2023">2023 год</SelectItem>
                <SelectItem value="2022">2022 год</SelectItem>
                <SelectItem value="2021">2021 год</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <Card className="lg:col-span-3">
              <MigrationMap 
                selectedCountries={selectedCountries}
                selectedRegions={selectedRegions}
                timeRange={timeRange}
              />
            </Card>

            <div className="space-y-4">
              <Card className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Фильтры</h3>
                  {(selectedCountries.length > 0 || selectedRegions.length > 0) && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Сбросить
                    </Button>
                  )}
                </div>

                <Tabs defaultValue="regions" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="regions">Регионы</TabsTrigger>
                    <TabsTrigger value="countries">Страны</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="regions" className="space-y-2 mt-4">
                    {regions.map(region => (
                      <Button
                        key={region}
                        variant={selectedRegions.includes(region) ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => toggleRegion(region)}
                      >
                        {region}
                      </Button>
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="countries" className="space-y-2 mt-4 max-h-[400px] overflow-y-auto">
                    {countries.map(country => (
                      <Button
                        key={country}
                        variant={selectedCountries.includes(country) ? "default" : "outline"}
                        size="sm"
                        className="w-full justify-start"
                        onClick={() => toggleCountry(country)}
                      >
                        {country}
                      </Button>
                    ))}
                  </TabsContent>
                </Tabs>
              </Card>
            </div>
          </div>
        </section>

        <section id="stats" className="space-y-6">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">Статистика миграции 2024</h2>
            <p className="text-muted-foreground">Данные ООН и Всемирного банка по состоянию на ноябрь 2024 года</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Icon name="Users" className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Всего мигрантов</p>
                  <p className="text-2xl font-bold font-mono">281.5M</p>
                  <Badge variant="outline" className="mt-1">
                    <Icon name="TrendingUp" size={12} className="mr-1" />
                    +3.6% с 2023
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/20 flex items-center justify-center">
                  <Icon name="ArrowRightLeft" className="text-accent" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Беженцы и просители убежища</p>
                  <p className="text-2xl font-bold font-mono">43.4M</p>
                  <Badge variant="outline" className="mt-1">
                    <Icon name="AlertTriangle" size={12} className="mr-1" />
                    +12% с 2023
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-secondary/20 flex items-center justify-center">
                  <Icon name="Globe2" className="text-secondary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Трудовые мигранты</p>
                  <p className="text-2xl font-bold font-mono">169M</p>
                  <Badge variant="outline" className="mt-1">
                    <Icon name="Briefcase" size={12} className="mr-1" />
                    60% от общего числа
                  </Badge>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Icon name="TrendingUp" className="text-primary" size={24} />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Денежные переводы</p>
                  <p className="text-2xl font-bold font-mono">$656B</p>
                  <Badge variant="outline" className="mt-1">
                    <Icon name="DollarSign" size={12} className="mr-1" />
                    Мировой объем
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="Users" className="text-primary" size={20} />
                <h3 className="font-semibold">Демография мигрантов</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Мужчины</span>
                  <span className="font-mono font-semibold">52%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Женщины</span>
                  <span className="font-mono font-semibold">48%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Средний возраст</span>
                  <span className="font-mono font-semibold">39 лет</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Дети до 18 лет</span>
                  <span className="font-mono font-semibold">14%</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="MapPin" className="text-accent" size={20} />
                <h3 className="font-semibold">Основные коридоры 2024</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Мексика → США</span>
                  <span className="font-mono font-semibold">11.2M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Сирия → Турция</span>
                  <span className="font-mono font-semibold">3.6M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Индия → ОАЭ</span>
                  <span className="font-mono font-semibold">3.5M</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Украина → Польша</span>
                  <span className="font-mono font-semibold">2.9M</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Icon name="TrendingUp" className="text-secondary" size={20} />
                <h3 className="font-semibold">Тренды 2024</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <Icon name="ArrowUp" className="text-green-500 mt-0.5" size={16} />
                  <div className="flex-1">
                    <p className="text-sm">Климатическая миграция</p>
                    <p className="text-xs text-muted-foreground">+18% (21.5M человек)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="ArrowUp" className="text-green-500 mt-0.5" size={16} />
                  <div className="flex-1">
                    <p className="text-sm">Цифровые кочевники</p>
                    <p className="text-xs text-muted-foreground">+35% (40M человек)</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Icon name="Minus" className="text-yellow-500 mt-0.5" size={16} />
                  <div className="flex-1">
                    <p className="text-sm">Студенческая миграция</p>
                    <p className="text-xs text-muted-foreground">Стабильно (6.1M)</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="analytics" className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Аналитика</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Топ направлений миграции</h3>
              <div className="space-y-4">
                {[
                  { from: 'Мексика', to: 'США', count: '12.5M', color: 'bg-primary' },
                  { from: 'Индия', to: 'ОАЭ', count: '3.8M', color: 'bg-accent' },
                  { from: 'Китай', to: 'США', count: '2.9M', color: 'bg-secondary' },
                  { from: 'Польша', to: 'Германия', count: '2.1M', color: 'bg-primary' },
                  { from: 'Турция', to: 'Германия', count: '1.5M', color: 'bg-accent' },
                ].map((route, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded ${route.color}/20 flex items-center justify-center`}>
                      <span className="text-xs font-bold">{i + 1}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{route.from} → {route.to}</p>
                      <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                        <div 
                          className={`${route.color} h-1.5 rounded-full`}
                          style={{ width: `${100 - i * 15}%` }}
                        ></div>
                      </div>
                    </div>
                    <span className="text-sm font-mono font-semibold">{route.count}</span>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Распределение по регионам</h3>
              <div className="space-y-4">
                {[
                  { region: 'Европа', percentage: 87, count: '87M', color: 'bg-primary' },
                  { region: 'Азия', percentage: 86, count: '86M', color: 'bg-secondary' },
                  { region: 'Северная Америка', percentage: 59, count: '59M', color: 'bg-accent' },
                  { region: 'Африка', percentage: 25, count: '25M', color: 'bg-primary' },
                  { region: 'Южная Америка', percentage: 15, count: '15M', color: 'bg-secondary' },
                  { region: 'Океания', percentage: 9, count: '9M', color: 'bg-accent' },
                ].map((data, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{data.region}</span>
                      <span className="text-sm font-mono">{data.count}</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`${data.color} h-2 rounded-full transition-all duration-1000`}
                        style={{ width: `${data.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </section>

        <section id="methodology" className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">Методология</h2>
          <Card className="p-6">
            <div className="prose prose-invert max-w-none">
              <p className="text-muted-foreground mb-4">
                Данные о миграции собираются из официальных источников международных организаций,
                включая ООН, Всемирный банк и национальные статистические агентства.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Database" className="text-primary" size={20} />
                    <h4 className="font-semibold">Источники данных</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Агрегация данных из 50+ международных и национальных баз данных
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="RefreshCw" className="text-accent" size={20} />
                    <h4 className="font-semibold">Обновление</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ежемесячное обновление статистики и ежегодная ревизия исторических данных
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Icon name="Shield" className="text-secondary" size={20} />
                    <h4 className="font-semibold">Точность</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Валидация через перекрестную проверку и статистическое моделирование
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </section>

        <section id="about" className="space-y-4">
          <h2 className="text-3xl font-bold tracking-tight">О проекте</h2>
          <Card className="p-6">
            <p className="text-muted-foreground mb-6">
              MigrationFlow — это независимый проект по визуализации и анализу глобальных
              миграционных процессов. Наша цель — сделать сложные данные о миграции
              понятными и доступными для всех.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Открытые данные</Badge>
              <Badge variant="outline">Интерактивная визуализация</Badge>
              <Badge variant="outline">Реальное время</Badge>
              <Badge variant="outline">Глобальный охват</Badge>
            </div>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © 2024 MigrationFlow. Данные предоставлены международными организациями.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Контакты
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                API
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Документация
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}