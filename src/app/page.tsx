import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { AppsGrid } from "@/components/apps-grid";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <Hero />
      <AppsGrid />
      <About />
      <Footer />
    </div>
  );
}
