import { LandingSection } from '@rckit/landing';
import Link from 'next/link';
import { Button } from 'react-bootstrap';

import { brandCompany, brandDescription, brandTitle } from '@/config/branding';
import { LayoutNavbar } from '@/layouts/components/LayoutNavbar';

// Inspired by: https://yevgenysim-turkey.github.io/incline/
export default function HomePage() {
  return (
    <>
      <LayoutNavbar />
      <LandingSection
        full
        // top
        backgroundImage="/assets/cover.jpg"
      >
        <LandingSection.Container>
          <p
            className="font-weight-medium text-center text-xs text-uppercase text-white animate"
            data-toggle="animation"
            data-animation="fadeUp"
            data-animation-order={0}
            data-animation-trigger="load"
          >
            by {brandCompany}
          </p>
          <h1
            className="text-white text-center mb-4 animate"
            data-toggle="animation"
            data-animation="fadeUp"
            data-animation-order={1}
            data-animation-trigger="load"
          >
            {brandTitle}
          </h1>
          <p
            className="lead text-white text-center mb-5 animate"
            data-toggle="animation"
            data-animation="fadeUp"
            data-animation-order={2}
            data-animation-trigger="load"
          >
            {brandDescription}
          </p>
          <p
            className="text-center mb-0 animate"
            data-toggle="animation"
            data-animation="fadeUp"
            data-animation-order={3}
            data-animation-trigger="load"
          >
            <Button
              // @ts-ignore
              as={Link}
              href="/cabinet"
              variant="outline-light"
              size="lg"
            >
              Try free
            </Button>
          </p>
        </LandingSection.Container>
      </LandingSection>
    </>
  );
}
