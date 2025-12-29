import React from "react";
import {
  Search,
  Bell,
  ChevronDown,
  Flame,
  Sword,
  Heart,
  Ghost,
  Star,
  Moon,
  Play,
  Filter,
  LayoutGrid,
} from "lucide-react";
import { videoApi, userApi, categoryApi } from "@/lib/api";
import { Video, User } from "@/types/video";

const Dashboard = async () => {
  // Initialize with loading state
  let user: User = {
    id: "guest",
    email: "guest@example.com",
    name: "Guest",
    subscriptions: [] as string[],
    purchasedVideos: [],
  };
  let trending: Video[] = [];
  let categories: { id: string; name: string; slug: string }[] = [];
  let loadingError = null;

  try {
    const [profileRes, trendingRes, categoriesRes] = await Promise.all([
      userApi.getProfile(),
      videoApi.getTrending(1, 12),
      categoryApi.getAll(),
    ]);

    // Check for API errors
    if (!profileRes.success) {
      throw new Error(profileRes.error || "Failed to load user profile");
    }
    if (!trendingRes.success) {
      throw new Error(trendingRes.error || "Failed to load trending videos");
    }
    if (!categoriesRes.success) {
      throw new Error(categoriesRes.error || "Failed to load categories");
    }

    user = profileRes.data?.user ?? {
      id: "guest",
      email: "guest@example.com",
      name: "Guest",
      subscriptions: [] as string[],
      purchasedVideos: [],
    };
    trending = trendingRes.data?.videos ?? [];
    categories = categoriesRes.data?.categories ?? [];
  } catch (error) {
    loadingError =
      error instanceof Error ? error.message : "An unexpected error occurred";
    console.error("Dashboard loading error:", error);
  }

  return (
    <div className="min-h-screen bg-[#1a1c1e] text-white p-4 lg:p-8 font-sans selection:bg-blue-500/30">
      {/* Background Glows for Depth */}
      <div className="fixed top-0 right-0 w-125 h-125 bg-blue-500/10 blur-[120px] -z-10" />
      <div className="fixed bottom-0 left-0 w-125 h-125 bg-purple-500/5 blur-[120px] -z-10" />

      {/* Error Display */}
      {loadingError && (
        <div className="p-4 mx-auto mb-6 border rounded-lg max-w-7xl bg-red-500/20 border-red-500/50">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="font-medium text-red-400">Error loading dashboard: {loadingError}</span>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto bg-white/5 backdrop-blur-2xl rounded-[40px] border border-white/10 p-6 lg:p-10 shadow-2xl">
        {/* Navbar */}
        <nav className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <img
              src="/Tese-Light-Logo.png"
              alt="TESE Logo"
              className="w-20 h-10"
            />
          </div>

          <div className="items-center hidden px-2 py-1 border rounded-full md:flex bg-black/40 backdrop-blur-md border-white/10">
            {["Movie", "Series", "Originals"].map((item, idx) => (
              <button
                key={item}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  idx === 0 ? "bg-white/10" : "hover:bg-white/5"
                }`}
              >
                {item}
              </button>
            ))}
            <button className="p-2 ml-2 transition-colors rounded-full hover:bg-white/10">
              <Search size={18} />
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative p-2 border rounded-full cursor-pointer bg-white/5 border-white/10">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#1a1c1e]"></span>
            </div>
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 py-1.5 pl-1.5 pr-4 rounded-full cursor-pointer hover:bg-white/10 transition-colors">
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
                  user.name || "guest"
                )}`}
                alt="Profile"
                className="w-8 h-8 bg-blue-400 rounded-full"
              />
              <div className="hidden text-left sm:block">
                <p className="text-xs font-bold leading-tight">{user.name}</p>
                <p className="text-[10px] text-gray-400">
                  {user.subscriptions && user.subscriptions.length > 0
                    ? "Premium"
                    : "Free"}
                </p>
              </div>
              <ChevronDown size={14} className="text-gray-400" />
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="grid gap-6 mb-10 md:grid-cols-2">
          {/* Hero Card 1 */}
          <div className="relative overflow-hidden border h-70 rounded-4xl group border-white/10">
            <img
              src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1000&auto=format&fit=crop"
              alt="Blue Sword"
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col justify-center p-8 bg-linear-to-r from-blue-900/90 to-transparent">
              <h2 className="mb-6 text-3xl font-bold leading-tight max-w-50">
                The Adventure of Blue Sword
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 text-sm transition-all border rounded-full w-fit bg-black/30 backdrop-blur-md border-white/20 hover:bg-white/20">
                <div className="p-1 bg-white rounded-full">
                  <Play size={12} fill="black" className="text-black" />
                </div>
                Let Play Movie
              </button>
            </div>
          </div>

          {/* Hero Card 2 */}
          <div className="relative overflow-hidden border h-70 rounded-4xl group border-white/10">
            <img
              src="https://images.unsplash.com/photo-1616467333474-c71fa79e8e20?q=80&w=1000&auto=format&fit=crop"
              alt="Dol Story"
              className="absolute inset-0 object-cover w-full h-full"
            />
            <div className="absolute inset-0 flex flex-col justify-center p-8 bg-linear-to-r from-indigo-900/80 to-transparent">
              <h2 className="text-3xl font-bold max-w-62.5 mb-6 leading-tight">
                Recalling the journey of Dol's exciting story
              </h2>
              <button className="flex items-center gap-2 px-4 py-2 text-sm transition-all border rounded-full w-fit bg-black/30 backdrop-blur-md border-white/20 hover:bg-white/20">
                <div className="p-1 bg-white rounded-full">
                  <Play size={12} fill="black" className="text-black" />
                </div>
                Let Play Movie
              </button>
            </div>
          </div>
        </section>

        {/* Category Pills */}
        <div className="flex items-center gap-3 pb-2 mb-10 overflow-x-auto no-scrollbar">
          {(categories.length > 0
            ? categories.map((c) => ({
                name: c.name,
                slug: c.slug,
                icon: null,
              }))
            : [
                { name: "Trending", icon: <Flame size={16} /> },
                { name: "Action", icon: <Sword size={16} /> },
                { name: "Romance", icon: <Heart size={16} /> },
                { name: "Animation", icon: <LayoutGrid size={16} /> },
                { name: "Horror", icon: <Ghost size={16} /> },
                { name: "Special", icon: <Star size={16} /> },
                { name: "Drakor", icon: <Moon size={16} /> },
              ]
          ).map((cat, index) => (
            <button
              key={cat.name}
              className={`flex items-center gap-2 px-6 py-3 rounded-2xl whitespace-nowrap border transition-all ${
                index === 3
                  ? "bg-white/20 border-white/30 text-white"
                  : "bg-white/5 border-white/5 text-gray-400 hover:bg-white/10"
              }`}
            >
              {cat.icon}
              <span className="text-sm font-medium">{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Movie Grid Header */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-semibold">Trending in Animation</h3>
          <div className="flex gap-2">
            <button className="p-2 border rounded-lg bg-black/40 border-white/10">
              <Filter size={18} />
            </button>
            <button className="p-2 border rounded-lg bg-black/40 border-white/10">
              <LayoutGrid size={18} />
            </button>
          </div>
        </div>

        {/* Movie Grid */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {trending.length === 0 ? (
            <div className="py-12 text-center col-span-full">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-600 rounded-full animate-pulse"></div>
              <p className="text-gray-400">Loading trending videos...</p>
            </div>
          ) : (
            trending.map((movie) => (
              <div key={movie.id} className="cursor-pointer group">
                <div className="relative mb-3 overflow-hidden border shadow-lg aspect-3/4 rounded-3xl border-white/10">
                  <img
                    src={movie.thumbnail || movie.img || ""}
                    alt={movie.title}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h4 className="px-1 text-sm font-medium truncate">
                  {movie.title}
                </h4>
                <div className="flex items-center gap-2 px-1 mt-1">
                  <span className="text-orange-400 text-[10px] flex items-center gap-1">
                    ⭐ {movie.rating ?? "--"}
                  </span>
                  <span className="text-gray-500 text-[10px]">
                    • {new Date(movie.uploadDate).getFullYear()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

