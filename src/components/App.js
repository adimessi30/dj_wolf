import React, { useEffect } from 'react'
import { Global, css } from '@emotion/core'
import MusicPlayer from './MusicPlayer'
import fireStoreDB from '../FireStoreAccessor/fireStore'
import {
  GlobalContext,
  useGlobalContext
} from '../context/GlobalContextProvider'
import { GENERAL, ACTION_TYPES } from '../constants'

/**
 * @function App
 */
const App = () => {
  const [{}, dispatch] = useGlobalContext(GlobalContext)

  // UseEffect to update `all_songs` global context state
  useEffect(() => {
    fireStoreDB.collection(GENERAL.SONGS_REPO).onSnapshot(snapshot => {
      dispatch({
        type: ACTION_TYPES.UPDATE_ALL_SONGS,
        [GENERAL.SONGS_REPO]: Object.assign(
          {},
          ...snapshot.docs.map(doc => ({ [doc.id]: doc.data() }))
        )
      })
    })
  }, [])

  // UseEffect to update `playlists` global context state
  useEffect(() => {
    fireStoreDB.collection(GENERAL.ALL_PLAYLISTS).onSnapshot(snapshot => {
      dispatch({
        type: ACTION_TYPES.UPDATE_ALL_PLAYLISTS,
        [GENERAL.ALL_PLAYLISTS]: Object.assign(
          {},
          ...snapshot.docs.map(doc => ({ [doc.id]: doc.data() }))
        )
      })
    })
  }, [])

  //UseEffect to update `current playlist` global context state
  useEffect(() => {
    fireStoreDB.collection(GENERAL.MISC).onSnapshot(snapshot => {
      dispatch({
        type: ACTION_TYPES.CURRENT_PLAYLIST,
        [GENERAL.CURRENT_PLAYLIST]: snapshot.docs
          .find(doc => doc.id === GENERAL.LAST_KNOWN_STATE)
          .data()[GENERAL.CURRENT_PLAYLIST]
      })
    })
  }, [])

  return (
    <>
      <Global styles={GlobalCSS} />
      <MusicPlayer />
    </>
  )
}

const GlobalCSS = css`
  * {
    box-sizing: border-box;
    font-family: 'Signika', sans-serif;
  }

  html,
  body,
  .app {
    margin: 0;
    height: 100%;
    width: 100%;
  }

  a {
    text-decoration: none;
  }

  ul {
    margin: 0;
    list-style: none;
    padding: 0;
  }
`

export default App
