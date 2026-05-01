import './globals.css'

export const metadata = {
  title: 'Weather app',
  description: 'Made with 💖 by ItalicDev',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-gradient-to-br from-sky-300 via-stone-400 to-red-600 p-4 '>{children}</body>
    </html>
  )
}
