import Sidebar from "@/components/layout/sidebar";
import Header from "@/components/layout/header";
import TimetableGrid from "@/components/timetable/timetable-grid";

export default function Timetable() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title="Timetable Management"
          subtitle="Manage class schedules and resolve conflicts"
          showNewButton={false}
        />

        <main className="flex-1 overflow-y-auto p-6">
          <TimetableGrid />
        </main>
      </div>
    </div>
  );
}
