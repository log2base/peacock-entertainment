import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import HeroHeader from '../Components/HeroHeader';

export default function WhoWeAre() {
    const team = [
        {
            name: "Mohammad Shahriar Hossain",
            designation: "Chief Business Officer - CBO",
            image: "/team/Mohammad%20Shahriar%20Hossain-Chief%20Business%20Officer%20-%20CBO.jpeg",
            socials: ['facebook', 'twitter', 'instagram']
        },
        {
            name: "MD JOBAYER HOSSAIN",
            designation: "Accountant",
            image: "/team/MD%20JOBAYER%20HOSSAIN-Accountant.jpeg",
            socials: ['facebook', 'twitter', 'instagram']
        },
        {
            name: "Al-Amin Hasan",
            designation: "Video Editor",
            image: "/team/Al-Amin%20Hasan-Video%20Editor.jpeg",
            socials: ['facebook', 'twitter', 'instagram']
        },
        {
            name: "Akash Sarkar",
            designation: "Chief Operating Officer - COO",
            image: "/team/Akash%20Sarkar-Chief%20Operating%20Officer%20-%20COO.jpeg",
            socials: ['facebook', 'twitter', 'instagram']
        }
    ];

    return (
        <AppLayout>
            <HeroHeader
                title={<>Cinemawala <span className="text-primary italic">Team</span></>}
                subtitle="Who We Are"
                bgImage="/about_header_bg.png"
            />

            <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {team.map((member, index) => (
                        <div key={index} className="bg-[#15202b] rounded-3xl overflow-hidden border border-gray-800 hover:border-primary/50 transition-colors shadow-2xl group flex flex-col items-center text-center p-8">
                            {/* Profile Image */}
                            <div className="w-full shrink-0 mb-6 rounded-3xl overflow-hidden border border-gray-800 group-hover:border-primary transition-colors shadow-lg" style={{ height: '256px' }}>
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* Details */}
                            <h3 className="text-white font-bold text-lg mb-2 uppercase tracking-wider h-14 flex items-center justify-center group-hover:text-primary transition-colors">
                                {member.name}
                            </h3>
                            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-6">
                                {member.designation}
                            </p>

                            {/* Social Icons */}
                            <div className="flex space-x-3 mt-auto">
                                {member.socials.map((social, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="w-8 h-8 rounded-full border border-gray-700 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary hover:bg-primary/10 transition-colors"
                                    >
                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                            {social === 'facebook' && <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />}
                                            {social === 'twitter' && <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />}
                                            {social === 'instagram' && <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01M6.5 6.5h11a5 5 0 015 5v11a5 5 0 01-5 5h-11a5 5 0 01-5-5v-11a5 5 0 015-5z" />}
                                        </svg>
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </main>
        </AppLayout>
    );
}
