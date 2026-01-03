import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { GraduationCap, Briefcase, Calendar } from 'lucide-react';

const timelineData = [
  // --- WORK / PROJECTS ---

  {
    type: "work",
    title: "Freelance Full-Stack Developer — E-Commerce Jewellery Platform",
    organization: "Client Project",
    period: "Apr 2025 – Jul 2025",
    description:
      "Built a scalable jewellery e-commerce platform with dynamic rate-based pricing, secure authentication, and admin/user panels. Achieved 30% faster load time and 45% increased engagement through optimized queries.",
    highlights: [
      "Next.js 14, TypeScript, Supabase, Tailwind CSS, Lucide React",
      "Streamlined product workflows and improved overall UX",
      "Responsive UI with full-stack integrations"
    ],
    icon: Briefcase,
  },

  {
    type: "work",
    title: "GiffyDuck — AI-Powered Notes & Writing Assistant",
    organization: "Personal Project",
    period: "Jan 2025 – Mar 2025",
    description:
      "Developed an AI-first note-taking & creative writing app featuring search, tagging, AI-generated insights, and OOP-structured code.",
    highlights: [
      "Improved search speed by 45% and reduced code complexity by 30%",
      "Increased session duration by 50% with UX refinements",
      "Built with Next.js, TypeScript, Supabase, Tailwind CSS"
    ],
    icon: Briefcase,
  },

  {
    type: "work",
    title: "Arya Bhumi Seva Sansthan — NGO Portal",
    organization: "Freelance Project",
    period: "Oct 2024 – Dec 2024",
    description:
      "Designed a full-stack NGO platform supporting donation campaigns, membership modules, and multilingual UI. Reduced manual tasks by 70%.",
    highlights: [
      "Optimized DB queries for 35% faster loads and 40% quicker rendering",
      "Implemented modules for events, initiatives, and donations",
      "Next.js, TypeScript, Supabase, Tailwind CSS"
    ],
    icon: Briefcase,
  },

  // --- TRAINING ---

  {
    type: "work",
    title: "Machine Learning & Data Science Training",
    organization: "Cipher Schools",
    period: "May 2025 – Jul 2025",
    description:
      "Hands-on ML training covering predictive analytics, model building, evaluation, and visualization using real datasets.",
    highlights: [
      "Python, NumPy, Pandas, Matplotlib, Scikit-learn",
      "Supervised & unsupervised learning, feature engineering",
      "Cross-validation, hyperparameter tuning, evaluation metrics"
    ],
    icon: GraduationCap,
  },

  // --- EDUCATION ---

  {
    type: "education",
    title: "Bachelor of Technology — CSE (CGPA: 8.2)",
    organization: "Lovely Professional University",
    period: "Aug 2023 – Present",
    description:
      "Focused on full-stack development, algorithms, machine learning, and system design.",
    location: "Phagwara, Punjab",
    icon: GraduationCap,
  },

  {
    type: "education",
    title: "Intermediate (Science) — 81%",
    organization: "LA Garden High School",
    period: "Apr 2020 – Mar 2022",
    location: "Ranchi, Jharkhand",
    description:
      "Strengthened mathematics, computer fundamentals, and analytical thinking.",
    icon: GraduationCap,
  },

  {
    type: "education",
    title: "Matriculation — 94%",
    organization: "BP DAV Public School",
    period: "Apr 2018 – Mar 2020",
    location: "Garhwa, Jharkhand",
    description:
      "Excelled academically and participated in problem-solving and tech competitions.",
    icon: GraduationCap,
  },
];


export const Timeline = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="timeline" className="section-padding bg-card/30 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container-custom" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm mb-4 block">{'// My Journey'}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono mb-4">
            Education & <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of my professional growth and educational background
          </p>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <motion.div
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative flex items-start gap-6 md:gap-0 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ml-10 md:ml-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <div className="bg-gradient-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors shadow-card">
                    <div className={`flex items-center gap-2 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="text-sm font-mono text-primary">{item.period}</span>
                    </div>
                    <h3 className="font-mono font-bold text-lg text-foreground mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground mb-3">{item.organization}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                  <item.icon className="w-4 h-4 text-primary-foreground" />
                </div>

                {/* Empty space for alignment on desktop */}
                <div className="hidden md:block flex-1" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
