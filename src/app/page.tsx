import { Suspense } from "react";
import { movieApi, tvApi } from "@/services/tmdb";
import { MovieGrid } from "@/components/ui/MovieCard";
import { TvGrid } from "@/components/ui/TvCard";
import { generateBaseMetadata, generateOrganizationJsonLd, generateWebsiteJsonLd, getRandomSeoKeywords } from "@/lib/seo";

const seoKeywords = getRandomSeoKeywords('general', 15);
const homeDescription = `Watch FREE Movies & TV Shows Online in HD | Stream Latest Films & Series | ${seoKeywords.slice(0, 5).join(' • ')} | No Registration Required | Multi-Language Support: English, Français, Español, Deutsch, Русский, 中文, 日本語 | KFLIX - Your Ultimate Free Streaming Destination`;

export const metadata = generateBaseMetadata(
  "KFLIX",
  homeDescription
);

async function FeaturedContent() {
  try {
    const [trendingMovies, popularTvShows, topRatedMovies, upcomingMovies] = await Promise.all([
      movieApi.getTrending(1),
      tvApi.getByCategory('popular', 1),
      movieApi.getByCategory('top_rated', 1),
      movieApi.getByCategory('upcoming', 1)
    ]);

    return (
      <div className="space-y-12 pt-8">
        {/* Trending Movies */}
        <section className="px-6 lg:px-8">
          <MovieGrid
            movies={trendingMovies.results.slice(0, 12)}
            title="Trending Movies"
          />
        </section>

        {/* Popular TV Shows */}
        <section className="px-6 lg:px-8">
          <TvGrid
            shows={popularTvShows.results.slice(0, 12)}
          />
        </section>

        {/* Top Rated Movies */}
        <section className="px-6 lg:px-8">
          <MovieGrid
            movies={topRatedMovies.results.slice(0, 12)}
            title="Top Rated Movies"
          />
        </section>

        {/* Upcoming Movies */}
        <section className="px-6 lg:px-8">
          <MovieGrid
            movies={upcomingMovies.results.slice(0, 12)}
            title="Coming Soon"
          />
        </section>
      </div>
    );
  } catch (error) {
    console.error('Error fetching featured content:', error);
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Something went wrong</h2>
          <p className="text-gray-400">Unable to load content. Please try again later.</p>
        </div>
      </div>
    );
  }
}

function LoadingSkeleton() {
  return (
    <div className="space-y-12 px-6 lg:px-8">
      {[1, 2, 3, 4].map((section) => (
        <div key={section} className="space-y-6">
          <div className="h-8 w-64 bg-gray-800 rounded animate-pulse" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="aspect-[2/3] bg-gray-800 rounded-lg animate-pulse" />
                <div className="space-y-2">
                  <div className="h-4 bg-gray-800 rounded animate-pulse" />
                  <div className="h-3 w-2/3 bg-gray-800 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  const organizationSchema = generateOrganizationJsonLd();
  const websiteSchema = generateWebsiteJsonLd();

  return (
    <>
      {/* Enhanced Schema.org markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <div className="min-h-screen bg-gray-950">
        {/* SEO-optimized hidden content for crawlers */}
        <div className="sr-only">
          <h1>Free Movies and TV Shows Streaming Online - KFLIX</h1>
          <p>
            Stream thousands of movies and TV series for free in multiple languages. 
            Watch latest Hollywood blockbusters, international cinema, popular TV series, 
            documentaries, and more. Available in English, Français, Español, Deutsch, 
            Русский, 中文, 日本語, 한국어, Português, Italiano. No registration required.
          </p>
          <div>
            Keywords: {seoKeywords.join(', ')}
          </div>
        </div>

        <Suspense fallback={<LoadingSkeleton />}>
          <FeaturedContent />
        </Suspense>
      </div>
    </>
  );
}
