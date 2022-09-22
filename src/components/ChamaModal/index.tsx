
import * as Dialog from '@radix-ui/react-dialog';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as Select from '@radix-ui/react-select';
import * as ToggleGroup from '@radix-ui/react-toggle-group';

import { Check, Database, GameController } from 'phosphor-react';
import Input from '../form'
import { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';

interface Game{
  id: string;
  title: string;
  weekDays: string[];
 
}


export default function ChamaModal(){

  const [games, setGames]= useState<Game[]>([])
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChanel, setUseVoiceChanel]  = useState()

  useEffect(() => {
    axios('http://localhost:8080/games').then(response => setGames(response.data))
    .catch(err => console.log(err))
  },[] )

  async function hndleCreatedAd(event : FormEvent){
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)

    const  data = Object.fromEntries(formData)
    console.log(data)
    if(!data.name){
      return
    }

    try{
      await axios.post(`http://localhost:8080/games/${data.game}/ads`,{
          name: data.name,
          weekDays: weekDays.map(Number),
          discord: data.discord,
          useVoiceChannel: useVoiceChanel,
          hourStart: data.hourStart,
          hourEnd: data.hourEnd,
          yearsPlaying: Number(data.yearsPlaying)
        })
        alert("Anuncio Criado com sucesso!")
    }catch(err){
      console.log(err)
      alert('Erro ao criar o anuncio')

    }
  }
    return(
        <Dialog.Portal>
        <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
          <Dialog.Content className='fixed bg-[#242634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black-25'>
            <Dialog.Title className='text-3xl text-white  font-black'>Publique um anúncio</Dialog.Title>
              <form onSubmit={hndleCreatedAd} className='mt-8 flex flex-col gap-4'>
                <div className=' flex flex-col gap-2'>
                  <label htmlFor="game" className='font-semibold'>Qual o Game</label>
                  <select name="game" defaultValue=''  className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder: text-zinc-500'>
                    <option disabled value=''>Selecione o game que quer jogar</option>
                    {games.map(game =>{
                      return(
                        <option key={game.id} value={game.id}>{game.title}</option>
                      )
                    })}
                  </select>

                </div>

                <div  className=' flex flex-col gap-2'>
                    <label htmlFor='name'>Seu nome (ou nick name)</label>
                    <Input name='name' type="text" placeholder='Como te chamam dentro do game?' />
                </div>
                <div className='grid grid-cols-2 gap-6'>
                  <div className='flex flex-col gap-2'>
                      <label htmlFor='yearsPlayng'>Joga a quantos anos</label>
                      <Input name='yearsPlaying' type="text" placeholder='tudo bem ser ZERO' />
                  </div>
                  <div className='flex flex-col gap-2'>
                      <label htmlFor='discord'>Qual seu Discord</label>
                      <Input name='discord' type="text" placeholder='Usuario#0000' />
                  </div>
                </div>
                <div className='flex gap-6'>
                  <div className='flex flex-col gap-2'>
                    <label htmlFor='weekDays'>Quando costuma jogar?</label>
                      <ToggleGroup.Root  
                        type='multiple'
                        className='grid grid-cols-4 gap-2'
                        value={weekDays}
                        onValueChange={setWeekDays}
                    
                      >
                      <ToggleGroup.Item value="0" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('0') ? 'bg-violet-500' : '' }`} title='domingo'>D</ToggleGroup.Item>
                      <ToggleGroup.Item value="1"  className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('1') ? 'bg-violet-500' : '' }`} title='segunda'>S</ToggleGroup.Item>
                      <ToggleGroup.Item value="2" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('2') ? 'bg-violet-500' : '' }`} title='terca'>T</ToggleGroup.Item>
                      <ToggleGroup.Item value="3" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('3') ? 'bg-violet-500' : '' }`} title='quarta'>Q</ToggleGroup.Item>
                      <ToggleGroup.Item value="4" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('4') ? 'bg-violet-500' : '' }`} title='quinta'>Q</ToggleGroup.Item>
                      <ToggleGroup.Item value="5" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('5') ? 'bg-violet-500' : '' }`} title='sexta'>S</ToggleGroup.Item>
                      <ToggleGroup.Item value="6" className={`w-8 h-8 rounded bg-zinc-900 ${weekDays.includes('6') ? 'bg-violet-500' : '' }`} title='sabado'>S</ToggleGroup.Item>
                      </ToggleGroup.Root>
                    
                    
                  </div>
                  <div className='flex flex-col gap-2 flex-1'>
                    <label htmlFor='startandend'>Qual horario do dia?</label>
                    <div className='grid grid-cols-2 gap-2'>
                      <Input name='hourStart' type="time"  placeholder='De'/>
                      <Input name='hourEnd' type="time" placeholder='Ate' />
                    </div>
              
                  </div>
                  </div>
                  
                  <label className='mt-2 flex gap-2 text-sm'>
                      
                      <Checkbox.Root 
                        checked={useVoiceChanel}
                        className='w-6 h-6 p-1 flex items-center rounded bg-zinc-900'
                        onCheckedChange={(checked)=>{
                          if(checked===true){
                            setUseVoiceChanel(true)
                          }else{
                            setUseVoiceChanel(false)
                          }
                        }}
                      >
                        <Checkbox.Indicator>
                          <Check className='w-4 h-4 text-emerald-400'/>
                        </Checkbox.Indicator >
                      </Checkbox.Root>
                      Constume me conectar com chata de voz
                  </label>
                 <footer className='mt-4 flex justify-end gap-2' >
                  <Dialog.Close  className='bg-zinc-500 hover:bg-zinc-600 px-5 h-12 rounded-md font-semibold gap-4'>
                    Cancelar
                  </Dialog.Close>
                  <button   className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600'type='submit'>
                    <GameController className='w-6 h-6'/>
                    Encontrar duo
                  </button>
                 </footer>

                
              </form>
            
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    )
}