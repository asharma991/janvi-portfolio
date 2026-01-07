I'll restructure the website to match your new vision. Here is the plan:

### 1. Data Structure (Sanity Schemas)
I will update the content structure to support the new pages:
*   **Projects (`project`)**: Add a `category` field (Academic, Project, Case Competition) so everything fits in "Work".
*   **Media (`media`)**: New schema for the photo grid (Image + Caption).
*   **Music (`music`)**: New schema for favorite songs/albums.
*   **Resume (`resume`)**: A dedicated place to upload the PDF.
*   **About (`about`)**: Single place to edit the bio.
*   **Settings (`siteSettings`)**: To store the Substack URL and Spotify embed link.

### 2. Frontend Implementation
*   **Home Page (`/`)**:
    *   Implement the **3x2 Grid Layout** (About, Work, Blog, Resume, Media, Music).
    *   **Custom Cursors**: I'll build a custom cursor component that changes emojis/icons based on which grid you hover (e.g., 🐱💻 for Work, 🐱🎧 for Music).
*   **New Routes**:
    *   `/about`: Centered text layout.
    *   `/work`: Grid of project cards (minimalist, hover for icon).
    *   `/blog`: Auto-redirect to Substack.
    *   `/resume`: Simple page to preview/download the latest resume.
    *   `/media`: Photo grid with hover captions.
    *   `/music`: Album grid + Spotify player.
*   **Navigation**: Inner pages will have a simple "Back to Home" or minimal header.

### 3. Execution Order
1.  **Sanity**: Create new schemas.
2.  **Components**: Build `GridMenu` (Home) and `CustomCursor`.
3.  **Pages**: Implement each route (`about`, `work`, `media`, `music`, `resume`, `blog`).
4.  **Styling**: Apply the minimalist "pauwee" aesthetic.

I will start by setting up the new Sanity schemas so the data structure is ready.