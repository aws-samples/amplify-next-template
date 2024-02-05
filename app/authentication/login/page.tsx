import type { ReactElement } from 'react'
import Login from '@/components/Login'
import { NextPageWithLayout } from '@/app/_app'
import AuthLayout from '../layout'
 
const Page: NextPageWithLayout = () => {
  return <Login/>
}
 
Page.getLayout = function getLayout(page: ReactElement) {
  return (
    <AuthLayout>
      {page}
    </AuthLayout>
  )
}
 
export default Page