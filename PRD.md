# Product Requirements Document (PRD) - Janvi's Portfolio

## 1. Overview
A minimalist, grid-based portfolio website for a Marketing and Strategy Master's student. The site will serve as a central hub for her professional projects, academic writings, and personal blog, featuring a playful "cat element" to reflect her personality.

## 2. Goals
- **Showcase Professional Work**: Display marketing and strategy projects in an engaging way.
- **Highlight Academic Rigor**: Dedicated section for academic papers and writings.
- **Personal Expression**: Share thoughts via a blog and show personality via design elements.
- **Maintainability**: Easy-to-update content for a non-technical user (or easy for the developer to update via config).

## 3. Target Audience
- Recruiters and Hiring Managers in Marketing/Strategy.
- Academic peers and professors.
- Industry connections.

## 4. Design Aesthetics
- **Style**: Minimalist, clean, modern. Inspired by "pauwee.com" (grid layout, ample whitespace, clear typography).
- **Theme**: Professional but with a "fun" twist.
- **Key Element**: A small, interactive or decorative cat element (e.g., following cursor, peeking from corners, or part of the loader).
- **Typography**: Clean Sans-serif (e.g., Inter, Geist) or Monospace for a "technical/modern" feel (like the reference).

## 5. Functional Requirements

### 5.1. Routes & Structure

#### `/` (Home)
- **Hero Section**: Short intro, Name, Role/Tagline.
- **About Section**: Brief bio, what she does, interests.
- **Work Section**: 
    - Carousel display of projects.
    - Each item: Image, Title, Description, "View Project" link (icon).
- **Connect Section**: Footer or bottom section.
    - Social Links: LinkedIn, Twitter/X, Substack, Email.

#### `/academic`
- **List View**: Chronological or categorical list of academic writings.
- **Item Details**: Title, Subtitle (Context/Journal), Date, Link to paper/PDF.
- **Editability**: Managed via CMS.

#### `/blog`
- **List View**: List of blog posts.
- **Content**: Rich text posts.
- **Features**: Simple reading layout.

### 5.2. Data & Content Management (CMS)
- **Platform**: **Sanity.io** (Headless CMS).
    - *Why*: Provides a built-in "Studio" (Dashboard) for her to log in, upload images, and edit text without us building a custom backend.
    - **Login Flow**: Handled by Sanity.
    - **Storage**: Cloud-hosted (reliable, backed up).
- **Schemas needed**:
    - `project`: Title, Slug, Image, Description, Link.
    - `academicWork`: Title, Publication, Date, Link.
    - `post`: Title, Slug, PublishedAt, Body (Rich Text).

## 6. Technical Stack
- **Frontend**: **SvelteKit**.
    - *Deployment*: Vercel (Auto-deploys on git push).
- **Styling**: **Tailwind CSS**.
- **Backend/CMS**: **Sanity.io**.
    - Connected via `@sanity/client` in SvelteKit.
- **Icons**: **Lucide-Svelte**.
- **Animation**: **Svelte Transitions**.

## 7. Implementation Plan
1.  **Setup**: Initialize SvelteKit project with Tailwind CSS.
2.  **Architecture**: Create data structures (JSON schemas) for content.
3.  **Components**:
    - `Layout.svelte`: Global nav and footer (Connect).
    - `Cat.svelte`: The fun element.
    - `ProjectCard.svelte`: For the work carousel.
    - `AcademicEntry.svelte`: For the academic list.
4.  **Pages**: Implement Home, Academic, and Blog routes.
5.  **Review**: Verify design and responsiveness.

## 8. Open Questions for Review
- **Cat Interaction**: Should the cat be static (just an image), animated (gif/lottie), or interactive (follows cursor)? *Recommendation: A subtle interactive cat that watches the cursor.*
- **Carousel Style**: Auto-scroll or manual navigation? *Recommendation: Manual with snap scrolling.*
