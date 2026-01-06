import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

const socialLinks = [
  { icon: Github, href: 'https://github.com/abhishekmishra28', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/abhishekmishra028', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:abhishekltr2002@gmail.com', label: 'Email' },
];

export const Hero = () => {
  const handleScrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-hero pt-16 md:pt-20 scroll-mt-20"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(64,224,208,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(64,224,208,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-pulse-glow" />
      <div
        className="absolute bottom-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-[100px] animate-pulse-glow"
        style={{ animationDelay: '1s' }}
      />

      <div className="container-custom relative z-10">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <span className="inline-block font-mono text-primary text-sm md:text-base mb-4">
                {'>'} Hello, World! I am
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold font-mono mb-4"
            >
              <span className="text-foreground">Abhishek</span>{' '}
              <span className="text-gradient">Kr. Mishra</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-2xl md:text-3xl lg:text-4xl font-mono text-muted-foreground mb-6"
            >
              Software Engineer
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              I enjoy building things that are functional, fast, and visually appealing. From
              frontend interfaces to backend systems, I love working across the stack. My curiosity
              drives me toward AI and Machine Learning, where I explore data-driven solutions and
              automation. Problem solving is at the core of my work — finding elegant solutions to
              complex challenges is what motivates me.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8"
            >
              <Button
                size="lg"
                onClick={handleScrollToContact}
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-mono group"
              >
                Get in Touch
                <Mail className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground font-mono group"
              >
                <a
                  href="/MyResume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center"
                >
                  <Eye className="mr-2 w-4 h-4 group-hover:-translate-y-1 transition-transform" />
                  View Resume
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-3 rounded-lg bg-secondary/50 border border-border text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-[60px]" />

              <div className="relative w-full h-full rounded-full border-2 border-primary/30 p-1">
                <div className="w-full h-full rounded-full bg-gradient-card overflow-hidden border border-border">
                  <img
                    src="/profile.png"
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 rounded-full border border-dashed border-primary/20"
              />

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -right-4 top-8 bg-card border border-border rounded-lg px-4 py-2 shadow-card"
              >
                <code className="text-xs font-mono text-primary">{'<Developer />'}</code>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 }}
                className="absolute -left-4 bottom-8 bg-card border border-border rounded-lg px-4 py-2 shadow-card flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-mono text-muted-foreground">
                  Available for work
                </span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-muted-foreground"
          />
        </motion.div>
      </div>
    </section>
  );
};
