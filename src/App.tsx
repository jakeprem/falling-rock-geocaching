import { Outlet } from "react-router-dom";

import { NavBar } from "./components/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <main className="container mx-auto">
        <div className="py-10">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
                Camp Falling Rock - Geocaching
              </h1>
            </div>
          </header>
        </div>
        <Outlet />
      </main>
    </>
  );
}

export default App;
