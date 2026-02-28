import { useQuery, useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

interface InsertContactMessage {
  name: string;
  email: string;
  message: string;
}

// Fetch Projects
export function useProjects() {
  return useQuery({
    queryKey: ["/data/projects.json"],
    queryFn: async () => {
      const res = await fetch("/data/projects.json");
      if (!res.ok) throw new Error("Failed to fetch projects");
      const data = await res.json();
      // Transform snake_case from JSON to camelCase
      return data.map((p: any) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        details: p.details || [],
        tags: p.tags,
        imageUrl: p.image_url || p.imageUrl,
        link: p.link,
        featured: p.featured,
        createdAt: p.created_at ? new Date(p.created_at) : new Date(),
      }));
    },
  });
}

// Fetch Skills
export function useSkills() {
  return useQuery({
    queryKey: ["/data/skills.json"],
    queryFn: async () => {
      const res = await fetch("/data/skills.json");
      if (!res.ok) throw new Error("Failed to fetch skills");
      return res.json();
    },
  });
}

// Fetch Experiences
export function useExperiences() {
  return useQuery({
    queryKey: ["/data/experiences.json"],
    queryFn: async () => {
      const res = await fetch("/data/experiences.json");
      if (!res.ok) throw new Error("Failed to fetch experiences");
      const data = await res.json();
      return data.sort((a: any, b: any) => a.order - b.order);
    },
  });
}

// Contact Form Mutation
export function useContactMutation() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertContactMessage) => {
      // On static hosting, we can't process contact form server-side
      // For now, just simulate success. You can integrate a third-party 
      // form service like Netlify Forms, Formspree, or EmailJS later.
      console.log("Contact form submitted:", data);
      return { id: 1, ...data, createdAt: new Date() };
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thanks for reaching out! I'll get back to you soon.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
