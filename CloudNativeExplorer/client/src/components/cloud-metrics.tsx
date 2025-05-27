import { useQuery } from "@tanstack/react-query";
import { Activity, Database, Globe, Cpu, HardDrive, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface SystemInfo {
  environment: string;
  region: string;
  cluster: string;
  platform: string;
  cloudProvider: string;
  memory: {
    used: number;
    total: number;
  };
  features: string[];
}

export function CloudMetrics() {
  const { data: systemInfo, isLoading } = useQuery<SystemInfo>({
    queryKey: ["/api/system-info"],
    refetchInterval: 30000,
  });

  const { data: healthData } = useQuery({
    queryKey: ["/health/live"],
    refetchInterval: 15000,
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const memoryUsagePercent = systemInfo?.memory 
    ? (systemInfo.memory.used / systemInfo.memory.total) * 100 
    : 0;

  const uptime = healthData?.uptime ? Math.floor(healthData.uptime / 3600) : 0;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-on-surface">Cloud Infrastructure</h2>
        <Badge className="bg-blue-100 text-blue-800">
          <Globe className="h-3 w-3 mr-1" />
          {systemInfo?.cloudProvider || "Cloud Provider"}
        </Badge>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Resource Usage */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Cpu className="h-4 w-4 mr-2" />
              Resource Usage
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Memory</span>
                  <span>{systemInfo?.memory?.used}MB / {systemInfo?.memory?.total}MB</span>
                </div>
                <Progress value={memoryUsagePercent} className="h-2" />
              </div>
              <div className="text-xs text-gray-500">
                Uptime: {uptime}h
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Deployment Info */}
        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <HardDrive className="h-4 w-4 mr-2" />
              Deployment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Region:</span>
                <span className="font-medium">{systemInfo?.region}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Cluster:</span>
                <span className="font-medium">{systemInfo?.cluster}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Platform:</span>
                <span className="font-medium">{systemInfo?.platform}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Cloud Features */}
        <Card className="border-l-4 border-l-purple-500">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600 flex items-center">
              <Zap className="h-4 w-4 mr-2" />
              Cloud Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {systemInfo?.features?.slice(0, 3).map((feature, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span>{feature}</span>
                </div>
              ))}
              {systemInfo?.features && systemInfo.features.length > 3 && (
                <div className="text-xs text-gray-500">
                  +{systemInfo.features.length - 3} more features
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}