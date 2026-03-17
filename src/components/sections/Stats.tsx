"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Code, Star } from "lucide-react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const LEETCODE_USER = "abhishekmishra2002";
const GITHUB_USER = "abhishekmishra28";

export default function Stats() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const [leet, setLeet] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [repos, setRepos] = useState<any[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers: any = {};

    (async () => {
      try {
        // ----- LeetCode -----
        const res = await fetch(
          `https://leetcode-api-faisalshohag.vercel.app/${LEETCODE_USER}`
        );
        const d = await res.json();

        const heatmap = Object.entries(d.submissionCalendar || {}).map(
          ([t, c]) => ({
            date: new Date(parseInt(t) * 1000).toISOString().split("T")[0],
            count: c as number,
          })
        );

        setLeet({
          total: d.totalSolved,
          easy: d.easySolved,
          medium: d.mediumSolved,
          hard: d.hardSolved,
          heatmap,
        });

        // ----- GitHub profile overview -----
        const user = await fetch(
          `https://api.github.com/users/${GITHUB_USER}`,
          { headers }
        ).then((r) => r.json());
        setProfile(user);

        // ----- Top repos -----
        try {
          const repoData = await fetch(
            `https://api.github.com/users/${GITHUB_USER}/repos`,
            { headers }
          ).then((r) => r.json());

          // Check if repoData is a valid array
          if (Array.isArray(repoData) && repoData.length > 0) {
            setRepos(
              repoData
                .sort(
                  (a: any, b: any) => b.stargazers_count - a.stargazers_count
                )
                .slice(0, 4)
            );
          } else {
            setRepos(null);
          }
        } catch (repoError) {
          console.error("Failed to fetch repositories:", repoError);
          setRepos(null);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const today = new Date();
  const back = new Date();
  back.setFullYear(today.getFullYear() - 1);

  return (
    <div className="min-h-screen bg-slate-950 text-white py-16 px-4">
      <section id="stats" className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold mb-4">
            LeetCode & <span className="bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">GitHub</span>
          </h2>
          <p className="text-slate-400 text-lg">
            Real-time progress — problem solving & open-source work
          </p>
        </motion.div>

        {loading && (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-400"></div>
            <p className="text-slate-400 mt-4">Loading live stats…</p>
          </div>
        )}

        {/* ================= LEETCODE ================= */}
        {leet && (
          <motion.div 
            className="space-y-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="grid lg:grid-cols-2 gap-8 items-stretch">
              <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-xl">
                <h3 className="text-sm font-semibold text-green-400 mb-4 flex items-center gap-2">
                  <Code className="w-4 h-4" /> LEETCODE STATS
                </h3>
                <pre className="font-mono text-sm text-slate-300 overflow-x-auto">
{`const leetcode = {
  username: "${LEETCODE_USER}",
  total: ${leet.total},
  easy: ${leet.easy},
  medium: ${leet.medium},
  hard: ${leet.hard}
}`}
                </pre>
              </div>

              <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-xl">
                <h3 className="text-sm font-semibold text-green-400 mb-6">PROBLEMS SOLVED</h3>
                <Bar
                  data={{
                    labels: ["Easy", "Medium", "Hard"],
                    datasets: [
                      {
                        data: [leet.easy, leet.medium, leet.hard],
                        backgroundColor: ["#22c55e", "#eab308", "#ef4444"],
                        borderRadius: 8,
                        barThickness: 60,
                      },
                    ],
                  }}
                  options={{ 
                    plugins: { legend: { display: false } },
                    scales: {
                      y: { 
                        ticks: { color: '#94a3b8' },
                        grid: { color: '#1e293b' }
                      },
                      x: { 
                        ticks: { color: '#94a3b8' },
                        grid: { display: false }
                      }
                    }
                  }}
                />
              </div>
            </div>

            <div className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-xl overflow-x-auto">
              <h3 className="text-sm font-semibold text-green-400 mb-6">SUBMISSION HEATMAP</h3>
              <CalendarHeatmap
                startDate={back}
                endDate={today}
                values={leet.heatmap}
                classForValue={(v: any) =>
                  !v || v.count === 0
                    ? "color-empty"
                    : v.count < 2
                    ? "color-scale-1"
                    : v.count < 4
                    ? "color-scale-2"
                    : v.count < 6
                    ? "color-scale-3"
                    : "color-scale-4"
                }
              />

              <a
                href={`https://leetcode.com/u/${LEETCODE_USER}/`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 text-sm mt-6 transition-colors"
              >
                View full profile →
              </a>
            </div>
          </motion.div>
        )}

        {/* ================= GITHUB OVERVIEW (Expanded) ================= */}
        <motion.div 
          className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h3 className="text-sm font-semibold text-blue-400 mb-6 flex items-center gap-2">
            <Github className="w-5 h-5" /> GITHUB OVERVIEW
          </h3>

          {profile && (
            <>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
                  <p className="text-4xl font-bold text-white">{profile.public_repos}</p>
                  <p className="text-sm text-slate-400 mt-2">Repositories</p>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
                  <p className="text-4xl font-bold text-white">{profile.followers}</p>
                  <p className="text-sm text-slate-400 mt-2">Followers</p>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
                  <p className="text-4xl font-bold text-white">{profile.following}</p>
                  <p className="text-sm text-slate-400 mt-2">Following</p>
                </div>

                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center">
                  <p className="text-4xl font-bold text-white">{profile.public_gists || 0}</p>
                  <p className="text-sm text-slate-400 mt-2">Gists</p>
                </div>
              </div>

              {/* Contribution Calendar */}
              <div className="bg-slate-800/30 border border-slate-700 rounded-xl p-6 overflow-x-auto">
                <p className="text-sm text-slate-400 mb-4 font-semibold">CONTRIBUTION CALENDAR</p>
                <img
                  src={`https://ghchart.rshah.org/00c853/${GITHUB_USER}`}
                  className="w-full rounded"
                  alt="GitHub contribution graph"
                />
              </div>

              <a
                href={`https://github.com/${GITHUB_USER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm mt-6 transition-colors"
              >
                View GitHub Profile →
              </a>
            </>
          )}
        </motion.div>

        {/* Top Repositories - Only show if repos loaded successfully */}
        {repos && repos.length > 0 && (
          <motion.div 
            className="bg-slate-900/50 backdrop-blur border border-slate-800 rounded-2xl p-8 shadow-xl mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h3 className="text-sm font-semibold text-yellow-400 mb-6 flex items-center gap-2">
              <Star className="w-5 h-5" /> TOP REPOSITORIES
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {repos.map((r) => (
                <a
                  key={r.id}
                  href={r.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 bg-slate-800/30 border border-slate-700 rounded-xl hover:border-yellow-500 hover:bg-slate-800/50 transition-all"
                >
                  <p className="font-semibold text-white text-lg">{r.name}</p>
                  <p className="text-sm text-slate-400 mt-2 line-clamp-2">
                    {r.description || "No description"}
                  </p>
                  <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" /> {r.stargazers_count}
                    </span>
                    {r.language && <span>• {r.language}</span>}
                  </div>
                </a>
              ))}
            </div>
          </motion.div>
        )}

        {/* Heatmap theme */}
        <style>{`
          .react-calendar-heatmap .color-empty { fill: #0f172a; }
          .react-calendar-heatmap .color-scale-1 { fill: #14532d; }
          .react-calendar-heatmap .color-scale-2 { fill: #16a34a; }
          .react-calendar-heatmap .color-scale-3 { fill: #22c55e; }
          .react-calendar-heatmap .color-scale-4 { fill: #86efac; }
          .react-calendar-heatmap text { fill: #94a3b8; font-size: 10px; }
        `}</style>
      </section>
    </div>
  );
}