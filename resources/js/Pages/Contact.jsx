import React from 'react';
import AppLayout from '../Layouts/AppLayout';
import HeroHeader from '../Components/HeroHeader';
import Input, { TextArea } from '../Components/FormElements';

export default function Contact() {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Your message has been sent to the Peacock team!');
    };

    const contactInfo = [
        {
            icon: "✉️",
            title: "Email Us",
            detail: "peacockentertainmentlimited@gmail.com",
            sub: "Online support 24/7"
        },
        {
            icon: "📞",
            title: "Call Us",
            detail: "+880 1234 567890",
            sub: "Mon - Fri, 9am - 6pm"
        },
        {
            icon: "📍",
            title: "Visit Us",
            detail: "Flat 10E, House 10, Road 2/2, Banani, Dhaka-1213",
            sub: "Dhaka, Bangladesh"
        }
    ];

    return (
        <AppLayout>
            <HeroHeader
                title={<>Let's <span className="text-primary italic text-glow">Connect</span></>}
                subtitle="Ready to start your next cinematic journey?"
                bgImage="/about_header_bg.png"
            />

            <main className="max-w-7xl mx-auto px-6 py-20 space-y-32">
                {/* Contact Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
                    {contactInfo.map((info, idx) => (
                        <div key={idx} className="bg-[#15202b] border border-gray-800 p-10 rounded-3xl group hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 shadow-2xl relative overflow-hidden text-center md:text-left">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors"></div>
                            <div className="text-4xl mb-6">{info.icon}</div>
                            <h3 className="text-primary font-bold uppercase tracking-widest mb-2 font-12">{info.title}</h3>
                            <p className="font-20 font-bold mb-1 break-all">{info.detail}</p>
                            <p className="font-14 text-gray-500 font-bold uppercase tracking-tighter">{info.sub}</p>
                        </div>
                    ))}
                </div>

                {/* Main Contact Section */}
                <section className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent blur-3xl -z-10 rounded-full"></div>

                    <div className="bg-[#0f171e]/80 backdrop-blur-xl border border-gray-800 rounded-[3rem] overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row">

                        {/* Form Side */}
                        <div className="flex-1 p-10 md:p-16 space-y-12">
                            <div className="space-y-4">
                                <h2 className="font-48 font-black uppercase tracking-tighter">Send a <span className="text-primary italic">Message</span></h2>
                                <p className="text-gray-400 max-w-md leading-relaxed">
                                    Have a project in mind or just want to say hi? Fill out the form below and our team will get back to you within 24 hours.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <Input label="Full Name" placeholder="John Doe" name="name" required className="md:col-span-1" />
                                <Input label="Email Address" type="email" placeholder="john@example.com" name="email" required className="md:col-span-1" />
                                <Input label="Subject" placeholder="Inquiry about..." name="subject" className="md:col-span-2" />
                                <TextArea label="Your Message" placeholder="Tell us more about your project..." name="message" required className="md:col-span-2" />

                                <div className="md:col-span-2 pt-4">
                                    <button
                                        type="submit"
                                        className="group relative px-12 py-5 bg-primary text-secondary font-black uppercase tracking-widest rounded-2xl overflow-hidden shadow-lg transition-all hover:shadow-[0_0_40px_rgba(255,195,0,0.4)]"
                                    >
                                        <span className="relative z-10 flex items-center gap-2">
                                            Blast Off
                                            <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                            </svg>
                                        </span>
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></div>
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Map/Visual Side */}
                        <div className="lg:w-[400px] xl:w-[500px] bg-secondary relative overflow-hidden border-t lg:border-t-0 lg:border-l border-gray-800 min-h-[300px]">
                            <div className="absolute inset-0 z-0">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d35256.8616995254!2d90.36735401775468!3d23.776032657226956!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1sFlat%2010E%2C%20House%2010%2C%20Road%202%2F2%2C%20Banani%2C%20DHaka-1213!5e1!3m2!1sen!2sbd!4v1780830206718!5m2!1sen!2sbd"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0f171e] to-transparent z-10 h-32 pointer-events-none"></div>

                            <div className="absolute bottom-0 left-0 right-0 z-20 p-8 space-y-2">
                                <div className="w-12 h-1 bg-primary"></div>
                                <h3 className="font-20 font-black uppercase tracking-tighter">Based in <span className="text-primary italic">Dhaka, BD</span></h3>
                                <p className="font-12 text-gray-400 font-bold uppercase tracking-widest">Flat 10E, House 10, Road 2/2, Banani</p>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <style dangerouslySetInnerHTML={{
                __html: `
                .text-glow {
                    text-shadow: 0 0 30px rgba(255, 195, 0, 0.5);
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 0.5; }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 8s infinite ease-in-out;
                }
            `}} />
        </AppLayout>
    );
}
