import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components'

export default function OrderReceiptEmail() {
  return (
    <Html lang='en'>
      <Head>
        <title>Order Receipt</title>
      </Head>
      <Preview>Thank you for your purchase</Preview>
      <Body style={main}>
        <Container style={container}>
          <Text>Hello Khanh,</Text>
          <Text>Thank your for your payment</Text>
          <Heading></Heading>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
}

const container = {
  margin: '0 auto',
  paddingLeft: '12px',
  paddingRight: '12px',
}
