

import React from 'react'
import { CardTheme } from './statistique-theme/card-theme'

export const StatistiqueTheme = () => {
      return (
        <div className="flex items-center gap-x-8 mt-8">
            <CardTheme label='commandes' nbre={1030} />
            <CardTheme label='livraisons' nbre={780} />
            <CardTheme label='popularités' nbre={1250} />
        </div>
      )
}
