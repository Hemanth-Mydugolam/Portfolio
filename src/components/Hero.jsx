import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import TypeWriter from './TypeWriter';
import { ArrowDown, BookOpen, Sparkles, Code2 } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personal } from '../data/resumeData';

const floatingIcons = [
  { icon: '🤖', x: '8%', y: '25%', delay: 0 },
  { icon: '🧠', x: '85%', y: '20%', delay: 1 },
  { icon: '⚡', x: '15%', y: '65%', delay: 2 },
  { icon: '🔬', x: '80%', y: '60%', delay: 0.5 },
  { icon: '📊', x: '50%', y: '10%', delay: 1.5 },
  { icon: '🧬', x: '92%', y: '75%', delay: 2.5 },
];

const statItems = [
  { label: 'Years Exp', value: '7+', icon: '⏱️' },
  { label: 'Publications', value: '6', icon: '📄' },
  { label: 'Citations', value: '7', icon: '🔗' },
  { label: 'Cost Saved', value: '$10M+', icon: '💰' },
];

export default function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animFrame;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
      opacity: Math.random() * 0.5 + 0.1,
      color: Math.random() > 0.5 ? '#818cf8' : '#06b6d4',
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, '0');
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(129,140,248,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animFrame = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-dark-900"
    >
      {/* Particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* Background glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-900/10 rounded-full blur-3xl" />
      </div>

      {/* Floating emoji icons */}
      {floatingIcons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute text-2xl pointer-events-none select-none hidden lg:block"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -14, 0] }}
          transition={{
            duration: 4,
            delay: item.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <span className="opacity-30 text-3xl">{item.icon}</span>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-300 text-xs font-medium">
                <Sparkles size={12} />
                Available for new opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4"
            >
              Hi, I&apos;m{' '}
              <span className="gradient-text-hero block mt-1">
                {personal.name.split(' ')[0]}
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="text-xl sm:text-2xl text-slate-300 mb-6 h-10 flex items-center"
            >
              <TypeWriter
                sequence={personal.taglines.flatMap((t) => [t, 2200])}
                className="font-medium"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="text-slate-400 text-lg leading-relaxed mb-8 max-w-xl"
            >
              I build AI that ships — LLM pipelines at a neuroscience research lab,
              predictive models that saved $10M at Honeywell, and 6 peer-reviewed
              publications along the way. 7+ years turning messy data into production
              systems that actually stick.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.55 }}
              className="flex flex-wrap gap-3 mb-10"
            >
              <button
                onClick={() =>
                  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="btn-primary flex items-center gap-2 text-sm"
              >
                <Code2 size={16} /> View My Work
              </button>
              <button
                onClick={() =>
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                }
                className="btn-secondary flex items-center gap-2 text-sm"
              >
                Get in Touch
              </button>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex items-center gap-4"
            >
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <GithubIcon size={18} />
                <span className="hidden sm:inline">GitHub</span>
              </a>
              <span className="w-px h-4 bg-white/20" />
              <a
                href={personal.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <LinkedinIcon size={18} />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
              <span className="w-px h-4 bg-white/20" />
              <a
                href={personal.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
              >
                <BookOpen size={18} />
                <span className="hidden sm:inline">Scholar</span>
              </a>
            </motion.div>
          </div>

          {/* Right: Stats + Visual */}
          <div className="flex flex-col gap-6">

            {/* Profile card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="card relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600/10 to-cyan-600/5 pointer-events-none" />
              <div className="flex items-center gap-4">
                {/* Photo with gradient ring */}
                <div className="relative flex-shrink-0">
                  <div className="w-32 h-32 rounded-full p-[3px] bg-gradient-to-br from-violet-500 to-cyan-400">
                    <div className="w-full h-full rounded-full overflow-hidden bg-dark-700">
                      <img
                        src={`${import.meta.env.BASE_URL}profile.png`}
                        alt="Hemanth Mydugolam"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      <div className="w-full h-full bg-gradient-to-br from-violet-600 to-cyan-500 items-center justify-center text-white text-2xl font-bold" style={{ display: 'none' }}>
                        HM
                      </div>
                    </div>
                  </div>
                  <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-dark-800" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-2xl leading-tight">Hemanth Mydugolam</h3>
                  <p className="text-violet-300 text-base font-medium mt-1">Senior Data Scientist & GenAI Engineer</p>
                  <p className="text-slate-400 text-sm mt-1.5">UT Dallas • Dallas, TX</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {['Python', 'R', 'LLMs', 'RAG', 'ML', 'NLP', 'Azure', 'AWS'].map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Open to opportunities
                </div>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {statItems.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="card text-center group"
                >
                  <div className="text-2xl mb-1">{stat.icon}</div>
                  <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Tech stack visual */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="card"
            >
              <p className="text-slate-400 text-xs font-medium uppercase tracking-wider mb-3">
                Core Stack
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { name: 'Python', icon: '🐍' },
                  { name: 'Claude API', icon: '🤖' },
                  { name: 'LangChain', icon: '🔗' },
                  { name: 'PyTorch', icon: '🔥' },
                  { name: 'RAG', icon: '🧠' },
                  { name: 'Docker', icon: '🐳' },
                  { name: 'R Shiny', icon: '✨' },
                  { name: 'AWS', icon: '☁️' },
                ].map((tech) => (
                  <span
                    key={tech.name}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/30 hover:bg-violet-500/10 transition-all text-xs text-slate-300 cursor-default"
                  >
                    <span>{tech.icon}</span>
                    {tech.name}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll down */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="flex justify-center mt-16"
        >
          <button
            onClick={() =>
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="flex flex-col items-center gap-2 text-slate-500 hover:text-slate-300 transition-colors group"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown size={18} />
            </motion.div>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
