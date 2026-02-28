import { Section } from "@/components/Section";
import { Navbar } from "@/components/Navbar";
import { ProjectCard } from "@/components/ProjectCard";
import { useProjects, useSkills, useExperiences, useContactMutation } from "@/hooks/use-portfolio";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Mail, Terminal, Brain, Server, Loader2, Code, Database, Cpu, X, CheckCircle2, Shield, Cloud } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactMessageSchema, type Experience } from "@/types/portfolio";
import { z } from "zod";
import { MatrixBackground } from "@/components/MatrixBackground";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function Home() {
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: skills, isLoading: skillsLoading } = useSkills();
  const { data: experiences, isLoading: experiencesLoading } = useExperiences();
  const contactMutation = useContactMutation();
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  const form = useForm({
    resolver: zodResolver(insertContactMessageSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  const onSubmit = (data: z.infer<typeof insertContactMessageSchema>) => {
    contactMutation.mutate(data, {
      onSuccess: () => form.reset(),
    });
  };

  const categories = {
    "Generative AI": <Brain className="w-5 h-5" />,
    "Backend Systems": <Server className="w-5 h-5" />,
    "Machine Learning & Analysis": <Shield className="w-5 h-5" />,
    "Cloud & Infrastructure": <Cloud className="w-5 h-5" />,
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-mono selection:bg-primary selection:text-primary-foreground crt-screen">
      <MatrixBackground />
      <Navbar />

      {/* HERO SECTION */}
      <section id="about" className="relative min-h-screen flex items-center pt-20 px-4">
        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-3 py-1 mb-6 border border-primary/30 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest terminal-text">
                PROTOCOL: PORTFOLIO_V2.0.4
              </div>
              
              <h1 className="text-6xl md:text-9xl font-bold leading-[0.8] mb-8 glow-text uppercase tracking-tighter">
                Zarrar
                <br />
                <span className="text-primary glitch-hover inline-block">Hussain</span>
              </h1>

              <div className="flex items-center gap-4 mb-8">
                <div className="h-px flex-1 bg-primary/20" />
                <span className="text-primary font-bold uppercase tracking-[0.2em] text-sm whitespace-nowrap">
                  Senior AI Engineer & Architect
                </span>
                <div className="h-px flex-1 bg-primary/20" />
              </div>

              <p className="text-lg text-muted-foreground max-w-xl mb-12 leading-relaxed font-mono">
                Executing high-impact intelligence deployments across <span className="text-primary underline decoration-primary/30">Generative AI</span>, 
                <span className="text-primary underline decoration-primary/30"> Computer Vision</span>, and 
                <span className="text-primary underline decoration-primary/30"> Distributed Backends</span>. 
                5+ years of verified production runtime.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#projects"
                  onClick={(e) => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({behavior: 'smooth'}) }}
                  className="px-8 py-4 bg-primary text-primary-foreground font-bold flex items-center gap-2 glow-primary uppercase tracking-tighter"
                >
                  LOAD_MODULES <ArrowRight className="w-5 h-5" />
                </motion.a>
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="#contact"
                  onClick={(e) => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({behavior: 'smooth'}) }}
                  className="px-8 py-4 border border-primary/20 text-foreground font-bold flex items-center gap-2 hover:bg-primary/10 transition-all uppercase tracking-tighter"
                >
                  PING_USER <Mail className="w-5 h-5" />
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="w-full aspect-square border border-primary/10 bg-primary/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-10 group-hover:opacity-20 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Cpu className="w-64 h-64 text-primary/20 animate-pulse" />
                </div>
                <AnimatePresence>
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: -100, opacity: 0.5 }}
                      transition={{ duration: 3 + i, repeat: Infinity, ease: "linear", delay: i }}
                      className="absolute text-[10px] text-primary/40 font-mono"
                      style={{ left: `${20 * i}%` }}
                    >
                      {`0x${Math.random().toString(16).slice(2, 6)}`}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION - REIMAGINED AS A TERMINAL GRID */}
      <Section id="skills" title="Skill Matrix" subtitle="Operational Tech-Stack Deployment">
        {skillsLoading ? (
          <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.keys(categories).map((category, idx) => {
              const categorySkills = skills?.filter(s => s.category === category) || [];
              if (categorySkills.length === 0) return null;

              return (
                <motion.div 
                  key={category} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="hacker-card bg-black/40 border border-primary/20 overflow-hidden"
                >
                  <div className="bg-primary/10 px-4 py-2 border-b border-primary/20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-primary/60" />
                      <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{category}</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-500/50" />
                      <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
                      <div className="w-2 h-2 rounded-full bg-green-500/50" />
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-wrap gap-3">
                    {categorySkills.map((skill) => (
                      <motion.div
                        key={skill.id}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(var(--primary), 0.15)" }}
                        className="px-3 py-1.5 border border-primary/10 bg-primary/5 text-[11px] font-bold uppercase tracking-wider text-primary/80 hover:text-primary transition-all cursor-default flex items-center gap-2"
                      >
                        <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse shadow-[0_0_5px_var(--primary)]" />
                        {skill.name}
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </Section>

      {/* EXPERIENCE SECTION */}
      <Section id="experience" title="Deployment Logs" subtitle="Historical Operations Narrative" className="bg-card/5">
        {experiencesLoading ? (
          <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="max-w-4xl mx-auto space-y-4">
            {experiences?.sort((a, b) => a.order - b.order).map((exp, idx) => (
              <motion.div 
                key={exp.id} 
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                onClick={() => setSelectedExp(exp)}
                className="hacker-card p-8 group/exp cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Code className="w-4 h-4 text-primary/40" />
                      <h3 className="font-bold text-xl text-primary uppercase tracking-tight group-hover:glow-text transition-all">{exp.role}</h3>
                    </div>
                    <div className="text-sm font-bold opacity-70 uppercase tracking-[0.3em] mb-4 flex items-center gap-2">
                      <Database className="w-3 h-3" /> {exp.company}
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed font-mono border-l-2 border-primary/10 pl-4 py-1 line-clamp-2">
                      {exp.description}
                    </p>
                    <div className="mt-4 text-[10px] font-bold text-primary uppercase tracking-[0.2em] group-hover:opacity-100 opacity-0 transition-opacity">
                      VIEW_DEPLOYMENT_DETAILS
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-primary/50 bg-primary/5 px-3 py-1 border border-primary/10 self-start uppercase tracking-widest">
                    {exp.duration}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </Section>

      {/* EXPERIENCE MODAL */}
      <Dialog open={!!selectedExp} onOpenChange={(open) => !open && setSelectedExp(null)}>
        <DialogContent className="max-w-3xl bg-card border-primary/30 p-8 rounded-none z-[9999] focus:outline-none pointer-events-auto">
          {selectedExp && (
            <>
              <div className="flex items-center gap-3 mb-6">
                <Terminal className="w-6 h-6 text-primary" />
                <DialogTitle className="text-4xl font-bold uppercase tracking-tighter text-primary glow-text">
                  {selectedExp.role}
                </DialogTitle>
              </div>
              
              <DialogDescription className="sr-only">
                Professional operational log for {selectedExp.role} at {selectedExp.company}.
              </DialogDescription>

              <div className="flex items-center gap-4 mb-8 text-sm font-bold uppercase tracking-[0.2em]">
                <span className="text-primary">{selectedExp.company}</span>
                <span className="text-primary/40">//</span>
                <span className="text-muted-foreground">{selectedExp.duration}</span>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary/60">
                    <Code className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Op_Summary</span>
                  </div>
                  <p className="text-muted-foreground font-mono leading-relaxed">
                    {selectedExp.description}
                  </p>
                </div>

                <div className="space-y-4 bg-primary/5 p-6 border border-primary/10">
                  <div className="flex items-center gap-2 text-primary/60 mb-4">
                    <Terminal className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-widest">Log_Highlights</span>
                  </div>
                  <ul className="space-y-4">
                    {selectedExp.details?.map((detail, idx) => (
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

              <div className="mt-8 pt-4 border-t border-primary/10 text-[10px] font-mono text-primary/40 uppercase tracking-[0.3em]">
                VERIFIED_DEPLOYMENT // SECURE_LOG_ACCESS
              </div>
              
              <button 
                onClick={() => setSelectedExp(null)}
                className="absolute top-4 right-4 p-2 bg-background/80 border border-primary/20 text-primary hover:bg-primary/20 transition-all z-[10001]"
              >
                <X className="w-5 h-5" />
              </button>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* PROJECTS SECTION */}
      <Section id="projects" title="Core Repositories" subtitle="Neural Systems & Distributed Architectures">
        {projectsLoading ? (
          <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
        ) : (
          <div className="flex flex-wrap justify-center gap-8">
            {projects?.map((project) => (
              <div key={project.id} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-[400px]">
                <ProjectCard project={project} />
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* CONTACT SECTION */}
      <Section id="contact" title="Initialize Comms" subtitle="Secure Tunnel Establishment" className="bg-card/5">
        <div className="max-w-xl mx-auto hacker-card p-10">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-4">
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase mb-2 tracking-widest opacity-50">Identity_Token</label>
                <input
                  {...form.register("name")}
                  className="w-full px-4 py-4 bg-background border border-primary/10 focus:border-primary outline-none transition-all font-mono text-sm placeholder:opacity-20"
                  placeholder="USER_ID"
                />
              </div>
              
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase mb-2 tracking-widest opacity-50">Return_Route</label>
                <input
                  {...form.register("email")}
                  className="w-full px-4 py-4 bg-background border border-primary/10 focus:border-primary outline-none transition-all font-mono text-sm placeholder:opacity-20"
                  placeholder="ADDR@NETWORK.COM"
                />
              </div>
              
              <div className="relative">
                <label className="block text-[10px] font-bold uppercase mb-2 tracking-widest opacity-50">Transmission_Data</label>
                <textarea
                  {...form.register("message")}
                  rows={4}
                  className="w-full px-4 py-4 bg-background border border-primary/10 focus:border-primary outline-none transition-all resize-none font-mono text-sm placeholder:opacity-20"
                  placeholder="ENCRYPTED_PAYLOAD..."
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={contactMutation.isPending}
              className="w-full py-5 bg-primary text-primary-foreground font-bold hover:brightness-110 transition-all disabled:opacity-50 glow-primary uppercase tracking-[0.4em] text-xs"
            >
              {contactMutation.isPending ? "TRANSMITTING..." : "EXECUTE_TRANSMISSION"}
            </motion.button>
          </form>
        </div>
      </Section>
      
      <footer className="py-12 text-center border-t border-primary/10">
        <div className="text-[10px] font-mono uppercase tracking-[0.5em] text-primary/30">
          © {new Date().getFullYear()} Zarrar Hussain // ACCESS_LEVEL: ROOT
          <br />
          <span className="mt-2 block opacity-50">STAY_CURIOUS // SYSTEM_STABLE</span>
        </div>
      </footer>
    </div>
  );
}
