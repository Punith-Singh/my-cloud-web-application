import { useQuery } from "@tanstack/react-query";
import { CheckCircle, Clock, LayoutList } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface TodoStats {
  total: number;
  completed: number;
  active: number;
}

export function StatsCards() {
  const { data: stats, isLoading } = useQuery<TodoStats>({
    queryKey: ["/api/todos/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-6">
            <CardContent className="p-0">
              <div className="animate-pulse">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="p-6">
        <CardContent className="p-0">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <LayoutList className="h-6 w-6 text-primary-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Tasks</p>
              <p className="text-2xl font-semibold text-on-surface">{stats?.total || 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="p-6">
        <CardContent className="p-0">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-6 w-6 text-green-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed</p>
              <p className="text-2xl font-semibold text-on-surface">{stats?.completed || 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card className="p-6">
        <CardContent className="p-0">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-6 w-6 text-orange-500" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-semibold text-on-surface">{stats?.active || 0}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
