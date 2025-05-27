import { useQuery } from "@tanstack/react-query";
import { Check } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SystemInfo {
  environment: string;
  version: string;
  replicas: string;
  lastDeploy: string;
  memory: {
    used: number;
    total: number;
  };
}

export function SystemInfo() {
  const { data: systemInfo, isLoading } = useQuery<SystemInfo>({
    queryKey: ["/api/system-info"],
  });

  const { data: readinessData } = useQuery({
    queryKey: ["/health/ready"],
    refetchInterval: 30000,
  });

  const { data: livenessData } = useQuery({
    queryKey: ["/health/live"],
    refetchInterval: 30000,
  });

  const formatRelativeTime = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    } else if (diffInHours > 0) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return "Just now";
    }
  };

  if (isLoading) {
    return (
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[...Array(2)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div className="animate-pulse space-y-4">
                <div className="h-6 bg-gray-200 rounded w-1/3"></div>
                <div className="space-y-3">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Deployment Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-on-surface">Deployment Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Environment:</span>
            <span className="text-sm font-medium text-on-surface">{systemInfo?.environment}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Version:</span>
            <span className="text-sm font-medium text-on-surface">{systemInfo?.version}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Replicas:</span>
            <span className="text-sm font-medium text-on-surface">{systemInfo?.replicas}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Last Deploy:</span>
            <span className="text-sm font-medium text-on-surface">
              {systemInfo?.lastDeploy ? formatRelativeTime(systemInfo.lastDeploy) : "Unknown"}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Health Checks */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-on-surface">Health Endpoints</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">/health/ready</span>
            <Badge className={`${
              readinessData?.status === "ready" 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              <Check className="h-3 w-3 mr-1" />
              {readinessData?.status === "ready" ? "Ready" : "Not Ready"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">/health/live</span>
            <Badge className={`${
              livenessData?.status === "live" 
                ? "bg-green-100 text-green-800" 
                : "bg-red-100 text-red-800"
            }`}>
              <Check className="h-3 w-3 mr-1" />
              {livenessData?.status === "live" ? "Live" : "Not Live"}
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Database</span>
            <Badge className="bg-green-100 text-green-800">
              <Check className="h-3 w-3 mr-1" />
              PostgreSQL
            </Badge>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Memory Usage</span>
            <span className="text-sm font-medium text-on-surface">
              {systemInfo?.memory ? `${systemInfo.memory.used}MB / ${systemInfo.memory.total}MB` : "Unknown"}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
