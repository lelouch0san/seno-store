import { GlobalSidebar, SidebarProvider } from '@/components/global-sidebar'
export default function StoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <div className="min-h-screen min-w-0 overflow-x-clip lg:mr-72">
        <GlobalSidebar />
        <main className="min-w-0">{children}</main>
      </div>
    </SidebarProvider>
  )
}
