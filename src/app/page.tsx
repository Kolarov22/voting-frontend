import { ArrowRight, CheckCircle, Lock, ShieldCheck, Vote } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen">
      <section className="container px-4 py-24 md:py-32 mx-auto">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="space-y-4 max-w-3xl">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-grey-accent dark:text-frost-white">
              Secure E-Voting{" "}
              <span className="text-purple-accent">Powered by Blockchain</span>
            </h1>
            <p className="text-xl text-grey-accent/80 dark:text-frost-white/80 max-w-2xl mx-auto">
              Transform the way elections are conducted with our transparent,
              secure, and tamper-proof blockchain voting platform.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={"/accounts"}>
              <button className="bg-purple-cta hover:bg-purple-cta/90 text-white px-6 py-3 rounded-md shadow-md flex items-center">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </Link>
            <button className="border-purple-accent text-purple-accent hover:bg-purple-accent/10 border hover:border-purple-accent px-6 py-3 rounded-md shadow-md flex items-center">
              <a href="#learn-more">Learn More</a>
            </button>
          </div>
        </div>
      </section>

      <section className="container px-4 py-24 bg-white/50 dark:bg-grey-accent/50 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-grey-accent dark:text-frost-white">
            Why Choose Blockchain E-Voting?
          </h2>
          <p className="mt-4 text-lg text-grey-accent/80 dark:text-frost-white/80 max-w-2xl mx-auto">
            Our platform combines cutting-edge blockchain technology with
            user-friendly design
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-grey-accent/80 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="h-12 w-12 rounded-full bg-purple-accent/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-purple-accent" />
              </div>
              <h3 className="text-xl font-medium text-grey-accent dark:text-frost-white mb-2">
                {feature.title}
              </h3>
              <p className="text-grey-accent/70 dark:text-frost-white/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="learn-more" className="container px-4 py-24 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-grey-accent dark:text-frost-white">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-grey-accent/80 dark:text-frost-white/80 max-w-2xl mx-auto">
            Simple, secure, and transparent voting in just a few steps
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="h-12 w-12 rounded-full bg-purple-cta text-white flex items-center justify-center mb-4 text-xl font-bold">
                  {index + 1}
                </div>
                <h3 className="text-xl font-medium text-grey-accent dark:text-frost-white mb-2">
                  {step.title}
                </h3>
                <p className="text-grey-accent/70 dark:text-frost-white/70">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-purple-accent/30"></div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

const features = [
  {
    title: "Secure & Tamper-Proof",
    description:
      "Blockchain technology ensures votes cannot be altered or deleted once recorded, maintaining the integrity of every election.",
    icon: Lock,
  },
  {
    title: "Transparent & Verifiable",
    description:
      "All transactions are publicly verifiable while maintaining voter privacy, ensuring complete transparency in the electoral process.",
    icon: ShieldCheck,
  },
  {
    title: "Accessible & Inclusive",
    description:
      "Vote from anywhere with an internet connection, making participation easier for everyone, including those with mobility challenges.",
    icon: Vote,
  },
  {
    title: "Instant Results",
    description:
      "Real-time counting and tabulation eliminates waiting periods and reduces the cost of traditional vote counting methods.",
    icon: CheckCircle,
  },
  {
    title: "Immutable Records",
    description:
      "Once recorded on the blockchain, votes cannot be changed or deleted, ensuring the integrity of the electoral process.",
    icon: Lock,
  },
  {
    title: "Decentralized System",
    description:
      "No single authority controls the voting process, reducing the risk of manipulation and increasing trust in the results.",
    icon: ShieldCheck,
  },
];

const steps = [
  {
    title: "Create Account",
    description:
      "Register with your identity credentials to receive your secure voting access.",
  },
  {
    title: "Verify Identity",
    description:
      "Complete the verification process to ensure only eligible voters participate.",
  },
  {
    title: "Access Ballot",
    description:
      "Securely access your personalized ballot during the election period.",
  },
  {
    title: "Cast Your Vote",
    description:
      "Vote securely with your choices recorded permanently on the blockchain.",
  },
];
