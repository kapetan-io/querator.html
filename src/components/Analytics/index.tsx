import { useEffect } from 'react';
import { useLocation } from '@docusaurus/router';
import { OpenPanel } from '@openpanel/web';

const op = new OpenPanel({
  clientId: '48e8ecf4-cc88-4a00-a9e6-3307af8e9939',
  trackScreenViews: true,
  trackOutgoingLinks: true,
  trackAttributes: true,
});

export default function Analytics(): null {
  const location = useLocation();

  useEffect(() => {
    // Track route changes
    op.track('screen_view');
  }, [location.pathname]);

  return null;
}