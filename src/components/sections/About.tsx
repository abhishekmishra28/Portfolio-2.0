import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { Code2, Coffee, Briefcase, Users } from 'lucide-react';

const stats = [
  { icon: Code2, value: 25, suffix: '+', label: 'Projects Built' },
  { icon: Coffee, value: 800, suffix: '+', label: 'Cups of Coffee' },
  { icon: Briefcase, value: 1, suffix: '+', label: 'Years Experience' },
  { icon: Users, value: 98, suffix: '%', label: 'Client Satisfaction' },
];

const CountUp = ({ target, suffix }: { target: number; suffix: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export const About = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section id="about" className="section-padding bg-background relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-custom" ref={containerRef}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-primary text-sm mb-4 block">{'// 01. About Me'}</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono mb-4">
            Who <span className="text-gradient">I Am</span>
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
          {/* Code Block Illustration */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
              <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs font-mono text-muted-foreground ml-4">about.ts</span>
              </div>

              <div className="p-6 font-mono text-sm leading-relaxed">
                <div className="text-muted-foreground">
                  <span className="text-purple-400">const</span>{' '}
                  <span className="text-primary">developer</span>{' '}
                  <span className="text-muted-foreground">=</span> {'{'}
                </div>

                <div className="pl-4 mt-2">
                  <div>
                    <span className="text-muted-foreground">name:</span>{' '}
                    <span className="text-green-400">"Abhishek Kumar Mishra"</span>,
                  </div>

                  <div>
                    <span className="text-muted-foreground">title:</span>{' '}
                    <span className="text-green-400">
                      "Full-Stack Developer & AI Enthusiast"
                    </span>,
                  </div>

                  <div>
                    <span className="text-muted-foreground">location:</span>{' '}
                    <span className="text-green-400">"India"</span>,
                  </div>

                  <div>
                    <span className="text-muted-foreground">passion:</span>{' '}
                    <span className="text-green-400">
                      "Crafting scalable, intuitive and intelligent applications"
                    </span>,
                  </div>

                  <div className="mt-2">
                    <span className="text-muted-foreground">skills:</span> [
                  </div>

                  <div className="pl-4">
                    <span className="text-green-400">"Next.js"</span>,{' '}
                    <span className="text-green-400">"TypeScript"</span>,{' '}
                    <span className="text-green-400">"Node.js"</span>,{' '}
                    <span className="text-green-400">"Machine Learning"</span>
                  </div>

                  <div>],</div>

                  <div className="mt-2">
                    <span className="text-muted-foreground">available:</span>{' '}
                    <span className="text-purple-400">true</span>
                  </div>
                </div>

                <div>{'};'}</div>
              </div>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2"
          >
            <h3 className="text-2xl md:text-3xl font-bold font-mono mb-6">
              Crafting <span className="text-primary">Smart</span> Digital Solutions
            </h3>

            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I’m a full-stack developer focused on building modern, scalable and
                user-centric web applications. My journey started with curiosity — and
                grew into a passion for solving problems with technology.
              </p>

              <p>
                My work combines frontend craftsmanship with strong backend architecture,
                while exploring how AI and Machine Learning can enhance user experiences
                and automation.
              </p>

              <p>
                Outside of coding, I love experimenting with new tools, improving my
                problem-solving skills, collaborating with other developers and sharing
                what I learn.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {[
                'Problem Solver',
                'AI Enthusiast',
                'Clean Code Advocate',
                'Lifelong Learner'
              ].map((trait) => (
                <span
                  key={trait}
                  className="px-4 py-2 rounded-full bg-secondary/50 border border-border text-sm font-mono text-primary"
                >
                  {trait}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              className="bg-gradient-card border border-border rounded-xl p-6 text-center group hover:border-primary/50 transition-colors shadow-card"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>

              <div className="text-3xl md:text-4xl font-bold font-mono text-foreground mb-2">
                <CountUp target={stat.value} suffix={stat.suffix} />
              </div>

              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
