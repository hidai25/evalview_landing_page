# EvalView Landing Page

Marketing landing page for [EvalView](https://github.com/hidai25/EvalView) - the open-source testing framework for AI agents.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS (via CDN)
- Lucide React (icons)

## Local Development

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

```bash
# Build the app
npm run build

# Preview production build
npm run preview
```

## Deployment

The `dist/` folder can be deployed to any static hosting:

- GitHub Pages
- Vercel
- Netlify
- Cloudflare Pages

## Project Structure

```
evalview_landing_page/
├── components/
│   ├── CodeBlock.tsx      # YAML code example
│   ├── Terminal.tsx       # Terminal animation
│   └── PilotEmailLink.tsx # Contact link for the workflow pilot
├── App.tsx                # Main application
├── index.html             # HTML entry point
├── index.tsx              # React entry point
├── vite.config.ts         # Vite configuration
└── package.json
```

## Workflow pilot

The homepage invites visitors to email Hidai one workflow to test. The email link opens a draft in the visitor’s mail app. GA4 records `pilot_email_click` with the link placement. Count replies in the inbox to measure actual inquiries.

## License

MIT
