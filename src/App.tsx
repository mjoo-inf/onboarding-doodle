import { useState } from 'react';
import { MantineProvider, MantineThemeOverride, Modal } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { OnboardingPage } from './onboarding/OnboardingPage';
import { HomePage } from './onboarding/pages/HomePage';
import { SearchResultsPage } from './onboarding/pages/SearchResultsPage';

const theme: MantineThemeOverride = {
  colors: {
    infgreen: [
      '#E6F9F2',
      '#CCF3E5',
      '#99E7CB',
      '#66DBB1',
      '#33CF97',
      '#00C47D',
      '#00C471',
      '#00A661',
      '#008851',
      '#004D2D',
    ],
    cyan: [
      '#E3FAFC',
      '#C5F6FA',
      '#99E9F2',
      '#66D9E8',
      '#3BC9DB',
      '#22B8CF',
      '#15AABF',
      '#1098AD',
      '#0C8599',
      '#0B7285',
    ],
  },
  primaryColor: 'infgreen',
};

function App() {
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);
  const [hasSkippedOnboarding, setHasSkippedOnboarding] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleOnboardingComplete = () => {
    setIsOnboardingCompleted(true);
    setIsOnboardingOpen(false);
  };

  const handleOnboardingSkip = () => {
    setHasSkippedOnboarding(true);
    setIsOnboardingOpen(false);
  };

  const handleSearch = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setSearchQuery(trimmed);
    setIsSearchOpen(true);
  };

  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      {isSearchOpen ? (
        <SearchResultsPage
          userName="사용자"
          query={searchQuery}
          onBack={() => setIsSearchOpen(false)}
          onSearch={handleSearch}
          isOnboardingCompleted={isOnboardingCompleted}
          onStartOnboarding={() => setIsOnboardingOpen(true)}
        />
      ) : (
        <HomePage
          userName="사용자"
          isOnboardingCompleted={isOnboardingCompleted}
          hasSkippedOnboarding={hasSkippedOnboarding}
          isOnboardingOpen={isOnboardingOpen}
          onStartOnboarding={() => setIsOnboardingOpen(true)}
          onSearch={handleSearch}
        />
      )}

      {isOnboardingOpen && (
        <Modal
          opened={isOnboardingOpen}
          onClose={handleOnboardingSkip}
          size="lg"
          radius="lg"
          centered
          fullScreen={isMobile}
          withCloseButton={false}
          closeOnClickOutside={false}
          closeOnEscape
          padding={0}
          overlayProps={{
            opacity: 0.5,
            blur: 3,
          }}
          styles={{
            content: {
              maxHeight: isMobile ? '100dvh' : '85vh',
              height: isMobile ? '100dvh' : 'auto',
              overflow: 'hidden',
            },
            body: {
              padding: 0,
              height: isMobile ? '100%' : '100%',
              maxHeight: isMobile ? '100dvh' : '85vh',
              overflow: 'hidden',
            },
          }}
        >
          <OnboardingPage
            userName="사용자"
            onComplete={handleOnboardingComplete}
            onSkip={handleOnboardingSkip}
          />
        </Modal>
      )}
    </MantineProvider>
  );
}

export default App;
