import Categories from "@/components/Categories";
import FAQ from "@/components/FAQ";
import HeroSection from "@/components/HeroSection";

export default function Home() {
  return (
    <div>
      <HeroSection />
      <Categories></Categories>
      <FAQ></FAQ>
    </div>
  );
}