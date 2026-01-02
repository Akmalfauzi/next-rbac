"use client"

import { useEffect, useState } from "react"
import { Calendar, FileText, Home, Inbox, Search, Settings, ChevronRight, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import Cookies from "js-cookie"
import { toast } from "sonner"
import api from "@/lib/axios"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarFooter,
} from "@/components/ui/sidebar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface MenuItem {
  id: number
  name: string
  url: string
  icon?: any
  children?: MenuItem[]
}

// Recursive helper to render menu items
const MenuRenderer = ({ item }: { item: MenuItem }) => {
  const hasChildren = item.children && item.children.length > 0;

  if (hasChildren) {
    return (
      <Collapsible className="group/collapsible">
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton>
              <FileText />
              <span>{item.name}</span>
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item.children!.map((child) => (
                <MenuRendererSub key={child.id} item={child} />
              ))}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild>
        <a href={item.url}>
          <FileText />
          <span>{item.name}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

// Helper for sub-items (inside SidebarMenuSub) to handle deep nesting recursively
const MenuRendererSub = ({ item }: { item: MenuItem }) => {
    const hasChildren = item.children && item.children.length > 0;

    if (hasChildren) {
        return (
            <Collapsible className="group/collapsible">
                <SidebarMenuSubItem>
                    <CollapsibleTrigger asChild>
                        <SidebarMenuSubButton>
                            <span>{item.name}</span>
                            <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuSubButton>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                         {/* Check if we need another level of SidebarMenuSub or just items. 
                             Shadcn typically uses nested SidebarMenuSub or just indentation. 
                             Let's nest another SidebarMenuSub for visual hierarchy if needed, 
                             but logically it might just be more Items. 
                             However, standard practice for deep tree:
                             SidebarMenuSub -> SidebarMenuSubItem (Group) -> Collapsible -> Content -> SidebarMenuSub (next level)
                         */}
                        <SidebarMenuSub>
                            {item.children!.map((child) => (
                                <MenuRendererSub key={child.id} item={child} />
                            ))}
                        </SidebarMenuSub>
                    </CollapsibleContent>
                </SidebarMenuSubItem>
            </Collapsible>
        )
    }

    return (
        <SidebarMenuSubItem>
            <SidebarMenuSubButton asChild>
                <a href={item.url}>
                    <span>{item.name}</span>
                </a>
            </SidebarMenuSubButton>
        </SidebarMenuSubItem>
    )
}

export function AppSidebar() {
  const router = useRouter()
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await api.get("/menus")
        // The API returns { menus: [...] }
        setMenuItems(response.data.data.menus || [])
      } catch (error) {
        console.error("Failed to fetch menus", error)
      } finally {
        setLoading(false)
      }
    }

    fetchMenus()
  }, [])

  const handleLogout = async () => {
      try {
          await api.post("/auth/logout")
      } catch (error) {
          console.error("Logout failed", error)
      } finally {
          // Always clean up locally
          Cookies.remove("token")
          Cookies.remove("role_selection_pending")
          localStorage.clear()
          toast.success("Logged out successfully")
          // Force a hard reload to clear Next.js client router cache and browser memory
          window.location.href = "/login"
      }
  }

  if (loading) {
    return (
        <Sidebar>
            <SidebarContent>
                <div className="p-4 text-sm text-muted-foreground">Loading menu...</div>
            </SidebarContent>
        </Sidebar>
    )
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <MenuRenderer key={item.id} item={item} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
          <SidebarMenu>
              <SidebarMenuItem>
                  <AlertDialog>
                      <AlertDialogTrigger asChild>
                          <SidebarMenuButton className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                              <LogOut />
                              <span>Logout</span>
                          </SidebarMenuButton>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                          <AlertDialogHeader>
                              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                              <AlertDialogDescription>
                                  You will be logged out of your session.
                              </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction onClick={handleLogout} className="bg-red-500 hover:bg-red-600">Logout</AlertDialogAction>
                          </AlertDialogFooter>
                      </AlertDialogContent>
                  </AlertDialog>
              </SidebarMenuItem>
          </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
