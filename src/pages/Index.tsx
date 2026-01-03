import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Hero } from '@/components/sections/Hero';
import { About } from '@/components/sections/About';
import { Skills } from '@/components/sections/Skills';
import Stats from '@/components/sections/Stats';
import { Projects } from '@/components/sections/Projects';
import { Certifications } from '@/components/sections/Certifications';
import { Timeline } from '@/components/sections/Timeline';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />

      <main>
        <div id="home">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <div id="skills">
          <Skills />
        </div>
        <div id="stats">
          <Stats />
        </div>
        <div id="projects">
          <Projects />
        </div>
        <div id="certifications">
          <Certifications />
        </div>
        <div id="timeline">
          <Timeline />
        </div>
        <div id="testimonials">
          <Testimonials />
        </div>
        <div id="contact">
          <Contact />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Index;