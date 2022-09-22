
import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog';

import './styles/main.css'
import logo from './assets/logo.svg'
import GameBanner from './components/BannerBanner'
import CreateAdBanner from './components/CreateAdBanner'
import ChamaModal from './components/ChamaModal'

interface Game{
  id: string;
  title: string;
  bannerUrl: string;
  _count:{
    Ads: number;
  }
}

function App() {
  const [games, setGames]= useState<Game[]>([])

  useEffect(() => {
    fetch('http://localhost:8080/games')
    .then(response => response.json())
    .then(data => setGames(data))
    .catch(err => console.log(err))
  },[] )

  return (
    <div className="max-w-[1344px] mx-auto flex flex-col items-center my-20">
      <img src={logo}></img>
      <h1 className='text-6xl text-white font-black mt-20'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.</h1>
    <div className='grid grid-cols-6 gap-6 mt-16'>
      {games.map((game) => {
        return(
        <GameBanner
          key={game.id}
          bannerUrl={game.bannerUrl}
          title={game.title}
          AdsCount={game._count.Ads}
          />
          )
        }
      )}
   
    </div>
    <Dialog.Root> 
      <CreateAdBanner></CreateAdBanner>
      <ChamaModal></ChamaModal>
      
    </Dialog.Root>
    </div>
  )
}

export default App
