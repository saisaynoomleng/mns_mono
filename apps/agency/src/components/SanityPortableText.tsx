import { urlFor } from '@/sanity/image';
import { PortableTextComponents } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';

export const SanityPortableTextComponent: PortableTextComponents = {
  types: {
    imageWithAlt: (props) =>
      props.value ? (
        <div className="overflow-hidden relative aspect-square">
          <Image
            src={urlFor(props.value).format('webp').url()}
            alt={props.value?.alt}
            width={400}
            height={400}
            className="min-w-100 mx-auto"
          />
        </div>
      ) : null,
  },

  list: {
    bullet: ({ children }) => <ul className="list-inside">{children}</ul>,
    number: ({ children }) => <ol className="list-inside">{children}</ol>,
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="marker:text-primary">{children}</li>
    ),

    number: ({ children }) => (
      <li className="marker:text-primary">{children}</li>
    ),
  },

  marks: {
    em: ({ children }) => <span className="italic">{children}</span>,
    strong: ({ children }) => (
      <span className="font-semibold text-primary">{children}</span>
    ),

    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http')
        ? '_blank'
        : undefined;

      return (
        <Link
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noreferrer nofollow' : ''}
          className="text-primary underline underline-offset-2"
        >
          {children}
        </Link>
      );
    },
  },

  block: {
    h1: ({ children }) => (
      <h1 className="text-fs-600 font-header">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-fs-600 font-header">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-fs-600 font-header">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-fs-600 font-header">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-fs-600 font-header">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-fs-600 font-header">{children}</h6>
    ),
    normal: ({ children }) => <p className="font-body">{children}</p>,
  },
};
