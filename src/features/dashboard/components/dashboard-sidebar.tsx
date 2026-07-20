"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { Skeleton } from "@/components/ui/skeleton";
import { OrganizationSwitcher, UserButton, useClerk } from "@clerk/nextjs";

import {
  type LucideIcon,
  Home,
  LayoutGrid,
  Volume2,
  Settings,
  Headphones,
} from "lucide-react";
import Link from "next/link";

interface MenuItem {
  title: string;
  url?: string;
  icon: LucideIcon;
  onlcick?: () => void;
}

interface NavSectionProps {
  lable?: string;
  items: MenuItem[];
  pathname: string;
}

function NavSection({ lable, items, pathname }: NavSectionProps) {
  return (
    <SidebarGroup>
      {lable && (
        <SidebarGroupLabel className='text-[13px] uppercase text-muted-foreground'>
          {lable}
        </SidebarGroupLabel>
      )}
      <SidebarContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className='h-9 px-3 text-[13px] tracking-tight font-medium border border-transparent data-[active=true]:border-border data-[active=true]:shadow-[0px_1px_1px_0px_rgba(44,54,53,0.03),inset_0px_0px_2px_white]'
                asChild={!!item.url}
                isActive={
                  item.url
                    ? item.url === "/"
                      ? pathname === "/"
                      : pathname.startsWith(item.url)
                    : false
                }
                onClick={item.onlcick}
                tooltip={item.title}
              >
                {item.url ? (
                  <Link href={item.url}>
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                ) : (
                  <>
                    <item.icon />
                    <span>{item.title}</span>
                  </>
                )}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </SidebarGroup>
  );
}

export function DashboardSidebar() {
  const pathName = usePathname();
  const clerk = useClerk();

  const mainMenuItems: MenuItem[] = [
    {
      title: "Dashborad",
      url: "/",
      icon: Home,
    },
    {
      title: "Explore voices",
      url: "/voices",
      icon: LayoutGrid,
    },
    {
      title: "Text to speech",
      icon: Volume2,
      url:'/text-to-speech'
    },
  ];

  const othersMenuItems: MenuItem[] = [
    {
      title: "settings",
      icon: Settings,
      onlcick: () => clerk.openOrganizationProfile(),
    },
    {
      title: "Help and support",
      url: "mailto:techydanesh@gmail.com",
      icon: Headphones,
    },
  ];

  return (
    <Sidebar collapsible='icon'>
      <SidebarHeader className='flex flex-col gap-4 pt-4'>
        <div className='flex items-center gap-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:pl-0'>
          <Image src={"/logo.svg"} alt='roons image' width={24} height={24} />
          <span className='group-data-[collapsible=icon]:hidden font-semibold text-lg tracking-tighter text-foreground'>
            Roons
          </span>
          <SidebarTrigger className='ml-auto lg:hidden' />
        </div>
        <SidebarMenu>
          <SidebarMenuItem>
            <OrganizationSwitcher
              hidePersonal
              appearance={{
                elements: {
                  rootBox:
                    "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:flex! group-data-[collapsible=icon]:justify-center! ",
                  organizationSwitcherTrigger:
                    "w-full! justify-between! bg-white! border! border-border! rounded-md! pl-2! pr-2! py-1! gap-3! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! shadow-[0px_1px_1px_0px_rgba(44,54,53,0.03),inset_0px_0px_2px_white]!",
                  organizationPreview: "gap-2!",
                  organizationPreviewAvatarBox: "size-6! rounded-sm!",
                  organizationPreviewTextContainer:
                    "text-xs! tracking-tight! font-medium! text-foreground! group-data-[collapsible=icon]:hidden!",
                  organizationPreviewMainIdentifier: "text-[13ox]!",
                  organizationSwitcherTriggerIcon:
                    "size-4! text-sidebar-foreground! group-data-[collapsible=icon]:hidden!",
                },
              }}
              fallback={
                <Skeleton
                  className='
                            h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border bg-gray-200
                '
                />
              }
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <div className='border-b border-dashed border-border' />
      <SidebarContent>
        <NavSection items={mainMenuItems} pathname={pathName} />
        <NavSection
          lable='others'
          items={othersMenuItems}
          pathname={pathName}
        />
      </SidebarContent>
      <div className='border-b border-dashed' />
      <SidebarFooter className='gap-3 py-3'>
        <SidebarMenu>
          <SidebarMenuItem>
            <UserButton
              showName
              fallback={
                <Skeleton className='h-8.5 w-full group-data-[collapsible=icon]:size-8 rounded-md border border-border bg-white' />
              }
              appearance={{
                elements: {
                  rootBox:
                    "w-full! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:w-flex! group-data-[collapsible=icon]:justify-center!",
                  userButtonTrigger:
                    "w-full! justify-between! bg-white! border! border-border! rounded-md! shadow-[0px_1px_1px_0px_rgba(44,54,53,0.03) pl-1! pr-2! py-1! group-data-[collapsible=icon]:w-auto! group-data-[collapsible=icon]:p-1! group-data-[collapsible=icon]:after:hidden! [--border:color-mix(in_srgb,transparent,var(--clerk-color-neutral, #000000)_15%)]!",
                  userButtonBox: "flex-row-reverse! gap-2!",
                  userButtonOuterIdentifier:
                    "text-[13px]! tracking-tight! font-medium! text-foreground! pl-0! group-data-[collapsible=icon]:hidden!",
                  userButtonAvatarBox: "size-6",
                },
              }}
            />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
