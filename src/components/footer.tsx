'use client'

import { MdEmail } from 'react-icons/md'
import { FaGithub, FaLinkedin, FaUser, FaXTwitter, FaYoutube } from 'react-icons/fa6'

export default function Footer() {
  return (
    <footer className="bg-[#1a1b1e] border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Copyright */}
          <p className="text-sm text-gray-400">
            <span className="text-[#0ea5e9]">&lt;</span>
            © {new Date().getFullYear()} DevToolsLab
            <span className="text-[#0ea5e9]">/&gt;</span>
          </p>

          {/* Made with love */}
          <p className="text-sm text-gray-500">
            Made with <span className="text-red-500">♥</span> by <a href="https://ashwinkulkarni.space" className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer">Ashwin</a>
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            <a
              href="https://ashwinkulkarni.space"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#0ea5e9] transition-colors"
              aria-label="Website"
            >
              <FaUser className="w-4 h-4" />
            </a>
            <a
              href="mailto:ashwin.kulkarni128@gmail.com"
              className="text-gray-400 hover:text-[#0ea5e9] transition-colors"
              aria-label="Email"
            >
              <MdEmail className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/AshwinKul28"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#0ea5e9] transition-colors"
              aria-label="GitHub"
            >
              <FaGithub className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/iashwin28"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#0ea5e9] transition-colors"
              aria-label="LinkedIn"
            >
              <FaLinkedin className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/AshwinKUlkarni4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#0ea5e9] transition-colors"
              aria-label="Twitter"
            >
              <FaXTwitter className="w-5 h-5" />
            </a>
            <a
              href="https://www.youtube.com/@ashwin.kulkarni"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#0ea5e9] transition-colors"
              aria-label="YouTube"
            >
              <FaYoutube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 