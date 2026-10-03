import { GlobalSidebar, SidebarProvider } from '@/components/global-sidebar'
export default function StoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider>
      <div className="min-h-screen lg:mr-72">
        <GlobalSidebar />
        <div>{children}</div>
      </div>
    </SidebarProvider>
  )
}
