import { BookOpen, Mail, ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { personal } from '../data/resumeData';

export default function Footer() {
  return (
    <footer className="relative bg-dark-800/50 border-t border-white/5 py-10 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">
              HM
            </div>
            <div>
              <p className="font-semibold text-white">{personal.name}</p>
              <p className="text-xs text-slate-400">Senior Data Scientist & GenAI Engineer</p>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-3">
            {[
              { icon: GithubIcon,   href: personal.github,            color: 'from-slate-600 to-gray-700',    label: 'GitHub',  target: '_blank' },
              { icon: LinkedinIcon, href: personal.linkedin,          color: 'from-blue-600 to-blue-700',     label: 'LinkedIn',target: '_blank' },
              { icon: BookOpen,     href: personal.scholar,           color: 'from-emerald-600 to-teal-700',  label: 'Scholar', target: '_blank' },
              { icon: Mail,         href: `mailto:${personal.email}`, color: 'from-violet-600 to-purple-600', label: 'Email',   target: undefined },
            ].map(({ icon: Icon, href, color, label, target }) => (
              <a
                key={label}
                href={href}
                target={target}
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center hover:scale-110 transition-transform`}
              >
                <Icon size={16} className="text-white" />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="p-2.5 glass glass-hover rounded-xl text-slate-400 hover:text-white transition-all"
            aria-label="Back to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} {personal.name}
          </p>
        </div>
      </div>
    </footer>
  );
}
