import RandomMessage from './components/RandomMessage'
import MessageForm from './components/MessageForm'
import QRCode from './components/QRCode'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-8">
      <div className="bg-white shadow-xl rounded-lg p-6 max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-8 text-center">Welcome to PosiChain</h1>
        <RandomMessage />
        <MessageForm />
        <QRCode />
      </div>
    </main>
  )
}


