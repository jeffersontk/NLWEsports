import './styles/main.css'

import logoIMG from './assets/logo.png'
import GameBanner from './components/GameBanner'
import CreateAdBanner from './components/CreateAdBanner'
import { useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog';
import { CreateAdModal } from './components/Form/CreateAdModal'
import axios from 'axios'

export type gamesType = {
  id: string,
  title: string,
  bannerUrl:string
  _count: {
      ads: number
  }
}

function App() {
  const [games, setGames] = useState<gamesType[]>([])

  useEffect(()=>{
    axios('http://localhost:3333/games')
    .then(response => {
      setGames(response.data)
    })
  },[])

  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoIMG} alt="logo NKW ESPOSRTS" />

      <h1 className='text-6xl text-white font-black mt-20'>
        Seu <span className='bg-nlw-gradient text-transparent bg-clip-text'> duo</span> está aqui.
      </h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {
          games && games.map(game => (
            <GameBanner
              key={game.id}
              adAmount={game._count.ads}
              bannerUrl={game.bannerUrl}
              title={game.title}
            />  
          ))
        }
      </div>
      <Dialog.Root>
        <CreateAdBanner />
        <CreateAdModal  gameList={games}/>
      </Dialog.Root>
    </div>
  )
}

export default App
