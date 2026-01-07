You are absolutely right. If we need a **login flow** and a user-friendly interface to **edit and save content**, a simple JSON file approach won't work well (unless you are comfortable editing code).

To keep the tech stack "very simple" while providing a **full Login + Edit + Save** experience, I strongly recommend using a **Headless CMS** like **Sanity.io** instead of building a custom backend from scratch.

### Why Sanity.io?
1.  **Login Flow**: It comes with a pre-built "Studio" dashboard where she can log in securely.
2.  **Database**: Content is saved instantly to their cloud database (no need to manage your own server).
3.  **Editing**: It provides nice forms for text, image uploads (for the work carousel), and a rich text editor (for the blog).
4.  **Integration**: SvelteKit simply fetches the data via an API.

### Revised Implementation Plan

## 1. Tech Stack
*   **Frontend**: SvelteKit + Tailwind CSS.
*   **Backend/CMS**: **Sanity.io** (Free tier is generous for personal sites).
*   **Deployment**: Vercel (Frontend) + Sanity Studio (Admin Panel).

## 2. Data Structure (Sanity Schemas)
We will define these schemas in code, and Sanity generates the UI for them:
*   **Projects**: Title, Image, Description, Link.
*   **Academic**: Title, Journal/Context, Date, PDF Link.
*   **Blog**: Title, Slug, Content (Rich Text).

## 3. Implementation Steps
1.  **Setup**: Initialize SvelteKit app.
2.  **CMS Setup**: Initialize a Sanity project inside the repo (or separate). Define schemas.
3.  **Frontend Dev**: Build the SvelteKit pages to fetch data from Sanity.
4.  **UI/UX**: Implement the grid design and the "Cat Element".

This approach saves us from writing authentication logic, database connectors, and API endpoints manually, which keeps the code *much* simpler and more robust.

Do you agree with using Sanity for the backend?