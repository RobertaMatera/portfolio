import Navbar from "../shared/layout/Navbar/Navbar";
import Hero from "../shared/sections/Hero/Hero";

export default function Home() {
  return (
    <div className="page-shell">
      <Navbar />
      <main className="page-main">
        <Hero />
      </main>
    </div>
  );
}
