import { Link } from '@/components';
import { FaGithub } from "react-icons/fa";
import { GITHUB_LINK } from '@/core/constants';

export const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full">
      <nav className="gap-4 p-4 bg-zinc-800">
        <div className="text-10 text-white-900 flex justify-center items-center">
          <div className="mr-3">
            <FaGithub />
          </div>
          <div>
            <a 
            className="hover:text-zinc-400 transition-colors duration-167"
            href={GITHUB_LINK} 
            target="_blank" 
            rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </nav>
    </footer>
  );
};