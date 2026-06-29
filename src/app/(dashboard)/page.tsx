import { SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardPage() {
  return (
    <div className='flex flex-1 items-center justify-center'>
      <h1 className='text-2xl font-semibold'>
        <SidebarTrigger />
        Dashboard
      </h1>
    </div>
  );
}
