import type { ExperienceItem } from '../types/portfolio';
import { Briefcase, Calendar } from 'lucide-react';

interface ExperienceProps {
  experience: ExperienceItem[];
}

export function Experience({ experience }: ExperienceProps) {
  return (
    <div className="py-24 bg-secondary/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-orange-500 font-mono text-sm">02</span>
            <span className="text-muted-foreground uppercase tracking-wider text-sm">Experience</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Work <span className="text-orange-500">History</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />

          <div className="space-y-12">
            {experience.map((job, index) => (
              <div 
                key={job.id}
                className={`relative grid md:grid-cols-2 gap-8 ${
                  index % 2 === 0 ? '' : 'md:text-right'
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 top-0 w-4 h-4 -translate-x-1/2 bg-orange-500 rounded-full border-4 border-background hidden md:block" />

                {/* Content */}
                <div className={`${index % 2 === 0 ? 'md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                  <div className="p-6 bg-card border border-border rounded-xl hover:border-orange-500/30 transition-all group">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-secondary rounded-lg flex items-center justify-center">
                        {job.logo ? (
                          <img src={job.logo} alt={`${job.company} logo`} className="w-6 h-6 object-contain" />
                        ) : (
                          <Briefcase className="w-6 h-6 text-orange-500" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground group-hover:text-orange-500 transition-colors">
                          {job.position}
                        </h3>
                        <p className="text-muted-foreground">{job.company}</p>
                      </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{job.startDate} - {job.endDate}</span>
                      {job.current && (
                        <span className="ml-2 px-2 py-0.5 text-xs bg-green-500/10 text-green-500 rounded-full">
                          Current
                        </span>
                      )}
                    </div>

                    {/* Responsibilities */}
                    <ul className="space-y-2 mb-4">
                      {job.responsibilities.map((resp, i) => (
                        <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                          • {resp.split(':')[0]}: {resp.split(':')[1]}
                        </li>
                      ))}
                    </ul>

                    {/* Tags */}
                    <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                      {job.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
