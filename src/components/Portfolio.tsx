import { useState, useEffect } from 'react';
import yaml from 'js-yaml';

interface Project {
    title: string;
    description: string;
    tech: string[];
    link: string;
    github?: string;
}

interface PortfolioData {
    hero: {
        name: string;
        title: string;
        description: string;
        social: {
            github?: string;
            zenn?: string;
            email?: string;
        };
    };
    projects: Project[];
}

export function Portfolio() {
    const [data, setData] = useState<PortfolioData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/portfolio.yaml')
            .then(res => res.text())
            .then(text => {
                const parsed = yaml.load(text) as PortfolioData;
                setData(parsed);
                setLoading(false);
            })
            .catch(err => {
                console.error('Failed to load portfolio data:', err);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-blue-400 animate-pulse text-2xl font-semibold">Loading...</div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center">
                <div className="text-red-400">Error loading data.</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-y-auto">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center px-8 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent pointer-events-none" />

                <div className="max-w-4xl w-full space-y-8 relative z-10 animate-fade-in">
                    <div className="space-y-4">
                        <div className="flex flex-col md:flex-row md:items-end gap-6">
                            <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-slide-up">
                                {data.hero.name}
                            </h1>

                            <div className="flex gap-4 pb-2 animate-slide-up animation-delay-200">
                                {data.hero.social.github && (
                                    <a href={data.hero.social.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                    </a>
                                )}
                                {data.hero.social.zenn && (
                                    <a href={data.hero.social.zenn} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors">
                                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.06c-3.344 0-6.06-2.716-6.06-6.06S8.656 5.94 12 5.94s6.06 2.716 6.06 6.06-2.716 6.06-6.06 6.06z" />
                                            <circle cx="12" cy="12" r="3" />
                                        </svg>
                                        <span className="sr-only">Zenn</span>
                                    </a>
                                )}
                                {data.hero.social.email && (
                                    <a href={`mailto:${data.hero.social.email}`} className="text-slate-400 hover:text-white transition-colors">
                                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    </a>
                                )}
                            </div>
                        </div>
                        <p className="text-3xl text-slate-300 animate-slide-up animation-delay-200">
                            {data.hero.title}
                        </p>
                    </div>

                    <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-400 animate-slide-up animation-delay-400" />

                    <p className="text-xl text-slate-400 max-w-2xl leading-relaxed animate-slide-up animation-delay-600">
                        {data.hero.description}
                    </p>

                    <div className="flex gap-6 pt-4 animate-slide-up animation-delay-800">
                        <a
                            href="#projects"
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                        >
                            View Projects
                        </a>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-24 px-8 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/5 to-transparent pointer-events-none" />

                <div className="max-w-6xl mx-auto relative z-10">
                    <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Featured Projects
                    </h2>

                    <div className="space-y-12">
                        {data.projects.map((project, index) => (
                            <div
                                key={project.title}
                                className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-blue-500/20 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <h3 className="text-3xl font-bold text-blue-300">
                                        {project.title}
                                    </h3>
                                    {project.github && (
                                        <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors p-2 hover:bg-white/5 rounded-lg">
                                            <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                        </a>
                                    )}
                                </div>
                                <p className="text-slate-300 text-lg mb-6 leading-relaxed">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-3 mb-6">
                                    {project.tech.map(tech => (
                                        <span
                                            key={tech}
                                            className="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full text-sm text-blue-300 font-medium"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-4">
                                    {project.link !== "#" && (
                                        <a
                                            href={project.link}
                                            target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-2 bg-blue-600/20 border border-blue-500/30 rounded-lg text-cyan-400 hover:bg-blue-600/40 hover:text-cyan-300 transition-all font-semibold group"
                                        >
                                            Live Demo
                                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                                        </a>
                                    )}
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-2 border border-slate-700 rounded-lg text-slate-300 hover:bg-slate-800 transition-all"
                                        >
                                            View Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
