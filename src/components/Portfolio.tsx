export function Portfolio() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-y-auto">
            {/* Hero Section */}
            <section className="min-h-screen flex items-center justify-center px-8 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent pointer-events-none" />

                <div className="max-w-4xl w-full space-y-8 relative z-10 animate-fade-in">
                    <div className="space-y-4">
                        <h1 className="text-7xl font-bold bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent animate-slide-up">
                            Aoba Iwaki
                        </h1>
                        <p className="text-3xl text-slate-300 animate-slide-up animation-delay-200">
                            Full Stack Developer
                        </p>
                    </div>

                    <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-400 animate-slide-up animation-delay-400" />

                    <p className="text-xl text-slate-400 max-w-2xl leading-relaxed animate-slide-up animation-delay-600">
                        Passionate about creating elegant solutions with modern technologies.
                        Specialized in cloud-native applications, Kubernetes orchestration, and interactive web experiences.
                    </p>

                    <div className="flex gap-6 pt-4 animate-slide-up animation-delay-800">
                        <a
                            href="#projects"
                            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
                        >
                            View Projects
                        </a>
                        <a
                            href="#contact"
                            className="px-8 py-3 border border-blue-500/50 rounded-lg font-semibold hover:bg-blue-500/10 transition-all duration-300 hover:scale-105"
                        >
                            Get in Touch
                        </a>
                    </div>
                </div>
            </section>

            {/* Skills Section */}
            <section id="skills" className="py-24 px-8">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Technical Skills
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { category: 'Frontend', skills: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'] },
                            { category: 'Backend', skills: ['Node.js', 'Python', 'REST APIs', 'GraphQL'] },
                            { category: 'DevOps', skills: ['Kubernetes', 'Docker', 'ArgoCD', 'CI/CD'] },
                            { category: 'Cloud', skills: ['AWS', 'GCP', 'Cloudflare', 'Nginx'] },
                            { category: 'Monitoring', skills: ['Prometheus', 'Grafana', 'Loki', 'Promtail'] },
                            { category: 'Tools', skills: ['Git', 'pnpm', 'Linux', 'Figma'] }
                        ].map((skillSet, index) => (
                            <div
                                key={skillSet.category}
                                className="p-6 rounded-xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-blue-500/20 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-blue-500/10"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <h3 className="text-2xl font-semibold mb-4 text-blue-400">
                                    {skillSet.category}
                                </h3>
                                <ul className="space-y-2">
                                    {skillSet.skills.map(skill => (
                                        <li key={skill} className="text-slate-300 flex items-center gap-2">
                                            <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                                            {skill}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
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
                        {[
                            {
                                title: '3D Particle Animation',
                                description: 'Interactive particle system with 3D effects, creating dynamic text formations that respond to user interaction. Built with React and HTML5 Canvas.',
                                tech: ['React', 'TypeScript', 'Canvas API', 'Vite'],
                                link: 'https://portfolio.aooba.net'
                            },
                            {
                                title: 'Kubernetes Observability Stack',
                                description: 'Complete monitoring solution using Prometheus, Grafana, and Loki. Deployed via GitOps with ArgoCD for automated synchronization.',
                                tech: ['Kubernetes', 'Prometheus', 'Grafana', 'ArgoCD'],
                                link: '#'
                            },
                            {
                                title: 'Cloud-Native Web Application',
                                description: 'Scalable web application deployed on Kubernetes with Cloudflare Tunnel integration, featuring automated CI/CD pipeline.',
                                tech: ['Docker', 'Kubernetes', 'Nginx', 'Cloudflare'],
                                link: '#'
                            }
                        ].map((project, index) => (
                            <div
                                key={project.title}
                                className="p-8 rounded-2xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-blue-500/20 backdrop-blur-sm hover:border-blue-500/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/20"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <h3 className="text-3xl font-bold mb-4 text-blue-300">
                                    {project.title}
                                </h3>
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
                                <a
                                    href={project.link}
                                    className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-semibold group"
                                >
                                    View Project
                                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 px-8 mb-16">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                        Get in Touch
                    </h2>
                    <p className="text-xl text-slate-400">
                        Interested in collaborating? Let's build something amazing together.
                    </p>

                    <div className="flex justify-center gap-8 pt-8">
                        <a
                            href="https://github.com"
                            className="p-4 rounded-full bg-slate-800/50 border border-blue-500/30 hover:border-blue-500/60 hover:bg-slate-800/80 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                            aria-label="GitHub"
                        >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                        <a
                            href="https://linkedin.com"
                            className="p-4 rounded-full bg-slate-800/50 border border-blue-500/30 hover:border-blue-500/60 hover:bg-slate-800/80 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                            aria-label="LinkedIn"
                        >
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a
                            href="mailto:contact@example.com"
                            className="p-4 rounded-full bg-slate-800/50 border border-blue-500/30 hover:border-blue-500/60 hover:bg-slate-800/80 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/30"
                            aria-label="Email"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
