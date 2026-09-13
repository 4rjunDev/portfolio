import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Showcase } from "@/components/showcase";
import { AppsIndex } from "@/components/apps-index";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <Hero />
      <Showcase />
      <AppsIndex />
      <About />
      <Footer />
    </div>
  );
}
