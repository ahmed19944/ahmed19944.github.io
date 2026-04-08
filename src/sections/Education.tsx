import type { EducationItem, Certificate } from '../types/portfolio';
import { GraduationCap, Award, Calendar } from 'lucide-react';

interface EducationProps {
  education: EducationItem[];
  certificates: Certificate[];
}

export function Education({ education, certificates }: EducationProps) {
  return (
    <div className="py-24 bg-secondary/30 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-orange-500 font-mono text-sm">04</span>
            <span className="text-muted-foreground uppercase tracking-wider text-sm">Education</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground">
            Academic <span className="text-orange-500">Background</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Education Cards */}
          <div className="lg:col-span-2 space-y-6">
            {education.map((edu) => (
              <div 
                key={edu.id}
                className="p-6 bg-card border border-border rounded-xl hover:border-orange-500/30 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-secondary rounded-lg">
                    <GraduationCap className="w-6 h-6 text-orange-500" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-1">
                      {edu.institution}
                    </h3>
                    <p className="text-muted-foreground mb-2">
                      {edu.degree} in {edu.field}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{edu.startYear} - {edu.endYear}</span>
                    </div>
                    <ul className="space-y-1">
                      {edu.details.map((detail, i) => (
                        <li key={i} className="text-sm text-muted-foreground">
                          • {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Certificates */}
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-500" />
              Certificates
            </h3>
            <div className="space-y-4">
              {certificates.map((cert, index) => (
                <div 
                  key={index}
                  className="p-4 bg-card/50 border border-border rounded-lg"
                >
                  <h4 className="font-medium text-foreground mb-1">{cert.name}</h4>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-8 p-6 bg-card/50 border border-border rounded-xl">
              <h3 className="text-lg font-semibold text-foreground mb-4">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Education</span>
                  <span className="text-foreground font-medium">Bachelor + Diploma</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Field</span>
                  <span className="text-foreground font-medium">Game Development</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Graduation</span>
                  <span className="text-foreground font-medium">2017 - 2018</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
