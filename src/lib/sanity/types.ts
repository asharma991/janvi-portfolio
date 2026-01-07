export interface SanityImage {
  asset: {
    _ref: string;
    _type: string;
  };
  alt?: string;
}

export interface Project {
  _id: string;
  title: string;
  slug: { current: string };
  mainImage?: SanityImage;
  description: string;
  link?: string;
  category?: 'academic' | 'project' | 'article' | 'case-competition';
}

export interface MediaItem {
  _id: string;
  image: SanityImage;
  caption?: string;
}

export interface MusicItem {
  _id: string;
  title: string;
  artist?: string;
  coverImage?: SanityImage;
  link?: string;
}

export interface Resume {
  file: {
    asset: {
      url: string;
    }
  };
}

export interface About {
  bio: any; // Portable Text
  image?: SanityImage;
}

export interface SiteSettings {
  substackUrl?: string;
  spotifyEmbedUrl?: string;
  socials?: { platform: string; url: string }[];
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: { current: string };
  publishedAt: string;
  body: any; // Portable Text
  mainImage?: SanityImage;
  excerpt?: string;
}

export interface AcademicWork {
    _id: string;
    title: string;
    subtitle?: string; 
    publicationDate: string;
    link?: string; 
  }
