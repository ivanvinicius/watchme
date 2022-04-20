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
    async function fetchGenres() {
      const { data } = await api.get<IGenreProps[]>('/genres')
      setGenres(data)
    }

    fetchGenres()
  }, [])

  useEffect(() => {
    async function fetchMoviesByGenre() {
      const { data } = await api.get<IMovieProps[]>(
        `movies/?Genre_id=${selectedGenreId}`
      )
      setMovies(data)
    }

    async function fetchSelectedGenre() {
      const { data } = await api.get<IGenreProps>(`genres/${selectedGenreId}`)
      setSelectedGenre(data)
    }

    fetchMoviesByGenre()
    fetchSelectedGenre()
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
