/** @jsx jsx */
import React, { useReducer, createContext } from 'react'
import { css, jsx } from '@emotion/core'
import Topbar from './Topbar'
import Sidebar from './Sidebar'
import Playbar from './Playbar'
import Content from './Content'
import media from '../../media.json'

export const StoreContext = createContext(null)

const DEFAULT_PLAYLIST = 'home'

const initialState = {
  media,
  currentPlaylist: DEFAULT_PLAYLIST,
  playlists: {
    home: new Set(media.ids),
    favorites: new Set()
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_PLAYLIST':
      return {
        ...state,
        playlists: { ...state.playlists, [action.playlist]: new Set() }
      }
    case 'SET_PLAYLIST':
      return { ...state, currentPlaylist: action.playlist }
    case 'TOGGLE_FAVORITE':
      state.playlists.favorites.has(action.songId)
        ? state.playlists.favorites.delete(action.songId)
        : state.playlists.favorites.add(action.songId)
      return { ...state }
  }
  return state
}

const MusicPlayer = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      <div css={CSS}>
        <Topbar />
        <Sidebar />
        <Content />
        <Playbar></Playbar>
      </div>
    </StoreContext.Provider>
  )
}

const CSS = css`
  height: 100%;
  width: 100%;
  display: flex;
  position: relative;
  color: white;
`

export default MusicPlayer
