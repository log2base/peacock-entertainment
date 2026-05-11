import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import HeroHeader from '../Components/HeroHeader';
import ServiceCard from '../Components/ServiceCard';

export default function About() {
    const services = [
        {
            title: "Story & Screenplay Writing",
            description: '"Scripts" and "screenplays" are the blueprint of every great film. We focus on plot, character development, setting, and tone to create immersive stories that captivate audiences from start to finish.',
            image: "/service_storytelling.png"
        },
        {
            title: "Content Production",
            description: "Our process involves developing and creating high-quality visual assets. From music videos to feature films, we handle every detail of production to ensure excellence in every frame.",
            image: "/service_production.png"
        },
        {
            title: "Video Editing",
            description: "The magic happens in the edit. We manipulate and arrange shots to structure information perfectly, whether it's for film, television, or digital advertisements.",
            image: "/service_editing.png"
        },
        {
            title: "Content Publishing & Marketing",
            description: "Content marketing is most effective with a narrow focus. We zero in on specific audiences to build trust and create compelling narratives that convert.",
            image: "/service_marketing.png"
        }
    ];

    return (
        <AppLayout>
            <HeroHeader 
                title={<>About <span className="text-primary italic">Peacock</span></>}
                subtitle="About Peacock Entertainment"
                bgImage="/about_header_bg.png"
            />

            <main className="max-w-5xl mx-auto px-6 py-12 md:py-24 space-y-20">
                {/* Intro Text */}
                <div className="space-y-8 text-center md:text-left">
                    <p className="font-24 text-gray-300 leading-relaxed font-light italic border-l-0 md:border-l-4 border-primary md:pl-8">
                        PEACOCK ENTERTAINMENT is a video and motion picture production house based in Dhaka, Bangladesh. The Company was founded in 2024 by visionary filmmakers with the aim of creating world-class cinematic content. It’s an entertainment platform designed to promote arts and to provide an inside look into the lifestyles of people from different creative fields.
                    </p>
                    <p className="font-18 text-gray-400 leading-relaxed md:ml-8">
                        We produce entertainment content for the global audience by researching the trends that resonate with fans. PEACOCK also provides promotional services for creative individuals, organizations, and companies, offering a powerful platform to showcase talent and creativity.
                    </p>
                </div>

                {/* What we do? */}
                <div className="text-center space-y-16">
                    <div className="inline-block relative">
                        <h2 className="font-48 font-black uppercase tracking-tight">What we <span className="text-primary">do?</span></h2>
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-16 md:w-24 h-1 bg-primary"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 md:gap-y-24">
                        {services.map((service, index) => (
                            <ServiceCard key={index} {...service} />
                        ))}
                    </div>
                </div>
            </main>
        </AppLayout>
    );
}
