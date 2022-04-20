import { memo } from 'react'

import { IGenre } from '../interfaces/IGenre'
import { IMovie } from '../interfaces/IMovie'

import { MovieCard } from './MovieCard'

interface ContentProps {
  selectedGenre: IGenre
  movies: IMovie[]
}

export function ContentComponent({ selectedGenre, movies }: ContentProps) {
  return (
    <div className="container">
      <header>
        <span className="category">
          Categoria:<span> {selectedGenre.title}</span>
        </span>
      </header>

      <main>
        <div className="movies-list">
          {movies.map(movie => (
            <MovieCard
              key={movie.imdbID}
              title={movie.Title}
              poster={movie.Poster}
              runtime={movie.Runtime}
              rating={movie.Ratings[0].Value}
            />
          ))}
        </div>
      </main>
    </div>
  )
}

/**
 * Sem o memo, esse componente é renderizado 3 vezes por causa dos 3 estados do
 * componente pai. Utilizando o memo, o componente é reenderizado apenas quando
 * o estado de movies é alterado, já que o o id do genre não muda.
 */
export const Content = memo(ContentComponent, (prevProps, nextProps) => {
  return Object.is(prevProps.movies, nextProps.movies)
})
