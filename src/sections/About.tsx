import type { About as AboutType } from '../types/portfolio';
import { Gamepad2, Code, Cpu, Monitor } from 'lucide-react';

interface AboutProps {
  about: AboutType;
}

export function About({ about }: AboutProps) {
  const skillCategories = [
    {
      icon: Gamepad2,
      title: 'Game Engines',
      skills: about.skills.gameEngines,
    },
    {
      icon: Code,
      title: 'Languages',
      skills: about.skills.languages,
    },
    {
      icon: Cpu,
      title: 'Technologies',
      skills: about.skills.technologies,
    },
    {
      icon: Monitor,
      title: 'Platforms',
      skills: about.skills.platforms,
    },
  ];

  return (
    <div className="py-24 bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-orange-500 font-mono text-sm">01</span>
            <span className="text-muted-foreground uppercase tracking-wider text-sm">About Me</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Who I <span className="text-orange-500">Am</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Description */}
          <div className="space-y-8">
            <p className="text-lg text-muted-foreground leading-relaxed">
              {about.description}
            </p>
            
            <div className="p-6 bg-card border border-border rounded-xl">
              <p className="text-foreground leading-relaxed">
                {about.cardDescription}
              </p>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {skillCategories.map((category) => (
              <div 
                key={category.title}
                className="p-6 bg-card/50 border border-border rounded-xl hover:border-orange-500/30 transition-colors"
              >
                <category.icon className="w-8 h-8 text-orange-500 mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span 
                      key={skill}
                      className="px-3 py-1 text-sm bg-secondary text-secondary-foreground rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
