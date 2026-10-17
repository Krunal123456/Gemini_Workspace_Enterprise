import type { Metadata } from "next";
import { GoogleDesigner404 } from "@/components/errors/GoogleDesigner404";

export const metadata: Metadata = {
  title: "404 · Page Not Found | Google Workspace Intelligence",
  description: "The requested page could not be found. Explore Google Workspace and Gemini Enterprise models, features, and resources.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function RootNotFound() {
  return (
    <div className="min-h-screen bg-background pt-16 flex items-center justify-center">
      <GoogleDesigner404 />
    </div>
  );
}
