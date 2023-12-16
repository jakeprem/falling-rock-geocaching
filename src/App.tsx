import { CacheGrid } from "./components/CacheGrid";
import { DownloadPDF } from "./components/DownloadPDF";

function App() {
  return (
    <>
      <main className="container mx-auto">
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                Camp Falling Rock - Geocaching
              </h1>
              <DownloadPDF />
            </div>
          </header>
        </div>
        <CacheGrid />
      </main>
    </>
  );
}

export default App;
