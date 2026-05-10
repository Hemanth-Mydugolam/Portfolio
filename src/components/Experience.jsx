import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Calendar } from 'lucide-react';
import { experience } from '../data/resumeData';

export default function Experience() {
  const [expanded, setExpanded] = useState(1);

  return (
    <section id="experience" className="py-24 relative">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-cyan-600/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest mb-3 block">
            Work History
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Professional <span className="gradient-text">Experience</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            7+ years spanning F&A, Healthcare AI, HR Analytics, enterprise ML, and Research — Building
            systems that make a measurable difference.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Timeline sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-3"
          >
            {experience.map((job) => (
              <button
                key={job.id}
                onClick={() => setExpanded(expanded === job.id ? null : job.id)}
                className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                  expanded === job.id
                    ? 'bg-violet-600/15 border-violet-500/40 shadow-lg'
                    : 'glass glass-hover'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${job.color} flex items-center justify-center text-lg flex-shrink-0`}
                  >
                    {job.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm truncate ${expanded === job.id ? 'text-white' : 'text-slate-300'}`}>
                      {job.role}
                    </p>
                    <p className="text-slate-400 text-xs mt-0.5 truncate">{job.company}</p>
                    <div className="flex items-center gap-1.5 mt-1.5">
                      <Calendar size={11} className="text-slate-500" />
                      <span className="text-slate-500 text-xs">{job.period}</span>
                    </div>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`text-slate-500 flex-shrink-0 transition-transform duration-200 ${
                      expanded === job.id ? 'rotate-90 text-violet-400' : ''
                    }`}
                  />
                </div>
              </button>
            ))}
          </motion.div>

          {/* Detail panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {experience
                .filter((j) => j.id === expanded)
                .map((job) => (
                  <motion.div
                    key={job.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="card relative overflow-hidden h-full"
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${job.color}`}
                    />

                    <div className="flex items-start gap-4 mb-6 pt-2">
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center text-2xl flex-shrink-0 shadow-lg`}
                      >
                        {job.icon}
                      </div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{job.role}</h3>
                        <p className="text-violet-300 font-medium">{job.company}</p>
                        <p className="text-slate-400 text-sm">{job.org}</p>
                        <div className="flex flex-wrap gap-3 mt-2">
                          <span className="flex items-center gap-1.5 text-xs text-slate-400">
                            <Calendar size={12} /> {job.period}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-xs border border-white/10 text-slate-400">
                            {job.type}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-5">
                      <h4 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">
                        Key Achievements
                      </h4>
                      <ul className="flex flex-col gap-2.5">
                        {job.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-300">
                            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 mt-2 flex-shrink-0" />
                            {h}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((s) => (
                          <span
                            key={s}
                            className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300 text-xs font-medium"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
