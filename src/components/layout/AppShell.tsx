import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Box, LogOut, User } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getNavItems } from "./nav-items";
import { useCurrentUser, useLogout } from "@/features/auth/queries";

function Brand() {
  return (
    <div className="flex items-center gap-2.5 px-2">
      <span className="flex size-9 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
        <Box className="size-5" aria-hidden="true" />
      </span>
      <span className="font-display text-base font-semibold tracking-tight text-sidebar-foreground">
        BlackCube
      </span>
    </div>
  );
}

function NavList({ onNavigate, items }: { onNavigate?: () => void; items: any[] }) {
  return (
    <nav aria-label="Main" className="flex flex-col gap-1 px-2">
      {items.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          activeOptions={{ exact: item.to === "/" }}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sidebar-ring"
          activeProps={{
            className:
              "bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
            "aria-current": "page",
          }}
        >
          <item.icon className="size-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{item.label}</span>
        </Link>
      ))}
    </nav>
  );
}

interface AppShellProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function AppShell({ title, description, actions, children }: AppShellProps) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { data: user } = useCurrentUser();
  const logoutMutation = useLogout();

  return (
    <div className="flex min-h-screen w-full bg-background">
      <aside className="sticky top-0 hidden h-screen w-60 shrink-0 flex-col gap-6 border-r border-sidebar-border bg-sidebar py-5 lg:flex">
        <Brand />
        <NavList items={getNavItems(user?.role)} />

        {user && (
          <div className="mt-auto border-t border-border p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-sidebar-accent focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-sidebar-ring">
                  <div className="flex size-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="size-4" />
                  </div>
                  <div className="flex flex-1 flex-col items-start overflow-hidden text-left">
                    <span className="truncate text-sm font-medium text-sidebar-foreground">
                      {user.name}
                    </span>
                    <span className="truncate text-xs text-sidebar-foreground/70">{user.role}</span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onClick={() =>
                    logoutMutation.mutate(undefined, {
                      onSuccess: () => navigate({ to: "/sign-in" }),
                    })
                  }
                >
                  <LogOut className="mr-2 size-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {!user && (
          <div className="mt-auto px-4 text-xs text-sidebar-foreground/50">Admin Panel v1.0</div>
        )}
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 border-b border-border bg-background/85 backdrop-blur">
          <div className="flex items-start gap-3 px-4 py-4 sm:px-6">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="lg:hidden"
                  aria-label="Open navigation menu"
                >
                  <Menu className="size-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 border-sidebar-border bg-sidebar p-0 pt-5">
                <SheetHeader className="p-0">
                  <SheetTitle className="sr-only">Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-6 h-full">
                  <Brand />
                  <NavList onNavigate={() => setOpen(false)} items={getNavItems(user?.role)} />

                  {user && (
                    <div className="mt-auto border-t border-sidebar-border p-4">
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                        onClick={() =>
                          logoutMutation.mutate(undefined, {
                            onSuccess: () => navigate({ to: "/sign-in" }),
                          })
                        }
                      >
                        <LogOut className="mr-2 size-4" />
                        Log out
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            <div className="min-w-0 flex-1">
              <h1 className="truncate text-xl font-semibold sm:text-2xl">{title}</h1>
              {description ? (
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{description}</p>
              ) : null}
            </div>
            {actions ? <div className="flex shrink-0 items-center gap-2">{actions}</div> : null}
          </div>
        </header>

        <main className="min-w-0 flex-1 px-4 py-6 sm:px-6">{children}</main>
      </div>
    </div>
  );
}
