import { sanityFetch } from '@/sanity/live';
import { FOOTER_QUERY } from '@/sanity/queries';
import { DashedTitle, Logo, SectionTitle, Separator } from '@mns/ui';
import clsx from 'clsx';
import Link from 'next/link';

const COMPONENT_PADDING = 'px-4 md:px-6 lg:px-8 py-4 md:py-6';

export const AgencyFooter = async () => {
  const { data: footer } = await sanityFetch({
    query: FOOTER_QUERY,
    stega: false,
    perspective: 'published',
  });

  if (!footer) return null;

  const { footerColumns, footerText, contactInfo } = footer;

  return (
    <footer className="text-brand-white font-header gap-y-4 gap-x-6 md:gap-x-8">
      <div
        className={clsx(
          'grid md:grid-cols-2 lg:grid-cols-4 bg-brand-black-800',
          COMPONENT_PADDING,
        )}
      >
        <div>
          <Logo className="font-body" size="lg" />
          <p>{footerText}</p>
        </div>

        {footerColumns?.map((column) => (
          <div key={column._key} className="space-y-2">
            <p className="font-semibold text-primary">
              {column.title as string}
            </p>
            <ul className="list-inside">
              {column.links?.map((link) => (
                <li key={link._key}>
                  <Link href={link.href as string}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* newsletter form */}

      <div
        className={clsx(
          'bg-brand-black-950 flex flex-col justify-center items-center text-center gap-y-6 md:gap-y-8',
          COMPONENT_PADDING,
        )}
      >
        <SectionTitle as="h4" size="sm">
          Plug in. <span className="text-primary">Start working.</span>
        </SectionTitle>

        {contactInfo && (
          <div>
            <p>
              <span>{contactInfo.street} </span>
              <span>{contactInfo.city}, </span>
              <span>{contactInfo.state}. </span>
              <span>{contactInfo.zip}</span>
            </p>
            <p className="text-fs-300 text-brand-black-400">
              <span>{contactInfo.lat}&deg;</span>
              <span>{contactInfo.long}&deg;</span>
            </p>
          </div>
        )}

        <Separator className="bg-input" />

        <div className="flex justify-between items-center w-full">
          <p>&copy; {new Date().getFullYear()} mns</p>
          {/* social */}
          <p>Powerful software, made simple.</p>
        </div>
      </div>
    </footer>
  );
};
