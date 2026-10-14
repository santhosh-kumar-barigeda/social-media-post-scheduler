import { CalendarClock, CalendarDays, PenSquare } from 'lucide-react';
import { Link, Outlet, useLocation } from 'react-router';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';
import { MENU_BUTTON_CLASS, CREATE_PATH, LIST_PATH } from './app-layout.constants';

export function AppLayout() {
  const { pathname } = useLocation();

  // Create highlights only on the create route; list and edit highlight Scheduled Posts.
  const isCreateActive = pathname.startsWith(CREATE_PATH);
  const isScheduledActive = pathname.startsWith(LIST_PATH) && !isCreateActive;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="flex-row items-center gap-3 px-4 py-5">
          <span className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
            <CalendarClock className="size-5" />
          </span>
          <span className="text-xl font-bold text-sidebar-foreground">Flintzy</span>
        </SidebarHeader>
        <SidebarContent className="px-2">
          <SidebarMenu className="gap-1">
            <SidebarMenuItem>
              <SidebarMenuButton
                className={MENU_BUTTON_CLASS}
                isActive={isCreateActive}
                render={<Link to={CREATE_PATH} />}
              >
                <PenSquare />
                <span>Create Post</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                className={MENU_BUTTON_CLASS}
                isActive={isScheduledActive}
                render={<Link to={LIST_PATH} />}
              >
                <CalendarDays />
                <span>Scheduled Posts</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-14 items-center border-b px-4 md:hidden">
          <SidebarTrigger />
        </header>
        <main className="mx-auto w-full max-w-[1600px] flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
