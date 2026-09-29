import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Ethos } from "@/components/ethos";
import { Showcase } from "@/components/showcase";
import { AppsIndex } from "@/components/apps-index";
import { About } from "@/components/about";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <Nav />
      <main id="content" className="flex flex-1 flex-col">
        <Hero />
        <Ethos />
        <Showcase />
        <AppsIndex />
        <About />
      </main>
      <Footer />
    </div>
  );
}
