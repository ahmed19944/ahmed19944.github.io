import { Button } from '@/components/ui/button';
import { Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import type { Profile, About as AboutType } from '../types/portfolio';
import { useTheme } from '@/contexts/ThemeContext';

interface HeroProps {
  profile: Profile;
  about: AboutType;
  onScrollToProjects: () => void;
}

export function Hero({ profile, about, onScrollToProjects }: HeroProps) {
  const { theme } = useTheme();

  const scrollToAbout = () => {
    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-center relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${
        theme === 'dark' 
          ? 'bg-gradient-to-br from-background via-zinc-900/50 to-background' 
          : 'bg-gradient-to-br from-background via-orange-50/30 to-background'
      }`} />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-secondary/80 border border-border rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Available for opportunities
              </span>
            </div>

            {/* Name & Title */}
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="text-foreground">Ahmed</span>
                <br />
                <span className="text-orange-500">Abd El-Hafez</span>
              </h1>
              <p className="text-xl sm:text-2xl text-muted-foreground font-light">
                {profile.title}
              </p>
            </div>

            {/* Tagline */}
            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              {profile.tagline}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button 
                onClick={onScrollToProjects}
                className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-6"
              >
                View Projects
              </Button>
              <Button 
                variant="outline"
                onClick={scrollToAbout}
                className="border-border text-foreground hover:bg-secondary"
              >
                About Me
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-4">
              <a 
                href={profile.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href={profile.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href={`mailto:${profile.email}`}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Content - Stats */}
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-6">
              {about.stats.map((stat) => (
                <div key={stat.label} className="p-6 bg-card border border-border rounded-xl hover:border-orange-500/30 transition-colors">
                  <div className="text-4xl font-bold text-orange-500 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:block">
          <button 
            onClick={scrollToAbout}
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span className="text-xs uppercase tracking-wider">Scroll</span>
            <ChevronDown className="w-5 h-5 animate-bounce" />
          </button>
        </div>
      </div>
    </div>
  );
}
