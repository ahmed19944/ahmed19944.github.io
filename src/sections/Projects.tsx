import { useState } from 'react';
import type { Project } from '../types/portfolio';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ExternalLink, Play, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
  categories: string[];
}

export function Projects({ projects, categories }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(p => p.platform.includes(activeFilter));

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const handleClose = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedProject) {
      const totalImages = selectedProject.images.length;
      setCurrentImageIndex((prev) => (prev + 1) % totalImages);
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      const totalImages = selectedProject.images.length;
      setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
    }
  };

  const hasMedia = (project: Project) => {
    return project.videos.length > 0 || project.images.length > 0;
  };

  const renderActionButtons = (project: Project) => {
    const actions = project.actions ?? [];
    if (actions.length > 0) {
      return actions.map((action) => (
        <a key={action.label} href={action.url} target="_blank" rel="noopener noreferrer">
          <Button
            variant={action.variant === 'primary' ? 'default' : action.variant ?? 'secondary'}
            className={`${action.variant === 'primary' ? 'bg-orange-500 text-white hover:bg-orange-600' : ''} px-6`}
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            {action.label}
          </Button>
        </a>
      ));
    }

    return (
      <>
        {project.links.download && (
          <a href={project.links.download} target="_blank" rel="noopener noreferrer">
            <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
              <ExternalLink className="w-4 h-4 mr-2" />
              Download
            </Button>
          </a>
        )}
        {project.links.demo && (
          <a href={project.links.demo} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="border-orange-500 text-orange-500 hover:bg-orange-500/10 px-6">
              <Play className="w-4 h-4 mr-2" />
              Live Demo
            </Button>
          </a>
        )}
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noopener noreferrer">
            <Button variant="outline" className="px-6">
              <ExternalLink className="w-4 h-4 mr-2" />
              Source Code
            </Button>
          </a>
        )}
      </>
    );
  };

  return (
    <div className="py-24 bg-background/50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-orange-500 font-mono text-sm">03</span>
            <span className="text-muted-foreground uppercase tracking-wider text-sm">Projects</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Featured <span className="text-orange-500">Work</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl">
            A selection of games and interactive experiences I've developed across various platforms and technologies.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all ${
                activeFilter === category
                  ? 'bg-orange-500 text-white'
                  : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleProjectClick(project)}
              className="group cursor-pointer bg-card border border-border rounded-xl overflow-hidden hover:border-orange-500/50 transition-all hover:shadow-lg hover:shadow-orange-500/10"
            >
              {/* Project Image */}
              <div className="relative aspect-video bg-muted overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="225" fill="hsl(var(--muted))"%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="hsl(var(--muted-foreground))" font-family="sans-serif" font-size="16"%3E' + project.title + '%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="flex items-center gap-2 text-white">
                    {hasMedia(project) ? (
                      <>
                        <Play className="w-5 h-5" />
                        <span className="text-sm font-medium">View Details</span>
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-5 h-5" />
                        <span className="text-sm font-medium">View Details</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="absolute inset-x-4 top-4 flex flex-wrap gap-2">
                  {project.platform.map((platform) => (
                    <span key={platform} className="px-3 py-1 text-[11px] font-semibold uppercase bg-black/70 text-white rounded-full shadow-lg">
                      {platform}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-lg font-bold text-card-foreground mb-3 group-hover:text-orange-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span 
                      key={tag}
                      className="px-2 py-1 text-xs bg-secondary text-secondary-foreground rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Project Dialog - Wider with mobile support */}
        <Dialog open={!!selectedProject} onOpenChange={handleClose}>
          <DialogContent className="!w-[98vw] !sm:w-[96vw] !max-w-[1600px] !sm:max-w-[1600px] min-w-0 bg-card border-border text-foreground max-h-[95vh] overflow-y-auto p-0 gap-0">
            {selectedProject && (
              <>
                {/* Header with close button */}
                <DialogHeader className="sticky top-0 bg-card z-10 px-6 py-4 border-b border-border">
                  <div className="flex items-center justify-between gap-4">
                    <DialogTitle className="text-3xl font-bold text-foreground pr-8">
                      {selectedProject.title}
                    </DialogTitle>
                  </div>
                </DialogHeader>

                <div className="p-6 space-y-8">
                  {/* Header labels */}
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((platform) => (
                      <span key={platform} className="px-3 py-1 text-xs font-semibold uppercase bg-secondary text-secondary-foreground rounded-full">
                        {platform}
                      </span>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-[420px_minmax(0,1fr)] gap-8 min-h-0">
                    <aside className="space-y-6 w-full max-w-full lg:max-w-[420px] min-w-0">
                      <div className="rounded-3xl border border-border bg-card overflow-hidden shadow-sm">
                        <img
                          src={selectedProject.image}
                          alt={selectedProject.title}
                          className="w-full aspect-[4/3] object-cover"
                        />
                        <div className="p-6 space-y-6">
                          <div>
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                              About
                            </h4>
                            <p className="text-foreground leading-relaxed text-sm">
                              {selectedProject.description}
                            </p>
                          </div>

                          <div>
                            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                              Platforms
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {selectedProject.tags.map((tag) => (
                                <span key={tag} className="px-3 py-1 text-[11px] font-semibold uppercase bg-secondary text-secondary-foreground rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div>
                            <h5 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                              Key Features
                            </h5>
                            <ul className="space-y-3 text-sm text-foreground">
                              {selectedProject.keyFeatures.map((feature, index) => (
                                <li key={index} className="flex items-start gap-3">
                                  <span className="mt-1 h-2 w-2 rounded-full bg-orange-500 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            {renderActionButtons(selectedProject)}
                          </div>
                        </div>
                      </div>
                    </aside>

                    <main className="space-y-8 w-full min-w-0">
                      {hasMedia(selectedProject) && (
                        <div className="rounded-3xl border border-border bg-card p-6">
                          <div className="flex items-center justify-between gap-4 mb-6">
                            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                              Media
                            </h4>
                          </div>

                          <div className="grid gap-6 lg:grid-cols-2">
                            {selectedProject.videos.map((video, index) => (
                              <div key={index} className="rounded-3xl overflow-hidden bg-muted shadow-lg aspect-video">
                                <iframe
                                  src={video}
                                  title={`${selectedProject.title} - Video ${index + 1}`}
                                  className="w-full h-full"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowFullScreen
                                />
                              </div>
                            ))}

                            {selectedProject.images.length > 0 && (
                              <div className="relative rounded-3xl overflow-hidden bg-muted shadow-lg aspect-video">
                                <img
                                  src={selectedProject.images[currentImageIndex]}
                                  alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                                  className="absolute inset-0 w-full h-full object-cover"
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).style.display = 'none';
                                  }}
                                />
                                {selectedProject.images.length > 1 && (
                                  <div className="absolute inset-0 flex items-end px-3 pb-3">
                                    <button
                                      onClick={prevImage}
                                      className="rounded-full bg-black/60 p-3 text-white hover:bg-black/80 transition z-10"
                                      aria-label="Previous image"
                                    >
                                      <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <div className="flex-1" />
                                    <button
                                      onClick={nextImage}
                                      className="rounded-full bg-black/60 p-3 text-white hover:bg-black/80 transition z-10"
                                      aria-label="Next image"
                                    >
                                      <ChevronRight className="w-5 h-5" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="rounded-3xl border border-border bg-card p-6">
                        <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-5">
                          My Contributions
                        </h4>
                        <ul className="space-y-4">
                          {selectedProject.contributions.map((contribution, index) => (
                            <li key={index} className="rounded-3xl border border-border bg-background/60 p-4">
                              <div className="flex items-center gap-3 text-sm font-semibold text-foreground mb-2">
                                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white">{index + 1}</span>
                                <span>{contribution.title}</span>
                              </div>
                              <p className="text-sm text-muted-foreground leading-relaxed">
                                {Array.isArray(contribution.description) 
                                  ? contribution.description.map((line, i) => (
                                      <span key={i}>
                                        {line}
                                        {i < contribution.description.length - 1 && <br />}
                                      </span>
                                    ))
                                  : contribution.description}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </main>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
