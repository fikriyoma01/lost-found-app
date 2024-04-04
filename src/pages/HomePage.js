import React from 'react';
import HeroSection from '../components/HeroSection';
import FeatureCards from '../components/FeatureCards';

export default function HomePage() {
  return (
    <div sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <HeroSection />
      <FeatureCards />
      {/* Content selanjutnya */}
    </div>
  );
}
