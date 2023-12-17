import PaymentInformation from '~/routes/_store.orders.$orderId/PaymentInformation'
import OrderPayNow from '~/routes/_store.orders.$orderId/OrderPayNow'
import Breadcrumb from '~/components/Breadcrumb'
import { Form } from '@remix-run/react'

export default function OrderDetails() {
  return (
    <Form className='grid grid-cols-1 gap-8 lg:grid-cols-2'>
      <Breadcrumb className='col-span-full col-start-2 2xl:col-start-1'>
        <Breadcrumb.Item link='/'>Home</Breadcrumb.Item>
        <Breadcrumb.Item link='..'>Nomad Tumbler</Breadcrumb.Item>
        <Breadcrumb.ItemCurrent>Order</Breadcrumb.ItemCurrent>
      </Breadcrumb>

      <PaymentInformation />
      <div className='space-y-6'>
        <h2 className='text-lg font-medium leading-7'>Order summary</h2>
        <OrderPayNow />
      </div>
    </Form>
  )
}
