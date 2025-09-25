# KFLIX - Streaming Platform

A modern, responsive streaming platform built with Next.js 14, TypeScript, and Tailwind CSS. Features a Plex-like interface for discovering and streaming movies and TV shows.

## 🚀 Features

- **Modern UI/UX**: Clean, responsive design inspired by Plex
- **Movie & TV Database**: Comprehensive content library powered by TMDB API
- **Advanced Search**: Multi-search with filters for movies, TV shows, and people
- **Streaming Integration**: Multiple streaming sources with fallback options
- **SEO Optimized**: Dynamic meta tags, JSON-LD schema, and sitemap generation
- **Mobile-First**: Fully responsive design for all devices
- **Performance**: Optimized images, lazy loading, and caching strategies

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide React icons
- **API**: TMDB (The Movie Database) API
- **Deployment**: Vercel
- **Domain**: kflix.space

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/kflix.git
cd kflix
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Add your TMDB API key to `.env.local`:
```
TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_DOMAIN=kflix.space
```

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## 🔧 Configuration

### TMDB API Setup

1. Create an account at [TMDB](https://www.themoviedb.org/)
2. Go to Settings > API
3. Create a new API key (v3 auth)
4. Add the API key to your environment variables

### Domain Configuration

For production deployment on kflix.space:

1. Configure DNS records:
   - A record: `@` → Vercel IP
   - CNAME record: `www` → `kflix.space`

2. Update Vercel project settings:
   - Add custom domain: `kflix.space`
   - Add redirect: `www.kflix.space` → `kflix.space`

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── movie/[id]/        # Movie detail pages
│   ├── tv/[id]/           # TV show detail pages
│   ├── search/            # Search functionality
│   ├── movies/            # Movies catalog
│   ├── tv/                # TV shows catalog
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── robots.ts          # SEO robots.txt
│   └── sitemap.ts         # Dynamic sitemap
├── components/            # React components
│   ├── ui/                # UI components
│   └── layout/            # Layout components
├── services/              # API services
├── lib/                   # Utilities and helpers
└── types/                 # TypeScript type definitions
```

## 🎯 API Routes

### Movies
- `/movie/[id]` - Movie details
- `/movies` - Movies catalog
- Categories: popular, top_rated, now_playing, upcoming

### TV Shows
- `/tv/[id]` - TV show details  
- `/tv/[id]/season/[season]` - Season details with episodes
- `/tv` - TV shows catalog
- Categories: popular, top_rated, airing_today, on_the_air

### Search
- `/search` - Multi-search functionality
- Filters: movies, TV shows, people

## 🔍 SEO Features

- **Dynamic Meta Tags**: Auto-generated for all content pages
- **JSON-LD Schema**: Rich snippets for movies and TV shows
- **Open Graph**: Social media optimization
- **Sitemap**: Auto-generated with popular content
- **Robots.txt**: Search engine optimization
- **Performance**: Core Web Vitals optimization

## 🚀 Deployment

### Railway (Recommended)

1. **Connect GitHub Repository**:
   - Go to [Railway](https://railway.app)
   - Click "Start a New Project"
   - Select "Deploy from GitHub repo"
   - Connect your repository: `https://github.com/daovinhkhang/kflix-new.git`

2. **Configure Environment Variables**:
   ```
   NODE_ENV=production
   PORT=3000
   TMDB_API_KEY=your_tmdb_api_key_here
   ```

3. **Deployment Configuration**:
   Railway will automatically detect the `nixpacks.toml` and `railway.json` files for optimal deployment.

### Vercel (Alternative)

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel --prod
```

3. Add environment variables in Vercel dashboard

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. Start production server:
```bash
npm start
```

## 📱 Mobile Optimization

- **Responsive Design**: Mobile-first approach
- **Touch Interactions**: Optimized for touch devices
- **Performance**: Lazy loading and image optimization

## 🔐 Security Features

- **Content Security Policy**: XSS protection
- **HTTPS Only**: Secure connections
- **Input Validation**: Sanitized search queries

## 🎨 Customization

### Themes
The app uses a dark theme by default. Colors can be customized in `tailwind.config.ts`.

### Components
All UI components are customizable and located in `src/components/ui/`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **TMDB**: Movie and TV show data
- **Vercel**: Hosting and deployment
- **Next.js**: React framework
- **Tailwind CSS**: Utility-first CSS framework

---

Made with ❤️ for movie and TV enthusiasts
