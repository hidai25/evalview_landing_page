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
│   └── WaitlistForm.tsx   # Email waitlist form
├── App.tsx                # Main application
├── index.html             # HTML entry point
├── index.tsx              # React entry point
├── vite.config.ts         # Vite configuration
└── package.json
```

## Waitlist Integration

The waitlist form submits emails to a Google Sheets via Google Apps Script. The script URL is configured in `components/WaitlistForm.tsx`.

## License

MIT
