import { TbLayersUnion } from "react-icons/tb"; 
import { RiCustomerService2Fill } from "react-icons/ri"; 
import { ImGift } from "react-icons/im"; 
import { CiDeliveryTruck } from "react-icons/ci"; 


import React from 'react'
import { Typographie } from '../typographie'
import { CardService } from './services/card-service'

export const SectionService = () => {
  return (
    <section className="w-full bg-slate-200">
      <section className='container py-5'>
          <Typographie component="blockquote" variant='blockquote' size='md'>Services</Typographie>
          <Typographie component="h3" variant='h3' size='xl'>Le site offre à nos clients :</Typographie>
          <div className="flex justify-center items-center gap-x-8 py-5">
              <CardService icon={CiDeliveryTruck} title="Livraison Rapide" >
                  Options de livraison express avec suivi en temps réel pour que les clients puissent savoir exactement quand leurs sneakers arriveront.
              </CardService>
              <CardService icon={ImGift} title="Cartes Cadeaux" >
                Options des cartes cadeaux pour que les clients puissent offrir la possibilité de personnaliser des sneakers à leurs proches.
              </CardService>
              <CardService icon={RiCustomerService2Fill} title="Service Client 24/7" >
                Un support client disponible à tout moment pour répondre aux questions et résoudre les problèmes rapidement.
              </CardService>
              <CardService icon={TbLayersUnion} title="Programme de Fidélité" >
                Récompenses pour les clients réguliers, comme des réductions,  des offres exclusives et des avant-premières sur les nouveaux produits
              </CardService>
          </div>
      </section>
    </section>
  )
}
