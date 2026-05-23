import AuthButton from "@/components/auth-button";
import ImagePreview from "@/components/others/image-preview";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { homeMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "@/types/types";
import { SignUpButton } from "@clerk/nextjs";
import { Calendar, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

export const metadata = homeMetadata;

const colorMap = {
    primary: {
        text: "text-primary",
        bg: "bg-primary",
        border: "border-primary/20",
    },
    green: {
        text: "text-emerald-500",
        bg: "bg-emerald-500",
        border: "border-emerald-500/20",
    },
    amber: {
        text: "text-amber-500",
        bg: "bg-amber-500",
        border: "border-amber-500/20",
    },
};

export default function Home() {
    return (
        <main className="space-y-24">
            <section className="flex flex-col items-center gap-6">
                <div className="text-center">
                    <h1 className="font-poppins text-4xl leading-tight font-extrabold tracking-tight md:text-6xl">
                        The Operating System for <br />
                        <span className="from-primary bg-linear-to-r to-purple-600 bg-clip-text text-transparent">Flawless Events.</span>
                    </h1>

                    <p className="text-muted-foreground mx-auto my-4 max-w-10/12 text-sm tracking-tight md:max-w-2xl md:text-base">
                        The unified workspace for modern event organizers. Synchronize your vendors, automate budget tracking, and command your
                        timelines with a dashboard that works as hard as you do.
                    </p>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <AuthButton />

                    <Button asChild size={"cta"} variant={"outline"}>
                        <Link href="/features">Features</Link>
                    </Button>
                </div>
            </section>

            <ImagePreview />

            <section className="px-4 md:px-12">
                <div className="mb-12 flex flex-col justify-center text-center">
                    <h2 className="font-poppins mx-auto mb-4 max-w-3xl text-2xl font-bold md:text-4xl">
                        Everything You Need to <span className="text-primary">Organize Like a Pro</span>
                    </h2>
                    <p className="text-muted-foreground text-sm tracking-tight md:text-base">
                        From budgets to vendors, timelines to tasks — EventSync puts the power back in your hands.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-3">
                    <FeatureCard
                        icon={Calendar}
                        title="Master Your Timeline"
                        subtitle="Keep every task, deadline, and event in perfect order. Coordinate multiple vendors and events with ease."
                        itemText1="Live Event Dashboard"
                        itemText2="Task & Timeline Management"
                        color="primary"
                    />

                    <FeatureCard
                        icon={CheckCircle2}
                        title="Track Budgets & Payments"
                        subtitle="Monitor your budgets, vendor deposits, and client payments effortlessly — never miss a detail."
                        itemText1="Budget vs Actual Tracking"
                        itemText2="Payment Status Alerts"
                        color="green"
                    />

                    <FeatureCard
                        icon={Sparkles}
                        title="Manage Vendors Seamlessly"
                        subtitle="Add, track, and organize all your vendors in one place. Keep communications and schedules clear without the chaos."
                        itemText1="Vendor List & Contact Tracking"
                        itemText2="Deposit & Due Date Management"
                        color="amber"
                    />
                </div>
            </section>
            <footer className="flex flex-col items-center gap-6 text-center">
                <h2 className="font-poppins text-2xl leading-8 font-bold md:text-4xl">
                    Ready to organize your next <span className="text-primary">event like a pro?</span>
                </h2>
                <p className="text-accent-foreground mx-auto max-w-10/12 text-sm md:max-w-xl md:text-base">
                    Join hundreds of organizers who have simplified their workflow and reclaimed their time.
                </p>

                <SignUpButton mode="modal">
                    <Button size={"cta"}>Create your free account</Button>
                </SignUpButton>
            </footer>
        </main>
    );
}

interface Card {
    icon: LucideIcon;
    title: string;
    subtitle: string;
    itemText1: string;
    itemText2: string;
    color: keyof typeof colorMap;
}

function FeatureCard({ icon: Icon, title, subtitle, itemText1, itemText2, color }: Card) {
    return (
        <Card
            className={`group relative overflow-hidden p-8 transition-all duration-500 hover:-translate-y-1 dark:border-white/5 dark:bg-zinc-900/30 dark:hover:bg-zinc-900/40`}
        >
            <div
                className={cn(
                    colorMap[color].bg,
                    "absolute -top-4 -right-4 size-24 opacity-15 blur-3xl transition-opacity duration-500 group-hover:opacity-25 md:opacity-10",
                )}
            />

            <div className="mb-4 flex flex-col gap-4">
                <div
                    className={cn(
                        colorMap[color].text,
                        colorMap[color].border,
                        "grid size-12 place-items-center rounded-xl border transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 md:opacity-70",
                    )}
                >
                    <Icon className="size-6" />
                </div>
                <h3 className="font-poppins text-foreground md:dark:text-foreground/50 md:dark:group-hover:text-foreground text-xl font-bold tracking-wide transition-colors duration-500 md:tracking-tight">
                    {title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{subtitle}</p>
            </div>

            <div className="mt-auto space-y-3 border-t pt-6 dark:border-white/5">
                <FeatureItem text={itemText1} />
                <FeatureItem text={itemText2} />
            </div>
        </Card>
    );
}

function FeatureItem({ text }: { text: string }) {
    return (
        <div className="flex items-center gap-2 font-medium">
            <CheckCircle2 className="size-4 text-emerald-500" />
            <span className="dark:text-primary/70 text-primary text-sm">{text}</span>
        </div>
    );
}
