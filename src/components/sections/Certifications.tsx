import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, ExternalLink, Calendar, CheckCircle } from "lucide-react";

const certifications = [
  {
    title: "OCI 2025 Certified DevOps Professional",
    platform: "Oracle Cloud Infrastructure",
    year: "2025",
    description:
      "Automation pipelines, CI/CD orchestration, and cloud-native deployments using OCI services.",
    icon: "⚙️",
    verified: true,
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=99BCDB69412186A355A64DCA8E1B7A8418C718B39D39990A3D22855FC6633A77",
  },
  {
    title: "OCI 2025 Certified Generative AI Professional",
    platform: "Oracle Cloud Infrastructure",
    year: "2025",
    description:
      "Building AI-driven applications, LLM workflows, prompt engineering, and model integration.",
    icon: "🤖",
    verified: true,
    url: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=611BAE152B933C1E6F3AE7357556B3235940FE189C206579C03502389BB960FE",
  },
  {
    title: "OCI 2025 Certified Data Science Professional",
    platform: "Oracle Cloud Infrastructure",
    year: "2025",
    description:
      "End-to-end model training, tuning, and deployment pipelines using OCI Data Science tools.",
    icon: "📊",
    verified: true,
    url: "https://catalog-education.oracle.com/pls/certview/sharebadge?id=99BCDB69412186A355A64DCA8E1B7A8406D379CACE9DC69365200EFD2395ED7A",
  },
  {
    title: "Machine Learning & Data Science",
    platform: "CipherSchools",
    year: "2025",
    description:
      "Hands-on learning in ML fundamentals, workflows, and visualization using real datasets.",
    icon: "🧠",
    verified: true,
    url: "https://www.cipherschools.com/certificate/preview?id=687d61ad3eaa79325b2d2815",
  },
  {
    title: "Java Programming",
    platform: "iamneo (NIIT Venture)",
    year: "2025",
    description:
      "Core Java, OOP principles, problem-solving, and application-level implementation.",
    icon: "☕",
    verified: true,
    url: "https://lpucolab438.examly.io/certificate/U2FsdGVkX19Cs8xkN6jEaJhR4zWAUWt3KKk0L%2FW5dpM%3D",
  },
  {
    title: "Cloud Computing",
    platform: "IIT Kharagpur — NPTEL",
    year: "2025",
    description:
      "Cloud concepts, virtualization, scalability models, and distributed system foundations.",
    icon: "🌩️",
    verified: true,
    url: "https://internalapp.nptel.ac.in/NOC/NOC25/SEM1/Ecertificates/106/noc25-cs11/Course/NPTEL25CS11S143730195604239718.pdf",
  },
];

const achievements = [
  {
    icon: "🔥",
    title: "300+ LeetCode Problems",
    description: "Solved across arrays, graphs, DP, recursion & more"
  },
  {
    icon: "💡",
    title: "500+ Coding Problems",
    description: "Across GFG, LeetCode, HackerRank and other platforms"
  },
  {
    icon: "🏆",
    title: "5+ Deployed Websites",
    description: "Production-ready apps live on the internet"
  },
  {
    icon: "🚀",
    title: "Growing Every Day",
    description: "Consistently improving problem-solving & development skills"
  }
];


export const Certifications = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="section-padding bg-background relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-custom" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm mb-4 block">
            {"// 05. Credentials"}
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono mb-4">
            Certifications & <span className="text-gradient">Achievements</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            Continuous learning and growth through professional certifications
          </p>

          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {certifications.map((cert, index) => (
            <motion.a
              key={cert.title}
              href={cert.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-gradient-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all shadow-card block"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-3xl">{cert.icon}</div>

                <div className="flex items-center gap-2">
                  {cert.verified && (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  )}
                  <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

              <h3 className="font-mono font-bold mb-2 group-hover:text-primary transition-colors">
                {cert.title}
              </h3>

              <div className="flex items-center gap-2 mb-2">
                <Award className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">{cert.platform}</span>
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {cert.description}
              </p>

              <div className="flex items-center gap-2 text-xs text-primary font-mono">
                <Calendar className="w-3 h-3" />
                {cert.year}
              </div>
            </motion.a>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mb-8"
        >
          <h3 className="text-2xl font-bold font-mono mb-2">
            Other <span className="text-primary">Achievements</span>
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              className="bg-secondary/30 border border-border rounded-lg p-4 text-center hover:border-primary/30 transition-colors"
            >
              <div className="text-2xl mb-2">{achievement.icon}</div>

              <h4 className="font-mono font-semibold text-sm mb-1">
                {achievement.title}
              </h4>

              <p className="text-xs text-muted-foreground">
                {achievement.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
