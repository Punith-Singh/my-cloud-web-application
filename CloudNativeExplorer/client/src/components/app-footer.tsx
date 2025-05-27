import { Cloud, Globe, Shield, Zap } from "lucide-react";

export function AppFooter() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-blue-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center mb-4">
              <Cloud className="h-8 w-8 text-blue-400 mr-3" />
              <span className="text-2xl font-bold">My Cloud Native Todo App</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Simple and efficient daily task management application built with modern 
              cloud-native technologies for reliable performance.
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-blue-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                Simple & Reliable
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Features</h4>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-300">
                <Globe className="h-4 w-4 mr-2 text-blue-400" />
                Easy to Use
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Shield className="h-4 w-4 mr-2 text-green-400" />
                Secure & Private
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Zap className="h-4 w-4 mr-2 text-yellow-400" />
                Fast & Responsive
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-white tracking-wider uppercase mb-4">Quick Links</h4>
            <div className="space-y-2">
              <a href="#" className="text-sm text-gray-300 hover:text-blue-400 block transition-colors">
                About
              </a>
              <a href="#" className="text-sm text-gray-300 hover:text-blue-400 block transition-colors">
                Help & Support
              </a>
              <a href="#" className="text-sm text-gray-300 hover:text-blue-400 block transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-300 hover:text-blue-400 block transition-colors">
                Contact Us
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2024 My Cloud Native Todo App. Built with modern technologies.
            </p>
            <div className="flex items-center space-x-6 text-xs text-gray-400">
              <span className="flex items-center">
                <div className="w-1 h-1 bg-green-400 rounded-full mr-2"></div>
                Cloud Native
              </span>
              <span className="flex items-center">
                <div className="w-1 h-1 bg-blue-400 rounded-full mr-2"></div>
                Simple & Fast
              </span>
              <span className="flex items-center">
                <div className="w-1 h-1 bg-purple-400 rounded-full mr-2"></div>
                Always Available
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
