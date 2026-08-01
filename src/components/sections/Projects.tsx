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
    "title": "RateShield",
    "description": "Production-grade distributed API rate limiting service with Redis, PostgreSQL, and multiple rate limiting algorithms.",
    "longDescription": "RateShield is a scalable backend service that protects APIs from abuse using Token Bucket and Sliding Window algorithms. It leverages Redis Lua scripts for atomic operations, PostgreSQL for client management, Docker for deployment, and follows clean architecture with comprehensive testing and CI/CD.",
    "image": "/rateshield.svg",
    "tags": [
      "Node.js",
      "Express.js",
      "Redis",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "JWT",
      "Zod",
      "Swagger",
      "Jest",
      "CI/CD"
    ],
    "liveUrl": "",
    "githubUrl": "https://github.com/abhishekmishra28/RateShield",
    "featured": true,
    "features": [
      "Token Bucket & Sliding Window algorithms",
      "Atomic Redis Lua scripts for concurrency safety",
      "API Key Authentication",
      "Admin dashboard for client management",
      "Real-time analytics",
      "Swagger API documentation",
      "Docker & Docker Compose support",
      "GitHub Actions CI/CD",
      "Jest unit & integration tests",
      "Horizontal scaling architecture"
    ]
  },
  {
    "title": "SplitMate",
    "description": "Financial-grade shared expense platform with advanced split algorithms and intelligent CSV import.",
    "longDescription": "SplitMate is a full-stack expense management platform built for roommates and groups. It supports equal, unequal, percentage, and share-based expense splitting, temporal memberships, intelligent CSV import with anomaly detection, Razorpay settlements, and transparent audit trails.",
    "image": "/splitmate.png",
    "tags": [
      "React",
      "Node.js",
      "Express.js",
      "PostgreSQL",
      "Prisma",
      "JWT",
      "Razorpay",
      "Tailwind CSS"
    ],
    "liveUrl": "",
    "githubUrl": "https://github.com/abhishekmishra28/SplitMate",
    "featured": true,
    "features": [
      "JWT Authentication",
      "Equal, Unequal, Percentage & Share-based splits",
      "Temporal group memberships",
      "Smart CSV importer with anomaly detection",
      "Razorpay payment integration",
      "Peer-to-peer settlements",
      "Transparent balance audit",
      "Expense history & analytics"
    ]
  },
  {
    "title": "Mini CRM",
    "description": "AI-native CRM platform with customer segmentation, campaign management, analytics, and AI assistant.",
    "longDescription": "Mini CRM is a full-stack customer relationship management platform for fashion brands featuring AI-powered audience segmentation, campaign management across multiple communication channels, customer analytics, and an OpenRouter-powered CRM assistant.",
    "image": "/minicrm.png",
    "tags": [
      "React",
      "TypeScript",
      "Node.js",
      "Express.js",
      "MongoDB",
      "OpenRouter",
      "AI",
      "Tailwind CSS"
    ],
    "liveUrl": "",
    "githubUrl": "https://github.com/abhishekmishra28/Mini-CRM",
    "featured": true,
    "features": [
      "AI-powered customer segmentation",
      "Dashboard with revenue & customer analytics",
      "Campaign management (WhatsApp, SMS, Email, RCS)",
      "Real-time campaign simulation",
      "OpenRouter AI assistant",
      "Customer order history",
      "Audience builder",
      "Performance analytics dashboard"
    ]
  },
  {
    title: "BloodBridge",
    description: "Full-stack MERN Blood Donation Management System.",
    longDescription:
      "A scalable platform connecting donors, recipients, and hospitals with real-time booking, blood requests, and role-based dashboards. Includes secure authentication, admin analytics, and donation eligibility logic.",
    image: "/bloodbridge.png",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "JWT", "Recharts"],
    liveUrl: "https://blood-bridge-rho.vercel.app/",
    githubUrl: "https://github.com/abhishekmishra28/bloodbridge",
    featured: true,
    features: [
      "Role-based dashboards (Admin & User)",
      "Blood donation slot booking system",
      "Blood request with urgency filtering",
      "3-month donation restriction logic",
      "JWT authentication & protected routes",
      "Admin analytics dashboard with charts",
      "Real-time notifications (polling)",
    ],
  },
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
    title: "C++ Banking System with SQLite Integration",
    description:
      "Modular banking backend in C++ with SQLite, featuring clean architecture, OOP design, and real-world financial system components.",
    longDescription:
      "This project is a fully modular banking system developed in modern C++ using Object-Oriented Programming principles and SQLite for persistent storage. It simulates a real-world banking backend with features such as account management (savings and current), deposits, withdrawals, transfers, fraud detection, loan processing, notifications, and audit logging. The system follows a layered architecture with clear separation of concerns across models, services, security, and infrastructure layers, reflecting industry-level design patterns and best practices.",
    image: "/Project7.png",
    tags: ["C++", "OOP", "SQLite", "System Design", "Backend Development"],
    liveUrl: "https://github.com/abhishekmishra28/AgniDB", 
    githubUrl: "https://github.com/abhishekmishra28/AgniDB",
    featured: true,
    features: [
      "Account management (Savings & Current accounts)",
      "Deposit, withdrawal, and fund transfer operations",
      "Fraud detection system",
      "Loan processing module",
      "Notification system",
      "Audit logging",
      "SQLite-based persistent storage",
      "Layered architecture with separation of concerns",
      "Implements Encapsulation, Inheritance, Polymorphism, and Abstraction",
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
  }
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
