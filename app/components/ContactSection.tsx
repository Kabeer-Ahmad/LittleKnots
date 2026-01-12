import Link from "next/link";

export default function ContactSection() {
    return (
        <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-accent/10">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl md:text-4xl font-bold text-primary-dark mb-6">
                    Let's Get in Touch!
                </h2>
                <p className="text-lg md:text-xl text-foreground/70 mb-10">
                    Text us on any of these platforms!
                </p>

                <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
                    {/* Instagram Button */}
                    <a
                        href="https://www.instagram.com/littleknotspk?igsh=encxa2R5MDlyNmMy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-foreground border-2 border-primary/20 hover:border-primary font-semibold text-base hover:bg-primary/5 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                        </svg>
                        Instagram
                    </a>

                    {/* WhatsApp Button */}
                    <a
                        href="https://wa.link/xxiwb5"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-white text-foreground border-2 border-primary/20 hover:border-primary font-semibold text-base hover:bg-primary/5 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        WhatsApp
                    </a>
                </div>
            </div>
        </section>
    );
}
