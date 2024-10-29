
import React from 'react'
import { Typographie } from '../typographie'
import { GiftCard } from "../icons/gift-card";
import { FastDelivery } from "../icons/fast-delivery";
import { ServiceClient } from "../icons/service-client";
import { LoyaltyProgram } from "../icons/loyalty-program";

export const SectionService = () => {
  return (
    <section className="w-full bg-slate-200">
      <section className='container py-5'>
          <Typographie component="blockquote" variant='blockquote' size='md'>Services</Typographie>
          <Typographie component="h3" variant='h3' size='xl'>Le site offre à nos clients :</Typographie>
          <div className="flex justify-center items-center gap-x-8 py-5">

            <article className="w-1/5 h-[300px] bg-[#FAFAFA] space-y-3 px-6 py-8 shadow-md">
                <div className="mb-2 relative w-20 h-20"> <LoyaltyProgram className="-top-[0px] -left-2 h-20" /> </div>
                <Typographie component="h3" variant="h3" size="lg" className="">Programme de Fidélité</Typographie>
                <Typographie component="p" variant="p" size="md" className="">
                  Récompenses pour les clients réguliers, comme des réductions,  des offres exclusives et des avant-premières sur les nouveaux produits
                </Typographie>
            </article>

            <article className="w-1/5 h-[300px] bg-[#FAFAFA] space-y-3 px-6 py-8 shadow-md">
                <div className="mb-2 relative w-20 h-20"> <FastDelivery className="-top-[352px]" /> </div>
                <Typographie component="h3" variant="h3" size="lg" className="">Livraison Rapide</Typographie>
                <Typographie component="p" variant="p" size="md" className="">
                  Options de livraison express avec suivi en temps réel pour que les clients puissent savoir exactement quand leurs sneakers arriveront.
                </Typographie>
            </article>

            <article className="w-1/5 h-[300px] bg-[#FAFAFA] space-y-3 px-6 py-8 shadow-md">
                <div className="mb-2 relative w-20 h-20"> <GiftCard className="-top-[352px] -left-2" /> </div>
                <Typographie component="h3" variant="h3" size="lg" className="">Cartes Cadeaux</Typographie>
                <Typographie component="p" variant="p" size="md" className="">
                  Options des cartes cadeaux pour que les clients puissent offrir la possibilité de personnaliser des sneakers à leurs proches.
                </Typographie>
            </article>

            <article className="w-1/5 h-[300px] bg-[#FAFAFA] space-y-3 px-6 py-8 shadow-md">
                <div className="mb-2 relative w-20 h-20"> <ServiceClient className="-top-[0px] -left-2 h-20" /> </div>
                <Typographie component="h3" variant="h3" size="lg" className="">Service Client 24/7</Typographie>
                <Typographie component="p" variant="p" size="md" className="">
                  Un support client disponible à tout moment pour répondre aux questions et résoudre les problèmes rapidement.
                </Typographie>
            </article>

          </div>
      </section>
    </section>
  )
}
