import { useEffect, useState, useCallback } from 'react'

import { IGenre } from './interfaces/IGenre'
import { IMovie } from './interfaces/IMovie'
import { SideBar } from './components/SideBar'
import { Content } from './components/Content'
import { api } from './services/api'

import './styles/global.scss'
import './styles/sidebar.scss'
import './styles/content.scss'

export function App() {
  const [selectedGenreId, setSelectedGenreId] = useState(1)
  const [genres, setGenres] = useState<IGenre[]>([])
  const [movies, setMovies] = useState<IMovie[]>([])
  const [selectedGenre, setSelectedGenre] = useState<IGenre>({} as IGenre)

  const handleClickButton = useCallback((id: number) => {
    setSelectedGenreId(id)
  }, [])

  useEffect(() => {
    async function fetchGenres() {
      const { data } = await api.get<IGenre[]>('/genres')
      setGenres(data)
    }

    fetchGenres()
  }, [])

  useEffect(() => {
    async function fetchMoviesByGenre() {
      const { data } = await api.get<IMovie[]>(
        `movies/?Genre_id=${selectedGenreId}`
      )
      setMovies(data)
    }

    async function fetchGenre() {
      const { data } = await api.get<IGenre>(`genres/${selectedGenreId}`)
      setSelectedGenre(data)
    }

    fetchMoviesByGenre()
    fetchGenre()
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
