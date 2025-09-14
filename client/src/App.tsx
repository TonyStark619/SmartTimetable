import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Timetable from "@/pages/timetable";
import Classes from "@/pages/classes";
import Teachers from "@/pages/teachers";
import Students from "@/pages/students";
import Rooms from "@/pages/rooms";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/timetable" component={Timetable} />
      <Route path="/classes" component={Classes} />
      <Route path="/teachers" component={Teachers} />
      <Route path="/students" component={Students} />
      <Route path="/rooms" component={Rooms} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
