import { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import { Github, Mail, ExternalLink, ArrowRight, Zap } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Skeleton } from './ui/skeleton';

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
            <div className="min-h-screen bg-slate-950 p-8 space-y-12">
                <div className="max-w-4xl mx-auto pt-24 space-y-4">
                    <Skeleton className="h-16 w-3/4 bg-slate-800/50" />
                    <Skeleton className="h-8 w-1/2 bg-slate-800/50" />
                    <Skeleton className="h-24 w-full bg-slate-800/50" />
                </div>
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                        <Skeleton key={i} className="h-[300px] w-full bg-slate-800/50 rounded-xl" />
                    ))}
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-4">
                <Zap className="w-12 h-12 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
                <p className="text-slate-400">Failed to load the portfolio data. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-blue-500/30">
            {/* Sticky Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 glass-dark border-b border-white/5">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <span className="text-lg font-display font-bold tracking-tight text-white uppercase">{data.hero.name}</span>
                    <div className="flex gap-6">
                        <a href="#projects" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Projects</a>
                        <a href={`mailto:${data.hero.social.email}`} className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center px-6 relative mesh-gradient">
                <div className="absolute inset-0 bg-slate-950/40 pointer-events-none" />

                <div className="max-w-5xl w-full relative z-10">
                    <div className="space-y-8 animate-fade-in">
                        <div className="space-y-4">
                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-tight animate-slide-up">
                                <span className="text-white block">Building digital</span>
                                <span className="text-gradient block">experiences.</span>
                            </h1>

                            <p className="text-2xl md:text-3xl text-slate-400 font-medium animate-slide-up animation-delay-200">
                                {data.hero.title} & Tech Enthusiast
                            </p>
                        </div>

                        <div className="h-px w-24 bg-gradient-to-r from-blue-500 to-transparent animate-slide-up animation-delay-400" />

                        <p className="text-xl text-slate-300 max-w-2xl leading-relaxed animate-slide-up animation-delay-500">
                            {data.hero.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-6 pt-4 animate-slide-up animation-delay-600">
                            <a
                                href="#projects"
                                className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 hover:scale-105 transition-all duration-300 shadow-xl shadow-blue-500/20 group"
                            >
                                Explore Work
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </a>

                            <div className="flex items-center gap-5">
                                {data.hero.social.github && (
                                    <a href={data.hero.social.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-blue-400 transition-all border border-white/5">
                                        <Github className="w-6 h-6" />
                                    </a>
                                )}
                                {data.hero.social.email && (
                                    <a href={`mailto:${data.hero.social.email}`} className="p-3 bg-white/5 rounded-full hover:bg-white/10 hover:text-blue-400 transition-all border border-white/5">
                                        <Mail className="w-6 h-6" />
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section id="projects" className="py-32 px-6 bg-slate-950 relative">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 animate-fade-in">
                        <div className="space-y-4">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter">
                                Selected <span className="text-blue-500 italic">Work</span>
                            </h2>
                            <p className="text-lg text-slate-400 max-w-lg">A collection of projects ranging from web development to cloud infrastructure and AI experiments.</p>
                        </div>
                        <div className="text-6xl font-black text-slate-800/10 select-none">PORTFOLIO</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {data.projects.map((project, index) => (
                            <Card
                                key={project.title}
                                className="group relative glass-dark hover:border-blue-500/50 transition-all duration-500 overflow-hidden flex flex-col animate-slide-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                                <CardHeader className="space-y-4">
                                    <div className="flex items-start justify-between">
                                        <CardTitle className="text-2xl font-bold group-hover:text-blue-400 transition-colors">
                                            {project.title}
                                        </CardTitle>
                                        <div className="flex gap-2">
                                            {project.github && (
                                                <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-white">
                                                    <Github className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <CardDescription className="text-slate-400 text-base leading-relaxed line-clamp-3">
                                        {project.description}
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="mt-auto space-y-6">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map(tech => (
                                            <Badge
                                                key={tech}
                                                variant="secondary"
                                                className="bg-slate-800/50 text-slate-300 border-none hover:bg-blue-500/20 hover:text-blue-300 transition-colors"
                                            >
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>

                                    {project.link !== "#" && (
                                        <a
                                            href={project.link}
                                            target="_blank" rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-sm font-bold text-blue-400 hover:text-blue-300 transition-colors group/link"
                                        >
                                            View Project
                                            <ExternalLink className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
                                        </a>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-20 border-t border-white/5 bg-slate-950 text-center">
                <div className="max-w-4xl mx-auto px-6">
                    <h3 className="text-3xl font-display font-bold mb-8">Let's build something amazing together.</h3>
                    <div className="flex justify-center gap-6">
                        {data.hero.social.github && (
                            <a href={data.hero.social.github} className="text-slate-400 hover:text-white transition-colors">GitHub</a>
                        )}
                        {data.hero.social.zenn && (
                            <a href={data.hero.social.zenn} className="text-slate-400 hover:text-white transition-colors">Zenn</a>
                        )}
                        {data.hero.social.email && (
                            <a href={`mailto:${data.hero.social.email}`} className="text-slate-400 hover:text-white transition-colors">Email</a>
                        )}
                    </div>
                    <p className="mt-12 text-sm text-slate-600 font-medium tracking-widest uppercase">
                        &copy; {new Date().getFullYear()} {data.hero.name}. All Rights Reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
}
