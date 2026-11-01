import React, { useState } from 'react';
import { Preloader } from './components/Preloader';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { WorkshopScene } from './components/WorkshopScene';
import { AboutSection } from './components/AboutSection';
import { ServicesSection } from './components/ServicesSection';
import { UsedCarsShowroom } from './components/UsedCarsShowroom';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';

export default function App() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<string>('Vehicle Maintenance');
  const [homeAnimTrigger, setHomeAnimTrigger] = useState<number>(0);
  const [aboutAnimTrigger, setAboutAnimTrigger] = useState<number>(0);
  const [servicesAnimTrigger, setServicesAnimTrigger] = useState<number>(0);
  const [usedCarsAnimTrigger, setUsedCarsAnimTrigger] = useState<number>(0);
  const [contactAnimTrigger, setContactAnimTrigger] = useState<number>(0);

  const handleOpenEnquiry = (serviceTitle?: string) => {
    if (serviceTitle) {
      setSelectedService(serviceTitle);
    }
    setEnquiryModalOpen(true);
  };

  const handleReplayIntro = () => {
    setShowPreloader(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] text-white flex flex-col selection:bg-[#E32636] selection:text-white">
      {/* Cinematic Brand Preloader / Entrance Sequence */}
      {showPreloader && (
        <Preloader onComplete={() => setShowPreloader(false)} />
      )}

      {/* Top Header Navigation */}
      <Navbar 
        onOpenEnquiry={() => handleOpenEnquiry('General Consultation')}
        onReplayIntro={handleReplayIntro}
        onTriggerHomeAnim={() => setHomeAnimTrigger((prev) => prev + 1)}
        onTriggerAboutAnim={() => setAboutAnimTrigger((prev) => prev + 1)}
        onTriggerServicesAnim={() => setServicesAnimTrigger((prev) => prev + 1)}
        onTriggerUsedCarsAnim={() => setUsedCarsAnimTrigger((prev) => prev + 1)}
        onTriggerContactAnim={() => setContactAnimTrigger((prev) => prev + 1)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Section 4: Cinematic Hero */}
        <Hero 
          onOpenEnquiry={() => handleOpenEnquiry('Vehicle Maintenance')}
          externalTrigger={homeAnimTrigger}
        />

        {/* Section 5: Animated Car Servicing Bay */}
        <WorkshopScene 
          onOpenEnquiry={() => handleOpenEnquiry('Workshop Diagnostic Service')}
        />

        {/* Section 6: About Us */}
        <AboutSection 
          externalTrigger={aboutAnimTrigger}
        />

        {/* Section 7: Our Services (Interactive Animated Cards) */}
        <ServicesSection 
          onSelectService={(serviceTitle) => handleOpenEnquiry(serviceTitle)}
          externalTrigger={servicesAnimTrigger}
        />

        {/* Section 8: Used Cars Showroom Experience */}
        <UsedCarsShowroom 
          onOpenEnquiry={(cat) => handleOpenEnquiry(cat || 'Used Car Enquiry')}
          externalTrigger={usedCarsAnimTrigger}
        />

        {/* Section 9: Why Choose Us */}
        <WhyChooseUs 
          onOpenEnquiry={(highlight) => handleOpenEnquiry(highlight || 'General Consultation')}
        />

        {/* Section 10: Interactive Contact Section */}
        <ContactSection 
          externalTrigger={contactAnimTrigger}
        />
      </main>

      {/* Section 12: Footer */}
      <Footer 
        onReplayIntro={handleReplayIntro}
      />

      {/* Interactive Enquiry Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={() => setEnquiryModalOpen(false)}
        defaultService={selectedService}
      />
    </div>
  );
}
