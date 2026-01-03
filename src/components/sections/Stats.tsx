"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Code, TrendingUp, Star } from "lucide-react";
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

export const Stats = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const [leet, setLeet] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [commits, setCommits] = useState<any[]>([]);
  const [repos, setRepos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers: any = {};
    if (import.meta.env.VITE_GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`;
    }

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

        // ----- Recent commits -----
        const events = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/events/public`,
          { headers }
        ).then((r) => r.json());

        setCommits(
          events
            .filter((e: any) => e.type === "PushEvent")
            .slice(0, 5)
            .map((e: any) => ({
              repo: e.repo.name,
              message: e.payload?.commits?.[0]?.message ?? "Commit",
              url: `https://github.com/${e.repo.name}/commit/${e.payload?.commits?.[0]?.sha}`,
              time: new Date(e.created_at).toLocaleString(),
            }))
        );

        // ----- Top repos -----
        const repoData = await fetch(
          `https://api.github.com/users/${GITHUB_USER}/repos`,
          { headers }
        ).then((r) => r.json());

        setRepos(
          repoData
            .sort(
              (a: any, b: any) => b.stargazers_count - a.stargazers_count
            )
            .slice(0, 4)
        );
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const today = new Date();
  const back = new Date();
  back.setFullYear(today.getFullYear() - 1);

  return (
    <section id="stats" className="section-padding bg-background" ref={ref}>
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
      >
        <h2 className="text-4xl font-bold">
          LeetCode & <span className="text-gradient">GitHub</span>
        </h2>
        <p className="text-muted-foreground">
          Real-time progress — problem solving & open-source work
        </p>
      </motion.div>

      {loading && (
        <p className="text-center text-muted-foreground">
          Loading live stats…
        </p>
      )}

      {/* ================= LEETCODE ================= */}
      {leet && (
        <div className="space-y-10 mb-14">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="terminal-window p-6 border rounded-xl">
              <pre className="font-mono text-sm">
{`const leetcode = {
  username: "${LEETCODE_USER}",
  total: ${leet.total},
  easy: ${leet.easy},
  medium: ${leet.medium},
  hard: ${leet.hard}
}`}
              </pre>
            </div>

            <div className="bg-card border rounded-xl p-6">
              <Bar
                data={{
                  labels: ["Easy", "Medium", "Hard"],
                  datasets: [
                    {
                      data: [leet.easy, leet.medium, leet.hard],
                      backgroundColor: ["#22c55e", "#eab308", "#ef4444"],
                      borderRadius: 6,
                    },
                  ],
                }}
                options={{ plugins: { legend: { display: false } } }}
              />
            </div>
          </div>

          <div className="terminal-window p-6 border rounded-xl">
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
              className="underline text-green-400 text-sm mt-4 inline-block"
            >
              View full profile →
            </a>
          </div>
        </div>
      )}

      {/* ================= GITHUB ================= */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* GitHub Overview + Contribution Calendar */}
        <div className="bg-card border rounded-xl p-6">
          <h3 className="font-mono font-bold mb-4 flex items-center gap-2">
            <Github className="w-5" /> GitHub Overview
          </h3>

          {profile && (
            <>
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold">{profile.public_repos}</p>
                  <p className="text-xs text-muted-foreground">Repositories</p>
                </div>

                <div className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold">{profile.followers}</p>
                  <p className="text-xs text-muted-foreground">Followers</p>
                </div>

                <div className="p-4 border rounded-lg text-center">
                  <p className="text-2xl font-bold">{profile.following}</p>
                  <p className="text-xs text-muted-foreground">Following</p>
                </div>
              </div>

              {/* ⭐ CONTRIBUTION CALENDAR (LIVE) */}
              <div className="border rounded-lg p-4 bg-secondary/30">
                <p className="text-xs text-muted-foreground mb-2">
                  Contribution Calendar
                </p>

                <img
                  src={`https://ghchart.rshah.org/00c853/${GITHUB_USER}`}
                  className="w-full rounded"
                  alt="GitHub contribution graph"
                />
              </div>

              <a
                href={`https://github.com/${GITHUB_USER}`}
                target="_blank"
                className="underline text-sm block mt-4"
              >
                View GitHub Profile →
              </a>
            </>
          )}
        </div>

        {/* Recent Commits */}
        <div className="bg-card border rounded-xl p-6">
          <h3 className="font-mono font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-4" /> Recent Commits
          </h3>

          <div className="space-y-3">
            {commits.map((c, i) => (
              <a
                key={i}
                href={c.url}
                target="_blank"
                className="block p-3 border rounded-lg hover:border-primary"
              >
                <p className="font-medium">{c.message}</p>
                <p className="text-xs text-muted-foreground">{c.repo}</p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {c.time}
                </p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Pinned repos */}
      <div className="bg-card border rounded-xl p-6 mt-10">
        <h3 className="font-mono font-bold mb-4">
          <Star className="inline w-4 mr-1" /> Top Repositories
        </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {repos.map((r) => (
            <a
              key={r.id}
              href={r.html_url}
              target="_blank"
              className="p-4 border rounded-lg hover:border-primary transition"
            >
              <p className="font-semibold">{r.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {r.description || "No description"}
              </p>
            </a>
          ))}
        </div>
      </div>

      {/* Heatmap theme */}
      <style>{`
        .react-calendar-heatmap .color-empty { fill: #020617; }
        .react-calendar-heatmap .color-scale-1 { fill: #14532d; }
        .react-calendar-heatmap .color-scale-2 { fill: #16a34a; }
        .react-calendar-heatmap .color-scale-3 { fill: #22c55e; }
        .react-calendar-heatmap .color-scale-4 { fill: #bbf7d0; }
      `}</style>
    </section>
  );
};
