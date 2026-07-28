import Navbar from "../shared/layout/Navbar/Navbar";
import Hero from "../shared/sections/Hero/Hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 font-sans dark:bg-black">
      <Navbar />
      <main className="mx-auto flex w-full max-w-7xl flex-col px-6 pb-16 pt-28 sm:px-10 lg:px-16">
        <Hero />
      </main>
    </div>
  );
}
