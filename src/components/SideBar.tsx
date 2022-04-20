/* eslint-disable @typescript-eslint/no-explicit-any */

import { memo } from 'react'

import { IGenre } from '../interfaces/IGenre'

import { Button } from './Button'

interface SideBarProps {
  genres: IGenre[]
  selectedGenreId: number
  buttonClickCallback: (args: any) => void
}

function SideBarComponent({
  genres,
  selectedGenreId,
  buttonClickCallback
}: SideBarProps) {
  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map(genre => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => buttonClickCallback(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  )
}

/**
 * Não comparamos as prevProps com as nextProps, pois seria impossível indicar
 * o link ativo no sideBar.
 */

export const SideBar = memo(SideBarComponent)
