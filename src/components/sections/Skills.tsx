import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Code, Layout, Database, Cloud, Users, Wrench, Brain, Cpu, Server } from 'lucide-react';

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code,
    skills: [
      "JavaScript",
      "TypeScript",
      "C++",
      "Python",
      "SQL"
    ],
  },
  {
    title: "Frontend",
    icon: Layout,
    skills: [
      "React",
      "Next.js",
      "Tailwind CSS",
      "ShadCN UI",
      "Framer Motion",
      "HTML5",
      "CSS3"
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "JWT Authentication",
      "Prisma ORM",
      "Mongoose",
      "Zod Validation"
    ],
  },
  {
    title: "Databases & Cache",
    icon: Database,
    skills: [
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "MySQL",
      "Supabase"
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      "Docker",
      "GitHub Actions",
      "Vercel",
      "Render",
      "Neon",
      "PM2"
    ],
  },
  {
    title: "AI & Machine Learning",
    icon: Brain,
    skills: [
      "OpenRouter",
      "Gemini API",
      "Scikit-learn",
      "Pandas",
      "NumPy"
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Swagger",
      "Jest",
      "k6"
    ],
  },
  {
    title: "Computer Science",
    icon: Cpu,
    skills: [
      "Data Structures & Algorithms",
      "Object-Oriented Programming",
      "Low-Level Design",
      "System Design",
      "Operating Systems",
      "DBMS"
    ],
  },
];

export const Skills = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="section-padding bg-card/30 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container-custom" ref={containerRef}>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm mb-4 block">{'// Skills'}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono mb-4">
            My <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Technologies I use to design, build, and scale digital products
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="bg-gradient-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all group shadow-card"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <category.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-mono font-semibold text-foreground">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.3, delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                    className="px-3 py-1.5 text-sm font-medium bg-secondary/50 text-foreground rounded-full border border-border hover:border-primary/50 hover:bg-primary/10 hover:text-primary transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
