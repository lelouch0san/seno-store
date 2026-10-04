'use client'

import { useMemo, useState } from 'react'
import { Eye, Plus, Save, Settings2, Sparkles, Image as ImageIcon, LayoutList } from 'lucide-react'
import { toast } from 'sonner'
import { AdminCard, AdminPageContainer, AdminPageHeader, AdminToolbar } from '@/components/admin/admin-components'
import { BannerCard, BannerEditForm, HomepageStatusOverview, SectionCard, SectionEditForm } from '@/components/admin/homepage/homepage-components'
import { getHomepageData, updateBanner, updateSection, type HomepageBanner, type HomepageSection } from '@/lib/data/homepage'

export default function AdminHomepagePage() {
  const initialData = useMemo(() => getHomepageData(), [])
  const [data, setData] = useState(initialData)
  const [tab, setTab] = useState<'sections' | 'banners' | 'featured' | 'promotions' | 'settings'>('sections')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingBanner, setEditingBanner] = useState<HomepageBanner | undefined>()
  const [editingSection, setEditingSection] = useState<HomepageSection | undefined>()
  const [previewOpen, setPreviewOpen] = useState(false)

  const filteredSections = data.sections.filter((section) => {
    const matchesSearch = section.nameAr.includes(search) || section.nameEn.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || section.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredBanners = data.banners.filter((banner) => {
    const matchesSearch = banner.nameAr.includes(search) || banner.nameEn.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || banner.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleBannerSave = (updates: Partial<HomepageBanner>) => {
    if (!editingBanner) return
    updateBanner(editingBanner.id, updates)
    setData({ ...getHomepageData(), banners: [...getHomepageData().banners] })
    toast.success('تم تحديث البنر بنجاح')
  }

  const handleSectionSave = (updates: Partial<HomepageSection>) => {
    if (!editingSection) return
    updateSection(editingSection.id, updates)
    setData({ ...getHomepageData(), sections: [...getHomepageData().sections] })
    toast.success('تم تحديث القسم بنجاح')
  }

  const handleSave = () => {
    toast.success('تم حفظ إعدادات الصفحة الرئيسية')
  }

  const tabs = [
    { id: 'sections' as const, label: 'الأقسام', icon: LayoutList, count: data.sections.length },
    { id: 'banners' as const, label: 'البنرات', icon: ImageIcon, count: data.banners.length },
    { id: 'featured' as const, label: 'العناصر المميزة', icon: Sparkles },
    { id: 'promotions' as const, label: 'العروض الترويجية', icon: ImageIcon },
    { id: 'settings' as const, label: 'إعدادات العرض', icon: Settings2 },
  ]

  return (
    <AdminPageContainer>
      <AdminPageHeader
        title="إدارة الصفحة الرئيسية"
        description="تحكم في محتوى وترتيب العناصر الظاهرة في الصفحة الرئيسية للمتجر"
        breadcrumbs={[{ label: 'الرئيسية', href: '/admin' }, { label: 'المتجر' }, { label: 'إدارة الرئيسية' }]}
        actions={
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setPreviewOpen(true)} className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-bold text-white/75 hover:bg-white/5 hover:text-white">
              <Eye className="size-4" />
              معاينة الصفحة
            </button>
            <button type="button" onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-[#f5c542] px-4 py-2.5 text-xs font-black text-[#090909] hover:bg-[#ffd55d]">
              <Save className="size-4" />
              حفظ المسودة
            </button>
          </div>
        }
      />

      <div className="flex flex-col gap-6">
        <HomepageStatusOverview sections={data.sections} banners={data.banners} />

        <AdminCard className="overflow-hidden">
          <div className="flex overflow-x-auto border-b border-white/[.08] px-2 sm:px-4" role="tablist" aria-label="إدارة الصفحة الرئيسية">
            {tabs.map((item) => {
              const Icon = item.icon
              return <button key={item.id} type="button" role="tab" aria-selected={tab === item.id} onClick={() => setTab(item.id)} className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-4 text-xs font-bold transition sm:px-4 ${tab === item.id ? 'border-[#f5c542] text-[#f5c542]' : 'border-transparent text-white/45 hover:text-white'}`}><Icon className="size-4" />{item.label}{item.count !== undefined && <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">{item.count}</span>}</button>
            })}
          </div>

          {tab === 'sections' && <div className="flex flex-col gap-4 p-4 sm:p-6"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div><h2 className="text-lg font-bold text-white">أقسام الصفحة الرئيسية</h2><p className="mt-1 text-xs text-white/40">رتب الأقسام وتحكم في ظهورها على واجهة المتجر</p></div><button type="button" onClick={() => setEditingSection({ id: '', nameAr: '', nameEn: '', type: 'category_grid', status: 'draft', visibility: true, sortOrder: data.sections.length + 1, dataSource: 'custom', layout: 'grid', createdAt: '', updatedAt: '' })} className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/15"><Plus className="size-4" />إضافة قسم</button></div><AdminToolbar><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="البحث في الأقسام..." className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white outline-none placeholder:text-white/35 focus:border-[#f5c542]" /><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white outline-none"><option value="all">كل الحالات</option><option value="active">نشط</option><option value="inactive">غير نشط</option><option value="scheduled">مجدول</option></select></AdminToolbar><div className="flex flex-col gap-3">{filteredSections.map((section) => <SectionCard key={section.id} section={section} onEdit={() => setEditingSection(section)} />)}</div></div>}

          {tab === 'banners' && <div className="flex flex-col gap-4 p-4 sm:p-6"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div><h2 className="text-lg font-bold text-white">إدارة البنرات</h2><p className="mt-1 text-xs text-white/40">تحكم في البنرات والعروض الظاهرة على الصفحة الرئيسية</p></div><button type="button" onClick={() => setEditingBanner({ id: '', nameAr: '', nameEn: '', image: '/images/home-banner-new.png', targetType: 'none', status: 'draft', sortOrder: data.banners.length + 1, visibility: true, altText: '', createdAt: '', updatedAt: '' })} className="flex items-center justify-center gap-2 rounded-xl bg-[#f5c542] px-4 py-2.5 text-xs font-black text-[#090909] hover:bg-[#ffd55d]"><Plus className="size-4" />إضافة بنر</button></div><AdminToolbar><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="البحث في البنرات..." className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white outline-none placeholder:text-white/35 focus:border-[#f5c542]" /><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white outline-none"><option value="all">كل الحالات</option><option value="active">نشط</option><option value="draft">مسودة</option><option value="scheduled">مجدول</option></select></AdminToolbar><div className="flex flex-col gap-3">{filteredBanners.map((banner) => <BannerCard key={banner.id} banner={banner} onEdit={() => setEditingBanner(banner)} onArchive={() => toast.success('تم أرشفة البنر')} />)}</div></div>}

          {tab === 'featured' && <PlaceholderTab title="العناصر المميزة" description="حدد الأقسام والمنتجات التي تظهر في مناطق التمييز على الصفحة الرئيسية." action="اختيار العناصر" />}
          {tab === 'promotions' && <PlaceholderTab title="العروض الترويجية" description="أدر مواضع العرض للحملات والعروض القادمة دون تعديل بيانات العروض نفسها." action="إضافة موضع ترويجي" />}
          {tab === 'settings' && <DisplaySettings config={data.config} onChange={(config) => setData({ ...data, config })} />}
        </AdminCard>
      </div>

      {editingBanner && <BannerEditForm banner={editingBanner.id ? editingBanner : undefined} onSave={handleBannerSave} onCancel={() => setEditingBanner(undefined)} />}
      {editingSection && <SectionEditForm section={editingSection.id ? editingSection : undefined} onSave={handleSectionSave} onCancel={() => setEditingSection(undefined)} />}
      {previewOpen && <HomepagePreview data={data} onClose={() => setPreviewOpen(false)} />}
    </AdminPageContainer>
  )
}

function PlaceholderTab({ title, description, action }: { title: string; description: string; action: string }) {
  return <div className="flex min-h-[320px] flex-col items-center justify-center p-6 text-center"><Sparkles className="size-8 text-[#f5c542]" /><h2 className="mt-4 text-lg font-bold text-white">{title}</h2><p className="mt-2 max-w-md text-sm leading-7 text-white/45">{description}</p><button type="button" onClick={() => toast.info('سيتم تفعيل هذه الوظيفة في المرحلة التالية.')} className="mt-5 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/15">{action}</button></div>
}

function DisplaySettings({ config, onChange }: { config: any; onChange: (config: any) => void }) {
  return <div className="p-4 sm:p-6"><div><h2 className="text-lg font-bold text-white">إعدادات العرض</h2><p className="mt-1 text-xs text-white/40">قواعد بسيطة للتحكم في طريقة عرض الصفحة الرئيسية</p></div><div className="mt-6 grid gap-4 md:grid-cols-2"><label className="rounded-2xl border border-white/10 bg-white/[.02] p-4"><span className="block text-xs font-bold text-white">الحد الأقصى للأقسام الظاهرة</span><input type="number" min="1" max="20" value={config.maxVisibleSections} onChange={(e) => onChange({ ...config, maxVisibleSections: Number(e.target.value) })} className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#f5c542]" /></label><label className="rounded-2xl border border-white/10 bg-white/[.02] p-4"><span className="block text-xs font-bold text-white">المسافة بين الأقسام</span><select value={config.defaultSpacing} onChange={(e) => onChange({ ...config, defaultSpacing: e.target.value })} className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#f5c542]"><option value="compact">مضغوطة</option><option value="normal">عادية</option><option value="spacious">واسعة</option></select></label><Toggle label="عرض المناطق الترويجية" checked={config.showPromotionalAreas} onChange={(checked) => onChange({ ...config, showPromotionalAreas: checked })} /><Toggle label="عرض المناطق المميزة" checked={config.showFeaturedAreas} onChange={(checked) => onChange({ ...config, showFeaturedAreas: checked })} /></div></div>
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.02] p-4"><span className="text-xs font-bold text-white">{label}</span><button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-[#f5c542]' : 'bg-white/15'}`}><span className={`absolute top-1 size-4 rounded-full bg-white transition ${checked ? 'right-1' : 'right-6'}`} /></button></label>
}

function HomepagePreview({ data, onClose }: { data: any; onClose: () => void }) {
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm" role="presentation" onClick={onClose}><div className="flex max-h-[95vh] w-full max-w-md flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#050506] shadow-2xl" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}><div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><div><p className="text-sm font-bold text-white">معاينة الصفحة الرئيسية</p><p className="text-[10px] text-white/40">عرض mobile-first بعرض 390px</p></div><button type="button" onClick={onClose} className="rounded-lg px-3 py-2 text-xs text-white/50 hover:bg-white/5">إغلاق</button></div><div className="overflow-y-auto p-4" dir="rtl"><div className="flex flex-col gap-4"><div className="relative aspect-[2/1] overflow-hidden rounded-2xl border border-red-500/50"><img src={data.banners[0]?.image || '/images/home-banner-new.png'} alt="معاينة البنر الرئيسي" className="size-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" /><div className="absolute bottom-3 right-3"><p className="text-sm font-black text-white">{data.banners[0]?.nameAr}</p><span className="mt-1 block text-[10px] text-white/70">{data.banners[0]?.subtitleAr}</span></div></div>{data.sections.filter((s: HomepageSection) => s.visibility && s.status === 'active').slice(0, data.config.maxVisibleSections).map((section: HomepageSection) => <div key={section.id} className="rounded-2xl border border-white/10 bg-[#0b0f12] p-3"><div className="flex items-center justify-between"><h3 className="text-sm font-bold text-white">{section.nameAr}</h3><span className="text-[10px] text-[#f5c542]">عرض الكل</span></div><div className="mt-3 grid grid-cols-3 gap-2">{[1, 2, 3].map((item) => <div key={item} className="aspect-square rounded-xl bg-gradient-to-br from-white/10 to-white/[.02]" />)}</div></div>)}</div></div></div></div>
}
