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
		};
	};
}

export interface About {
	bio: unknown; // Portable Text
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
	body: unknown; // Portable Text
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

export interface FoodGuideItem {
	name: string;
	area?: string;
	whatToOrder?: string;
	notes?: string;
	link?: string;
}

export interface FoodGuideSection {
	category: string;
	title?: string;
	description?: string;
	items?: FoodGuideItem[];
}

export interface FoodGuideCity {
	name: string;
	country?: string;
	description?: string;
	sections?: FoodGuideSection[];
}

export interface FoodGuide {
	title: string;
	intro?: string;
	cities?: FoodGuideCity[];
}

export interface BookItem {
	_id: string;
	title: string;
	author?: string;
	coverImage?: SanityImage;
	status?: 'want-to-read' | 'currently-reading' | 'read' | 're-read';
	genre?: string;
	favoriteQuote?: string;
	notes?: string;
	link?: string;
}
