"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { ExternalLink, Github, Folder } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const projects = [
  {
    title: "GiffyDuck Notes",
    description:
      "AI-powered note-taking & creative writing platform with real-time sync and search.",
    longDescription:
      "GiffyDuck is a feature-rich application designed for academic organizations and creative expression. It includes AI-powered insights, tag management, full-text search, and real-time syncing using Supabase.",
    image: "/Project4.png",
    tags: ["Next.js", "TypeScript", "Tailwind", "Supabase", "ShadCN", "AI", "Gemini"],
    liveUrl: "https://www.giffyduck.com",
    githubUrl: "https://github.com/abhishekmishra28/GiffyDuck-Notes",
    featured: true,
    features: [
      "AI-powered note enhancements",
      "Creative writing tools",
      "Full-text search engine",
      "Custom tagging system",
      "Real-time database sync",
      "Beautiful UI with ShadCN + Tailwind",
    ],
  },
  {
    title: "AgniDB — B-Tree Database Engine",
    description:
      "Crash-safe B-Tree database engine built from scratch with persistence, LRU cache and dirty page tracking.",
    longDescription:
      "AgniDB is a fully-custom database engine written in modern C++ (C++20). It supports persistent storage, a 100-page LRU cache, dirty-page tracking, safe cascading deletes, and selective write optimization. Designed with reliability in mind, it survives crashes, validates structure integrity, and passes 40/40 automated tests.",
    image: "/Project7.png",
    tags: ["C++20", "Systems Programming", "Database", "B-Tree", "LRU Cache"],
    liveUrl: "https://github.com/abhishekmishra28/AgniDB",   // repo acts as live reference
    githubUrl: "https://github.com/abhishekmishra28/AgniDB",
    featured: true,
    features: [
      "Production-grade B-Tree engine",
      "Crash-safe persistent storage",
      "LRU caching with dirty-page tracking",
      "Full CRUD and range queries",
      "Freelist validation and corruption protection",
      "40/40 automated tests passing",
    ],
  },
  {
    title: "Crop Recommendation System",
    description:
      "Machine learning system that predicts the best crop using soil & climate parameters.",
    longDescription:
      "This ML-based system analyzes soil nutrients and weather data to recommend optimal crops. Multiple ML models were trained, evaluated, and deployed with Streamlit for live predictions.",
    image: "/Project5.png",
    tags: ["Python", "Scikit-learn", "Pandas", "NumPy", "Streamlit", "ML"],
    liveUrl: "https://crop-recommendation-system-45.streamlit.app/",
    githubUrl:
      "https://github.com/abhishekmishra28/Crop-Recommendation-System",
    featured: true,
    features: [
      "Real-time crop predictions",
      "Model comparison dashboard",
      "High-accuracy Random Forest model",
      "Feature importance visualization",
      "Interactive Streamlit web UI",
    ],
  },

  {
    title: "Soni Jewellers",
    description:
      "Production e-commerce site with dynamic metal pricing & admin dashboard.",
    longDescription:
      "A jewellery e-commerce platform built with Next.js 14 and Supabase. Includes authentication, wishlist/cart, metal-rate pricing engine, and a full admin dashboard.",
    image: "/Project1.png",
    tags: ["Next.js 14", "TypeScript", "Tailwind", "Supabase", "Auth", "ShadCN"],
    liveUrl: "https://www.soninavratnajewellers.in",
    githubUrl: "https://github.com/abhishekmishra28/Soni-Jewellers",
    featured: true,
    features: [
      "Google OAuth + Email login",
      "Wishlist & shopping cart",
      "Dynamic price calculations",
      "Order management system",
      "Admin analytics dashboard",
    ],
  },

  {
    title: "Arya Bhumi Seva Sansthan",
    description: "Donation & welfare platform deployed on VPS using PM2.",
    longDescription:
      "Built for an NGO to manage donations and social initiatives. Includes authentication, multilingual UI, and VPS deployment using PM2.",
    image: "/Project2.png",
    tags: ["Next.js", "TypeScript", "Tailwind", "PM2", "Supabase Auth", "VPS"],
    liveUrl: "https://aryabhumisevasansthan.org",
    githubUrl:
      "https://github.com/abhishekmishra28/AryaBhumiSevaSanathan",
    featured: true,
    features: [
      "Multilingual user interface",
      "Secure authentication",
      "Healthcare & education modules",
      "Responsive design",
      "PM2 VPS deployment",
    ],
  },

  {
    title: "My Portfolio",
    description: "Motion-rich portfolio with terminal-themed UI sections.",
    longDescription:
      "My personal portfolio built with modern animation techniques, coding-styled components, and dark/light theme support.",
    image: "/Project3.png",
    tags: ["Next.js 14", "TypeScript", "Tailwind", "Framer Motion", "Rive", "ShadCN"],
    liveUrl: "/",
    githubUrl: "https://github.com/abhishekmishra28/MyPortfolio",
    featured: false,
    features: [
      "Framer Motion animations",
      "Rive interactive elements",
      "Terminal-style About section",
      "Dark mode support",
      "Interactive project showcase",
    ],
  },
];

const allTags = ["All", ...new Set(projects.flatMap((p) => p.tags))];

export const Projects = () => {
  const [filter, setFilter] = useState("All");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const filteredProjects =
    filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter));

  return (
    <section id="projects" className="section-padding bg-card/30 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container-custom" ref={containerRef}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="font-mono text-primary text-sm mb-4 block">
            {"// 04. Projects"}
          </span>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono mb-4">
            Featured <span className="text-gradient">Work</span>
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto">
            A selection of projects that showcase my skills and passion for development
          </p>

          <div className="w-20 h-1 bg-primary mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {allTags.slice(0, 10).map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={`px-4 py-2 text-sm font-mono rounded-full transition-all ${
                filter === tag
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 text-muted-foreground hover:text-primary border border-border hover:border-primary/50"
              }`}
            >
              {tag}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, index) => (
            <Dialog key={project.title}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                layout
              >
                {/* CARD */}
                <DialogTrigger asChild>
                  <div className="group bg-gradient-card border border-border rounded-xl overflow-hidden hover:border-primary/30 transition-all shadow-card cursor-pointer">
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      {project.featured && (
                        <div className="absolute top-3 left-3 px-2 py-1 bg-primary/90 text-primary-foreground text-xs font-mono rounded">
                          Featured
                        </div>
                      )}
                    </div>

                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Folder className="w-4 h-4 text-primary" />
                        <h3 className="font-mono font-bold text-lg">
                          {project.title}
                        </h3>
                      </div>

                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs font-mono bg-secondary/50 text-muted-foreground rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogTrigger>

                {/* MODAL */}
                <DialogContent className="max-w-4xl max-h-[85vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">
                      {project.title}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="grid md:grid-cols-2 gap-6 mt-3">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="rounded-lg border object-contain"
                    />

                    <div>
                      <p className="text-muted-foreground mb-4">
                        {project.longDescription}
                      </p>

                      <h4 className="font-semibold mb-2">Key Features</h4>
                      <ul className="space-y-1 text-sm mb-6">
                        {project.features.map((f) => (
                          <li key={f}>• {f}</li>
                        ))}
                      </ul>

                      <div className="flex gap-4">
                        <Button asChild>
                          <a href={project.githubUrl} target="_blank">
                            <Github className="mr-2 h-4 w-4" />
                            Code
                          </a>
                        </Button>

                        <Button asChild variant="outline">
                          <a href={project.liveUrl} target="_blank">
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Live Demo
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </motion.div>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
