export type MediaProps = {
  src: string;
  alt: string;
};

export type CallToActionProps = {
  label: string;
  href: string;
};

export type PageParamsSlugProps = {
  params: Promise<{ slug: string }>;
};

export type PageParamsIdProps = {
  params: Promise<{ id: string }>;
};

export type ActionResponse<T> =
  | { success: true; message: string; data?: T }
  | { success: false; message: string; field?: keyof T };

export type ImageResponse =
  { success: true; file: File } | { success: false; message: string };

export type OAuthProviders = 'google' | 'facebook' | 'tiktok' | 'linkedin';

export type ChatProps = {
  inbound: string;
  outbound: string;
};

// ---------------------------- //
// Emails                       //
// ---------------------------- //
export type SignUpVerificationProps = {
  name: string;
  email: string;
  url: string;
  expiresAt?: number;
};
