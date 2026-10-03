import { GlobalSidebar } from '@/components/global-sidebar'
import { BottomNavigation } from '@/components/site-navigation'

export default function StoreLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen lg:mr-72">
      <GlobalSidebar />
      <div className="pb-20 lg:pb-28">{children}</div>
      <BottomNavigation />
    </div>
  )
}
