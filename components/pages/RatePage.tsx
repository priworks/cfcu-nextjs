import { clsx } from 'clsx'
import { RatePageType } from '@/types/sanity'
import ModuleFactory from '@/components/global/modules/RatesPageModuleFactory'
import SubPageHero from '../global/modules/subPageHero'

const RatePage = ({ data }: { data: RatePageType }) => {
  return (
    <div>
      <SubPageHero data={data?.hero} />
      <ModuleFactory modules={data?.modules || []} />
    </div>
  )
}

export default RatePage
