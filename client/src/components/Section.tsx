import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, title, subtitle, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("py-20 md:py-32 relative overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {(title || subtitle) && (
          <div className="mb-12 md:mb-20">
            {title && (
              <h2 className="text-3xl md:text-5xl font-bold mb-4 uppercase tracking-tighter text-primary">
                <span className="opacity-50 font-mono mr-4">//</span>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-muted-foreground text-sm md:text-base max-w-2xl font-mono uppercase opacity-70">
                [ STATUS: {subtitle} ]
              </p>
            )}
          </div>
        )}
        
        <div>
          {children}
        </div>
      </div>
      
      {/* Matrix-like subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00ff0008_1px,transparent_1px),linear-gradient(to_bottom,#00ff0008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none z-0" />
    </section>
  );
}
