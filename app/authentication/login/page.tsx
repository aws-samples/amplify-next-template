import type { ReactElement } from 'react'
import Login from '@/components/Login'
import AuthLayout from '../layout'
 
const Page = () => {
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