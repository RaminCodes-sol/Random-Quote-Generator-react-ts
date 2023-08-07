import { useEffect, useRef, useState } from 'react'


type QuoteType = {
  author: string;
  text: string;
}

const App = () => {
  const [quote, setQuote] = useState<QuoteType>({} as QuoteType)
  const [loading, setLoading] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  const colors: string[] = ['#00FFFF', '#FFD700', '#00FF7F', '#FF69B4', '#7B68EE', '#FFE4C4', '#32CD32', '#8A2BE2', '#FFA500']


  /*-------Generate-Quotes-------*/
  const generateQuote = async () => {
    try {
      setLoading(true)
      const response = await fetch('https://type.fit/api/quotes')
      const data = await response.json()
      let randomNumber = Math.floor(Math.random() * data.length)
      setQuote(data[randomNumber])
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    } finally {
      setLoading(false)
    }
  }

  
  useEffect(() => {
    generateQuote()
  }, [])


  useEffect(() => {
    if (textRef?.current) {
      textRef.current.style.color = colors[Math.floor(Math.random() * colors.length)]
    }
  }, [quote])


  return (
    <main className='w-full h-screen flex flex-col justify-center items-center'>
      {
        loading 
          ? <h1>Loading...</h1>
          : (
            <div className='w-full max-w-[600px] p-2 font-semibold text-center'>
              <p ref={textRef} className='text-xl'>Quote: {quote.text}</p>
              <span className='py-2 inline-block text-base'>Author: {quote.author}</span>
            </div>
          )
      }
      
      <div className='flex gap-4 mt-4'>
        <button disabled={loading} onClick={() => generateQuote()} className='p-2 bg-purple-600 rounded mx-auto'>get Quote</button>
        <a href={`https://twitter.com/intent/tweet?text=${quote.text}`} target='_blank' rel='noopener noreferrer' className='p-2 bg-[tomato] rounded'>Tweet</a>
      </div>
    </main>
  )
}

export default App
