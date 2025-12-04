<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/drive/15ySg0v3UUIaZaBLiTINo_O3ldK9gvwn_

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** (comes with Node.js)

## Setup & Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Create a `.env.local` file in the root directory and add your Gemini API key:
   ```
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## Project Structure

- `App.tsx` - Main application component with multi-language support
- `public/` - Static assets (images, logos)
- `index.html` - HTML template
- `index.css` - Tailwind CSS styles
- `tailwind.config.js` - Tailwind configuration
- `postcss.config.cjs` - PostCSS configuration

## Features

- Multi-language support (English, Hindi, Marathi, Gujarati, Tamil, Malayalam, Telugu, Bengali)
- Responsive design
- Interactive roadmap with timeline
- Membership tier calculator
- Payment modal with UPI/Crypto options
- Detailed whitepaper section
- FAQ section

## Deployment

Build the project for production:
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Vite** - Build tool & dev server
sive instructions for anyone wanting to run or deploy your HeliosHash DAO application.
