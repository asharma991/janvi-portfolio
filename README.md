# Janvi's Portfolio

A minimalist portfolio website built with SvelteKit, Tailwind CSS, and Sanity CMS.

## Getting Started

1.  **Install Dependencies**:
    ```bash
    bun install
    ```

2.  **Start Development Server**:
    ```bash
    bun run dev
    ```

## Content Management (Sanity)

This project is configured to use Sanity.io as a headless CMS.

### 1. Setup Sanity Project
Since we cannot automatically create a Sanity project for you, you need to:

1.  Run `bunx sanity init --output-path studio` in the root folder.
2.  Login and create a new project.
3.  Choose "Clean project with no predefined schemas".

### 2. Configure Schemas
We have provided the necessary schemas in the `sanity-schemas/` folder.
Copy `project.ts`, `academic.ts`, and `post.ts` into your `studio/schemaTypes/` folder.

Then update `studio/schemaTypes/index.ts` to include them:

```typescript
import project from './project'
import academic from './academic'
import post from './post'

export const schemaTypes = [project, academic, post]
```

### 3. Connect Frontend
1.  Get your **Project ID** from the Sanity Dashboard or `studio/sanity.config.ts`.
2.  Create a `.env` file in the root directory:
    ```env
    VITE_SANITY_PROJECT_ID=your_project_id_here
    VITE_SANITY_DATASET=production
    ```
3.  Go to Sanity Dashboard > API > CORS Origins and add `http://localhost:5173` (and your production URL).

## Features

-   **Work**: Carousel of projects (Mock data used if Sanity not connected).
-   **Academic**: List of academic papers.
-   **Blog**: Personal blog with rich text.
-   **Cat**: A fun interactive element.
