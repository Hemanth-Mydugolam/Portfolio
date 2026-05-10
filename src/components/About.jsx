import { motion } from 'framer-motion';
import CountUp from './CountUp';
import { GraduationCap, Heart } from 'lucide-react';
import { personal, awards } from '../data/resumeData';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const floatingChips = [
  { label: 'GenAI',          icon: '🤖', x: '3%',  y: '20%', delay: 0,    duration: 5.5 },
  { label: 'LLMs',           icon: '🧠', x: '88%', y: '24%', delay: 0.8,  duration: 6.2 },
  { label: 'Agents',         icon: '⚡', x: '84%', y: '50%', delay: 1.6,  duration: 5.0 },
  { label: 'Automation',     icon: '⚙️', x: '3%',  y: '62%', delay: 2.4,  duration: 6.8 },
  { label: 'ML Engineering', icon: '🔧', x: '4%', y: '40%',  delay: 0.4,  duration: 5.8 },
  { label: 'RAG Pipelines',  icon: '🔗', x: '84%', y: '86%', delay: 1.2,  duration: 6.4 },
  { label: 'Deep Learning',  icon: '🔬', x: '88%', y: '68%', delay: 2.0,  duration: 5.2 },
  { label: 'NLP',            icon: '💬', x: '6%',  y: '87%', delay: 3.0,  duration: 6.0 },
];

const interests = [
  { icon: '🤖', label: 'GenAI & LLMs' },
  { icon: '🧬', label: 'Bioinformatics' },
  { icon: '⚙️', label: 'Machine Learning' },
  { icon: '📊', label: 'Reporting Analytics' },
  { icon: '☁️', label: 'Cloud Architecture' },
  { icon: '📈', label: 'Analytics' },
  { icon: '🔄', label: 'Intelligent Automation' },
  { icon: '🔭', label: 'AI for Science' },
  { icon: '✍️', label: 'Technical Writing' },
];

export default function About() {

  return (
    <section id="about" className="py-24 relative">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Floating keyword chips */}
      {floatingChips.map((chip) => (
        <motion.div
          key={chip.label}
          className="absolute hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm pointer-events-none select-none"
          style={{ left: chip.x, top: chip.y }}
          animate={{ y: [0, -14, 0] }}
          transition={{ duration: chip.duration, delay: chip.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-sm">{chip.icon}</span>
          <span className="text-xs font-medium text-slate-300">{chip.label}</span>
        </motion.div>
      ))}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            About Me
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Turning Data into{' '}
            <span className="gradient-text">Impact</span>
          </h2>
          <div className="section-divider mt-6" />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }}
          variants={stagger}
          className="grid lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left: Bio */}
          <motion.div variants={fadeUp}>
            <div className="card mb-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
              <p className="text-violet-300 text-xs font-semibold uppercase tracking-widest mb-3">What I know & do</p>
              <p className="text-slate-300 leading-relaxed text-sm mb-4">
                {personal.bio.split('\n\n')[0]}
              </p>
              <p className="text-slate-300 leading-relaxed text-sm">
                {personal.bio.split('\n\n')[1]}
              </p>
            </div>

            <div className="card">
              <p className="text-violet-300 text-xs font-semibold uppercase tracking-widest mb-2">What drives me</p>
              <p className="text-slate-300 leading-relaxed text-sm">
                {personal.bio.split('\n\n')[2]}
              </p>
            </div>

            <div className="card mt-6">
              <p className="text-violet-300 text-xs font-semibold uppercase tracking-widest mb-4">Functional Experience</p>
              <ul className="flex flex-col gap-2.5">
                {[
                  { icon: '🏥', label: 'Healthcare & Biomedical Research' },
                  { icon: '💼', label: 'Finance & Accounting Analytics' },
                  { icon: '👥', label: 'Human Resources & Workforce Analytics' },
                  { icon: '🎓', label: 'Academic & Scientific Research Environments' },
                ].map((item) => (
                  <li key={item.label} className="flex items-center gap-3 text-slate-300 text-sm">
                    <span className="text-base">{item.icon}</span>
                    {item.label}
                  </li>
                ))}
              </ul>
            </div>

          </motion.div>

          {/* Right: Stats + Interests */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              {personal.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className="card text-center hover:border-violet-500/30 transition-all"
                >
                  <div className="text-3xl font-bold gradient-text mb-1">
                    <CountUp
                      end={stat.value}
                      duration={2}
                      delay={i * 0.2}
                      suffix={stat.suffix}
                    />
                  </div>
                  <p className="text-slate-400 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Education + Focus */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card flex items-center gap-3 !p-4">
                <GraduationCap size={18} className="text-cyan-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Education</p>
                  <p className="text-white text-sm font-medium">MS Business Analytics</p>
                </div>
              </div>
              <div className="card flex items-center gap-3 !p-4">
                <Heart size={18} className="text-rose-400 flex-shrink-0" />
                <div>
                  <p className="text-xs text-slate-500">Focus</p>
                  <p className="text-white text-sm font-medium">AI for Science & Technology</p>
                </div>
              </div>
            </div>

            {/* Interests */}
            <div className="card">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span>💡</span> Areas of Passion
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {interests.map((item) => (
                  <div
                    key={item.label}
                    className="flex flex-col items-center gap-2 p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/5 hover:border-violet-500/20 transition-all cursor-default"
                  >
                    <span className="text-2xl">{item.icon}</span>
                    <span className="text-slate-300 text-xs text-center leading-snug">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards */}
            <div className="card">
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                <span>🏆</span> Recognition
              </h3>
              <div className="flex flex-col gap-3">
                {awards.map((award) => (
                  <div
                    key={award.title}
                    className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5"
                  >
                    <span className="text-2xl">{award.icon}</span>
                    <div>
                      <p className="text-white text-sm font-medium">{award.title}</p>
                      <p className="text-slate-400 text-xs">
                        {award.org} · {award.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
