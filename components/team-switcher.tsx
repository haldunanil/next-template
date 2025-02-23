"use client";

import { ChevronsUpDown, Plus } from "lucide-react";
import { useClerk, useOrganization, useOrganizationList } from "@clerk/nextjs";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TeamSwitcher() {
  const { isMobile } = useSidebar();

  // Clerk hooks
  const { user } = useClerk();
  const {
    isLoaded,
    userMemberships: { data: organizations },
    setActive,
  } = useOrganizationList({
    userMemberships: true,
  });
  const { organization } = useOrganization();

  if (!isLoaded || !user?.id) {
    return null;
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {organization ? (
                <>
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    {/* <activeTeam.logo className="size-4" /> */}
                    <Avatar className="h-8 w-8 rounded-lg">
                      <AvatarImage
                        src={organization.imageUrl}
                        alt={organization.name}
                      />
                      <AvatarFallback className="rounded-lg">
                        ORG
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {organization.name}
                    </span>
                    <span className="truncate text-xs">Enterprise</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    {user.firstName?.[0]}
                    {user.lastName?.[0]}
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">
                      {user.fullName}
                    </span>
                    <span className="truncate text-xs">Personal account</span>
                  </div>
                </>
              )}
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            {organizations?.length ? (
              <>
                <DropdownMenuLabel className="text-muted-foreground text-xs">
                  Teams
                </DropdownMenuLabel>
                {organizations.map(({ id, organization }, index) => (
                  <DropdownMenuItem
                    key={id}
                    onClick={() => setActive({ organization: organization.id })}
                    className="gap-2 p-2"
                  >
                    <div className="flex size-6 items-center justify-center rounded-xs border">
                      <Avatar className="h-8 w-8 rounded-lg">
                        <AvatarImage
                          src={organization.imageUrl}
                          alt={organization.name}
                        />
                        <AvatarFallback className="rounded-lg">
                          OA
                        </AvatarFallback>
                      </Avatar>
                    </div>
                    {organization.name}
                    <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
              </>
            ) : null}

            <DropdownMenuItem className="gap-2 p-2">
              <div className="bg-background flex size-6 items-center justify-center rounded-md border">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
