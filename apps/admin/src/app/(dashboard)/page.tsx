import { env } from '@/lib/env/server';
import { Bounded } from '@mns/ui';
import { GoogleAnalytics } from '@next/third-parties/google';

export default function Home() {
  return (
    <Bounded>
      <GoogleAnalytics gaId={env.GA_MEASUREMENT_ID} />
    </Bounded>
  );
}
