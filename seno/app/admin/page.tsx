import { AdminCard, AdminPageContainer, AdminPageHeader } from '@/components/admin/admin-components'

export default function AdminRootPage() {
  return <AdminPageContainer><AdminPageHeader title="لوحة التحكم" description="مساحة الإدارة المركزية لسينو ستور. سيتم بناء محتوى لوحة التحكم في المرحلة التالية." breadcrumbs={[{ label: 'الرئيسية', href: '/admin' }, { label: 'لوحة التحكم' }]} /><AdminCard className="flex min-h-[280px] items-center justify-center p-8"><div className="max-w-md text-center"><div className="mx-auto grid size-16 place-items-center rounded-2xl border border-[#f5c542]/20 bg-[#f5c542]/10 text-2xl font-black text-[#f5c542]">S</div><h2 className="mt-5 text-xl font-bold text-white">مركز التحكم الإداري</h2><p className="mt-2 text-sm leading-7 text-white/45">الأساس جاهز لإضافة وحدات الإدارة القادمة دون التأثير على تجربة متجر العملاء.</p></div></AdminCard></AdminPageContainer>
}
