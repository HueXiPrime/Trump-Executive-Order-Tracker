import { Heart } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-6 bg-black border-t border-gray-800">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-2">
        <p className="text-center text-sm text-gray-400">
          Made with{" "}
          <Heart className="inline-block w-4 h-4 text-red-500 mx-1 animate-pulse" />{" "}
          in LA by{" "}
          <Link
            href="https://x.com/huexi_"
            className="text-blue-400 hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Hue
          </Link>
          , with data from{" "}
          <Link
            href="https://x.com/BenShindel"
            className="text-blue-400 hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ben
          </Link>
        </p>
        <p className="text-center text-sm text-gray-400">
          Inspired by{" "}
          <Link
            href="https://x.com/eigenrobot/status/1882143122945401306"
            className="text-blue-400 hover:text-blue-300"
            target="_blank"
            rel="noopener noreferrer"
          >
            Eigen&apos;s tweet
          </Link>
        </p>
      </div>
    </footer>
  );
}
