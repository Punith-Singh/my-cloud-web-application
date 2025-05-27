import { AppHeader } from "@/components/app-header";
import { StatsCards } from "@/components/stats-cards";
import { CloudMetrics } from "@/components/cloud-metrics";
import { TodoManager } from "@/components/todo-manager";
import { SystemInfo } from "@/components/system-info";
import { AppFooter } from "@/components/app-footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <AppHeader />
      
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Daily Tasks</h1>
          <p className="text-gray-600">Keep track of your day-to-day work and activities</p>
        </div>
        
        <StatsCards />
        <TodoManager />
      </main>
      
      <AppFooter />
    </div>
  );
}
