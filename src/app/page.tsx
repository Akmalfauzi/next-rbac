"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { gsap } from "gsap"
import { ArrowRight, ShieldCheck, Lock, Users, HelpCircle, Github, FileText } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const btnRef = useRef<HTMLDivElement>(null)
  const featRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      })
      .from(descRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.8,
      }, "-=0.6")
      .from(btnRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
      }, "-=0.4")
      .fromTo(".feature-card", 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
      "-=0.2")

    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={containerRef} className="relative min-h-screen w-full bg-white dark:bg-black selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black font-sans overflow-x-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 h-full w-full bg-white dark:bg-black bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px] dark:bg-blue-900"></div>
      </div>
      
      {/* Radial Mask for "Not Full" Look */}
      <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center bg-white dark:bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      <nav className="relative z-50 flex w-full items-center justify-between p-6 md:px-20">
         <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
            <ShieldCheck className="h-6 w-6" />
            <span>Next RBAC</span>
         </div>
         <div>
             <Button asChild className="rounded-xl bg-neutral-900 bg-gradient-to-br from-neutral-900 to-neutral-700 px-6 text-base text-white shadow-lg transition-all hover:-translate-y-0.5 hover:shadow-xl dark:bg-white dark:from-white dark:to-neutral-200 dark:text-black">
                 <Link href="/login">
                    Login <ArrowRight className="ml-2 h-4 w-4" />
                 </Link>
             </Button>
         </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center px-4 pt-20 pb-10 text-center md:pt-32">
        <h1 
          ref={titleRef}
          className="max-w-4xl text-5xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-500 sm:text-7xl md:leading-[1.1]"
        >
          Secure & Scalable <br/> Role-Based Access Control
        </h1>
        
        <p 
          ref={descRef}
          className="mt-6 max-w-lg text-lg text-neutral-600 dark:text-neutral-400 sm:text-xl"
        >
          An enterprise-ready foundation for your Next.js applications. 
          Manage permissions, roles, and recursive menus with ease.
        </p>

        <div ref={btnRef} className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 px-8 text-base">
                <Link href="/login">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 px-8 text-base">
                 <a href="https://github.com/Akmalfauzi/next-rbac" target="_blank">
                    <Github className="mr-2 h-4 w-4" /> View on GitHub
                 </a>
            </Button>
        </div>

        <div ref={featRef} className="mt-24 grid w-full max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
             <FeatureCard 
                icon={<Lock className="h-6 w-6 text-blue-500" />}
                title="Secure Auth"
                desc="JWT-based authentication stored in HttpOnly cookies, protected by strict middleware."
                bg="bg-blue-50 dark:bg-blue-900/20"
             />
             <FeatureCard 
                icon={<Users className="h-6 w-6 text-purple-500" />}
                title="Dynamic Roles"
                desc="Handle multiple user roles with a dedicated selection flow and distinct permissions."
                bg="bg-purple-50 dark:bg-purple-900/20"
             />
             <FeatureCard 
                icon={<FileText className="h-6 w-6 text-green-500" />}
                title="Recursive Menus"
                desc="Infinitely nested menu structures rendered recursively in a collapsible sidebar."
                bg="bg-green-50 dark:bg-green-900/20"
             />
        </div>

        {/* How It Works Section */}
        <div className="mt-20 flex w-full max-w-5xl flex-col items-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400">
                A simple but powerful flow to manage access in your application.
            </p>
            
            <div className="mt-12 grid w-full grid-cols-1 gap-8 md:grid-cols-3">
                <StepCard 
                    step="1" 
                    title="Authentication" 
                    desc="Users log in via the secure portal. Tokens are issued and stored securely." 
                />
                <StepCard 
                    step="2" 
                    title="Role Selection" 
                    desc="Users with multiple roles select their active context for the session." 
                />
                <StepCard 
                    step="3" 
                    title="Access Control" 
                    desc="The sidebar and routes dynamically adjust based on the selected role's permissions." 
                />
            </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 w-full max-w-3xl text-left">
            <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-12">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="item-1">
                    <AccordionTrigger>Is this production ready?</AccordionTrigger>
                    <AccordionContent>
                        Yes. It uses industry-standard security practices like HttpOnly cookies, strict middleware guards, and stateless JWT authentication.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger>Can I add more roles?</AccordionTrigger>
                    <AccordionContent>
                        Absolutely. The backend is designed to be flexible. You can add as many roles as needed via the database or API.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger>How deep can the menu nesting go?</AccordionTrigger>
                    <AccordionContent>
                        The recursive renderer supports infinite nesting depth, though for UI usability we recommend keeping it under 4 levels.
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger>What tech stack is used?</AccordionTrigger>
                    <AccordionContent>
                        Frontend: Next.js 14 (App Router), Shadcn UI, Tailwind CSS, Axios. <br/>
                        Backend: Node.js, Express, Sequelize (PostgreSQL), JWT.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>

        {/* CTA Section */}
        <div className="mt-20 w-full max-w-4xl rounded-3xl bg-neutral-900 px-6 py-16 text-center text-white dark:bg-white dark:text-black">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Ready to get started?</h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-neutral-300 dark:text-neutral-600">
                Experience the security and flexibility of Next RBAC today.
            </p>
            <div className="mt-8 flex justify-center gap-4">
                 <Button asChild size="lg" className="h-12 bg-white text-black hover:bg-neutral-200 dark:bg-black dark:text-white dark:hover:bg-neutral-800">
                    <Link href="/login">
                        Get Started Now <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                 </Button>
            </div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-50 mt-20 w-full border-t border-neutral-200 bg-white py-12 dark:border-neutral-800 dark:bg-black">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 md:grid-cols-4 lg:grid-cols-5">
              <div className="col-span-2 lg:col-span-2">
                  <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                    <ShieldCheck className="h-6 w-6" />
                    <span>Next RBAC</span>
                  </div>
                  <p className="mt-4 max-w-xs text-sm text-neutral-500 dark:text-neutral-400">
                      A secure, scalable RBAC solution for modern web applications. Built with performance and security in mind.
                  </p>
              </div>
              <div>
                  <h4 className="font-semibold">Product</h4>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <li><a href="#" className="hover:text-black dark:hover:text-white">Features</a></li>
                      <li><a href="#" className="hover:text-black dark:hover:text-white">Security</a></li>
                      <li><a href="#" className="hover:text-black dark:hover:text-white">Roadmap</a></li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-semibold">Resources</h4>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <li><a href="#" className="hover:text-black dark:hover:text-white">Documentation</a></li>
                      <li><a href="#" className="hover:text-black dark:hover:text-white">API Reference</a></li>
                      <li><a href="#" className="hover:text-black dark:hover:text-white">Blog</a></li>
                  </ul>
              </div>
              <div>
                  <h4 className="font-semibold">Legal</h4>
                  <ul className="mt-4 space-y-2 text-sm text-neutral-500 dark:text-neutral-400">
                      <li><a href="#" className="hover:text-black dark:hover:text-white">Privacy</a></li>
                      <li><a href="#" className="hover:text-black dark:hover:text-white">Terms</a></li>
                  </ul>
              </div>
          </div>
          <div className="mx-auto mt-12 max-w-7xl px-6 text-center text-sm text-neutral-400">
              <p>© 2026 Next RBAC. All rights reserved.</p>
          </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, desc, bg }: any) {
    return (
        <div className="feature-card flex flex-col items-center rounded-2xl border border-neutral-200 bg-white/50 p-6 text-center backdrop-blur-sm transition-all hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900/50">
            <div className={`mb-4 rounded-full p-3 ${bg}`}>
                {icon}
            </div>
            <h3 className="mb-2 text-lg font-semibold">{title}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {desc}
            </p>
        </div>
    )
}

function StepCard({ step, title, desc }: any) {
    return (
        <div className="group flex flex-col items-center text-center rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-neutral-800 dark:bg-neutral-900/50">
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-neutral-900 to-neutral-700 text-2xl font-bold text-white shadow-lg group-hover:scale-110 transition-transform dark:from-white dark:to-neutral-300 dark:text-black">
                {step}
            </div>
            <h3 className="mb-3 text-xl font-bold tracking-tight">{title}</h3>
            <p className="max-w-[250px] text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">
                {desc}
            </p>
        </div>
    )
}
