import { useEffect, useState, useCallback } from 'react'

import { IGenreProps } from './@types/IGenreProps'
import { IMovieProps } from './@types/IMovieProps'
import { SideBar } from './components/SideBar'
import { Content } from './components/Content'
import { api } from './services/api'

import './styles/global.scss'
import './styles/sidebar.scss'
import './styles/content.scss'

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1)
  const [genres, setGenres] = useState<IGenreProps[]>([])
  const [movies, setMovies] = useState<IMovieProps[]>([])
  const [selectedGenre, setSelectedGenre] = useState<IGenreProps>(
    {} as IGenreProps
  )

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id)
  }, [])

  useEffect(() => {
    api.get('genres').then(res => setGenres(res.data))
  }, [])

  useEffect(() => {
    api
      .get<IMovieProps[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then(res => setMovies(res.data))

    api
      .get<IGenreProps>(`genres/${selectedGenreId}`)
      .then(res => setSelectedGenre(res.data))
  }, [selectedGenreId])

  return (
    <div className="appContainer">
      <SideBar
        genres={genres}
        selectedGenreId={selectedGenreId}
        buttonClickCallback={handleClickButton}
      />

      <Content selectedGenre={selectedGenre} movies={movies} />
    </div>
  )
}
