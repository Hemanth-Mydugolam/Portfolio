import { useState } from 'react';
import { motion } from 'framer-motion';
import { skills } from '../data/resumeData';

function SkillBar({ name, level, index }) {
  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-slate-300 text-sm font-medium">{name}</span>
        <span className="text-slate-500 text-xs">{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full progress-bar"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true, amount: 0 }}
          transition={{ duration: 1.2, delay: 0.1 + index * 0.05, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState('GenAI & LLMs');

  const categories = Object.keys(skills);
  const activeSkills = skills[activeCategory];

  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[400px] bg-violet-600/8 rounded-full blur-3xl pointer-events-none" />

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
            Technical Expertise
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="text-slate-400 mt-4 max-w-xl mx-auto">
            A versatile toolkit spanning GenAI, machine learning, data engineering, and domain-specific bioinformatics.
          </p>
          <div className="section-divider mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Category tabs */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-2"
          >
            {categories.map((cat) => {
              const catData = skills[cat];
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all duration-300 ${
                    isActive
                      ? 'bg-violet-600/20 border-violet-500/40'
                      : 'glass glass-hover'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{catData.icon}</span>
                    <div>
                      <p className={`font-medium text-sm ${isActive ? 'text-white' : 'text-slate-300'}`}>
                        {cat}
                      </p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {catData.items.length} skills
                      </p>
                    </div>
                  </div>
                  {isActive && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {catData.items.slice(0, 3).map((s) => (
                        <span
                          key={s.name}
                          className="px-2 py-0.5 rounded-md bg-violet-500/20 text-violet-300 text-xs"
                        >
                          {s.name}
                        </span>
                      ))}
                      {catData.items.length > 3 && (
                        <span className="text-slate-500 text-xs px-1">+{catData.items.length - 3}</span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </motion.div>

          {/* Skill bars */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-2 card"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl">{activeSkills.icon}</span>
              <div>
                <h3 className="text-white font-bold text-xl">{activeCategory}</h3>
                <p className="text-slate-400 text-sm">{activeSkills.items.length} skills</p>
              </div>
              <div
                className={`ml-auto px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${activeSkills.color} text-white`}
              >
                {Math.round(
                  activeSkills.items.reduce((sum, s) => sum + s.level, 0) /
                    activeSkills.items.length
                )}% avg
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-x-8">
              {activeSkills.items.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* All tech badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 card"
        >
          <h3 className="text-slate-300 text-sm font-semibold uppercase tracking-wider mb-5 text-center">
            Full Technology Stack
          </h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {Object.values(skills)
              .flatMap((cat) => cat.items.map((s) => s.name))
              .filter((v, i, a) => a.indexOf(v) === i)
              .map((name) => (
                <span
                  key={name}
                  className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 hover:border-violet-500/30 hover:bg-violet-500/10 transition-all text-slate-300 text-xs font-medium cursor-default"
                >
                  {name}
                </span>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
