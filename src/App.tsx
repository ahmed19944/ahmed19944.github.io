import { useState, useEffect } from 'react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Experience } from './sections/Experience';
import { Projects } from './sections/Projects';
import { Education } from './sections/Education';
import { Contact } from './sections/Contact';
import { ThemeProvider } from './contexts/ThemeContext';
import { ThemeToggle } from './components/ThemeToggle';
import { BackgroundAnimation } from './components/BackgroundAnimation';
import type { PortfolioData } from './types/portfolio';
import './App.css';

function AppContent() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [activeTab, setActiveTab] = useState('home');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./data/portfolio.json?t=' + Date.now(), { cache: 'no-cache' })
      .then(res => res.json())
      .then((data: PortfolioData) => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading portfolio data:', err);
        setLoading(false);
      });
  }, []);

  const scrollToSection = (sectionId: string) => {
    setActiveTab(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'experience', 'education', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveTab(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading || !data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-muted-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Background Animation */}
      <BackgroundAnimation />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button 
              onClick={() => scrollToSection('home')}
              className="text-lg font-bold tracking-tight text-foreground hover:text-orange-500 transition-colors"
            >
              {data.profile.name.split(' ').map(n => n[0]).join('')}
            </button>

            {/* Desktop Navigation */}
            <Tabs value={activeTab} className="hidden md:block">
              <TabsList className="bg-secondary/50 border border-border/50">
                <TabsTrigger 
                  value="home" 
                  onClick={() => scrollToSection('home')}
                  className="text-muted-foreground hover:text-foreground data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  Home
                </TabsTrigger>
                <TabsTrigger 
                  value="about" 
                  onClick={() => scrollToSection('about')}
                  className="text-muted-foreground hover:text-foreground data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  About
                </TabsTrigger>
                <TabsTrigger 
                  value="projects" 
                  onClick={() => scrollToSection('projects')}
                  className="text-muted-foreground hover:text-foreground data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  Projects
                </TabsTrigger>
                <TabsTrigger 
                  value="experience" 
                  onClick={() => scrollToSection('experience')}
                  className="text-muted-foreground hover:text-foreground data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  Experience
                </TabsTrigger>
                <TabsTrigger 
                  value="education" 
                  onClick={() => scrollToSection('education')}
                  className="text-muted-foreground hover:text-foreground data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  Education
                </TabsTrigger>
                <TabsTrigger 
                  value="contact" 
                  onClick={() => scrollToSection('contact')}
                  className="text-muted-foreground hover:text-foreground data-[state=active]:bg-orange-500 data-[state=active]:text-white"
                >
                  Contact
                </TabsTrigger>
              </TabsList>
            </Tabs>

            {/* Right Side Actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <ThemeToggle />

              {/* Resume Button */}
              <a 
                href={data.profile.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
              >
                Resume
              </a>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <select 
                  value={activeTab}
                  onChange={(e) => scrollToSection(e.target.value)}
                  className="bg-secondary border border-border text-foreground text-sm rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="home">Home</option>
                  <option value="about">About</option>
                  <option value="projects">Projects</option>
                  <option value="experience">Experience</option>
                  <option value="education">Education</option>
                  <option value="contact">Contact</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-16 relative z-10">
        <section id="home">
          <Hero profile={data.profile} about={data.about} onScrollToProjects={() => scrollToSection('projects')} />
        </section>
        <section id="about">
          <About about={data.about} />
        </section>
        <section id="projects">
          <Projects projects={data.projects} categories={data.filterCategories} />
        </section>
        <section id="experience">
          <Experience experience={data.experience} />
        </section>
        <section id="education">
          <Education education={data.education} certificates={data.certificates} />
        </section>
        <section id="contact">
          <Contact profile={data.profile} opportunities={data.opportunities} />
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-border/50 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {data.profile.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
