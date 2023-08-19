import Boundary from '@/components/Boundary/Boundary';
import SectionFeatures from '@/features/index/SectionFeatures/SectionFeatures';
import SectionHero from '@/features/index/SectionHero/SectionHero';

/**
 * Index page, contains all index components, acts as a landing page
 */
export default function Home() {

  return (
    <main>
      <SectionHero />
      <Boundary py={'lg'}>
        <SectionFeatures />
      </Boundary>
    </main>
  )
}
