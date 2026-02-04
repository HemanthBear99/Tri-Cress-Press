import { SignIn } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="flex items-center justify-center min-h-screen bg-background-light dark:bg-background-dark pt-20">
            <SignIn
                appearance={{
                    elements: {
                        formButtonPrimary: "bg-primary text-navy-deep hover:bg-white transition-all",
                        card: "bg-white dark:bg-white/5 border border-navy-deep/5 dark:border-white/5 shadow-xl rounded-2xl",
                    }
                }}
            />
        </div>
    );
}
