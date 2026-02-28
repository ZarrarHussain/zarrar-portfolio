import { type Project } from "@/types/portfolio";
import { ExternalLink, Terminal, X, Code, CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export function ProjectCard({ project }: { project: Project }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.div
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer"
      >
        <Card className="hacker-card group h-full">
          <div className="flex flex-col h-full">
            <div className="relative h-48 md:h-64 overflow-hidden border-b border-primary/20 bg-primary/5">
              <img
                src={project.imageUrl || ""}
                alt={project.title}
                className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary glow-text">Online</span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                <div className="flex flex-wrap gap-2">
                  {project.tags.slice(0, 3).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-[9px] font-mono border-primary/40 bg-background/80 backdrop-blur-sm text-primary uppercase h-5"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <CardContent className="p-6 flex-1 flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <Terminal className="w-5 h-5 text-primary opacity-50" />
                <h3 className="text-xl font-bold uppercase text-primary tracking-tight group-hover:glow-text transition-all line-clamp-1">
                  {project.title}
                </h3>
              </div>
              
              <p className="text-muted-foreground text-xs font-mono mb-6 leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity line-clamp-3">
                {project.description}
              </p>

              <div className="mt-auto pt-4 border-t border-primary/5">
                <span className="inline-flex items-center gap-2 text-xs font-bold text-primary group-hover:text-primary/70 transition-all uppercase tracking-[0.2em]">
                  INITIALIZE_DETAILS_MODE
                </span>
              </div>
            </CardContent>
          </div>
        </Card>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl bg-card border-primary/30 p-0 overflow-hidden rounded-none z-[9999] focus:outline-none pointer-events-auto">
          <div className="relative h-64 w-full">
            <img 
              src={project.imageUrl || ""} 
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
              alt={project.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 p-2 bg-background/80 border border-primary/20 text-primary hover:bg-primary/20 transition-all z-[10001]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-8">
            <div className="flex items-center gap-3 mb-4">
              <Terminal className="w-6 h-6 text-primary" />
              <DialogTitle className="text-4xl font-bold uppercase tracking-tighter text-primary glow-text">
                {project.title}
              </DialogTitle>
            </div>
            
            <DialogDescription className="sr-only">
              Detailed breakdown of {project.title} project modules and execution highlights.
            </DialogDescription>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="text-xs font-mono border-primary/40 text-primary uppercase"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div className="flex items-center gap-2 text-primary/60 mb-2">
                  <Code className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">System_Brief</span>
                </div>
                <p className="text-muted-foreground leading-relaxed font-mono">
                  {project.description}
                </p>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-bold uppercase tracking-widest text-xs glow-primary hover:brightness-110 transition-all"
                  >
                    ACCESS_LIVE_NODE <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>

              <div className="space-y-6 bg-primary/5 p-6 border border-primary/10">
                <div className="flex items-center gap-2 text-primary/60 mb-4">
                  <Terminal className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Execution_Highlights</span>
                </div>
                <ul className="space-y-4">
                  {project.details?.map((detail, idx) => (
                    <motion.li 
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex gap-3 text-sm font-mono text-muted-foreground leading-snug"
                    >
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                      {detail}
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-primary/5 p-4 text-[10px] font-mono text-primary/40 uppercase tracking-[0.3em] border-t border-primary/10">
            METADATA: STATUS_STABLE // VERSION_7.4.2 // CLASSIFIED_INTEL
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
