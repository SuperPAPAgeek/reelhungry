import VideoFeed from "@/components/VideoFeed";
import menuData from "@/data/menu.json";

export default function Home() {
  return (
    <main className="bg-black min-h-dvh flex justify-center">
      <VideoFeed dishes={menuData} />
    </main>
  );
}
