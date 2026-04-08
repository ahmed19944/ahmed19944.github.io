import type { Opportunities, Profile } from '../types/portfolio';
import { Github, Linkedin, Mail, MapPin, Phone, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactProps {
  profile: Profile;
  opportunities: Opportunities;
}

export function Contact({ profile, opportunities }: ContactProps) {
  const contactLinks = [
    {
      icon: Mail,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: Phone,
      label: 'Phone',
      value: profile.phone,
      href: `tel:${profile.phone}`,
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/a-hafez',
      href: profile.social.linkedin,
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'github.com/ahmed19944',
      href: profile.social.github,
    },
  ];

  return (
    <div className="py-24 bg-background relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-orange-500 font-mono text-sm">05</span>
            <span className="text-muted-foreground uppercase tracking-wider text-sm">Contact</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Open to <span className="text-orange-500">Opportunities</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="p-6 bg-card border border-border rounded-xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-orange-500/10 rounded-full flex items-center justify-center">
                  <span className="text-xl font-bold text-orange-500">
                    {profile.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">{profile.name}</h3>
                  <p className="text-muted-foreground">{profile.title}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-muted-foreground mb-6">
                <MapPin className="w-4 h-4" />
                <span>{profile.location}</span>
              </div>

              <a 
                href={profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-medium">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </a>
            </div>

            {/* Contact Links */}
            <div className="grid sm:grid-cols-2 gap-4">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 p-4 bg-card/50 border border-border rounded-xl hover:border-orange-500/30 hover:bg-card transition-all group"
                >
                  <div className="p-2 bg-secondary rounded-lg group-hover:bg-orange-500/10 transition-colors">
                    <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-orange-500 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider">{link.label}</p>
                    <p className="text-sm text-foreground font-medium truncate max-w-[180px]">
                      {link.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Message Form Placeholder / CTA */}
          <div className="flex flex-col justify-center">
            <div className="p-8 bg-gradient-to-br from-card/80 to-card/40 border border-border rounded-xl">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                Open to Opportunities
              </h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {opportunities.description}
              </p>
              
              <div className="space-y-4">
                {opportunities.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
