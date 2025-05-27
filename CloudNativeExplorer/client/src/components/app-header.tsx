import { useQuery } from "@tanstack/react-query";
import { Cloud, Server, Globe, Zap, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SystemInfo {
  environment: string;
  region?: string;
  cluster?: string;
  namespace?: string;
}

export function AppHeader() {
  const { data: systemInfo } = useQuery<SystemInfo>({
    queryKey: ["/api/system-info"],
  });

  const { data: healthData } = useQuery({
    queryKey: ["/health/ready"],
    refetchInterval: 30000, // Check every 30 seconds
  });

  const getEnvironmentColor = (env: string) => {
    switch (env) {
      case "production": return "bg-green-100 text-green-800";
      case "staging": return "bg-yellow-100 text-yellow-800";
      case "development": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <div className="relative">
                <Cloud className="h-8 w-8 text-white mr-3" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-xl font-bold text-white">My Cloud Native Todo App</span>
                <div className="text-xs text-blue-100">Daily Task Management</div>
              </div>
            </div>
            <div className="ml-8 flex items-center space-x-4">
              {/* Simple Status */}
              <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
                <div className="w-2 h-2 rounded-full mr-2 bg-green-400 animate-pulse" />
                <span className="text-xs text-white font-medium">ONLINE</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Simple Status */}
            <div className="bg-white/10 rounded-full px-3 py-1">
              <span className="text-xs text-white font-medium">Cloud Native</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
