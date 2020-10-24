/** @jsx jsx */
import React, { useContext, useState } from 'react'
import { StoreContext } from './index'
import { css, jsx } from '@emotion/core'
import Modal from './Modal'

const Content = () => {
  const [contentState, setState] = useState({
    modal: false,
    songId: null
  })
  const { state, dispatch } = useContext(StoreContext)
  const currentPlaylist = state.currentPlaylist
  const songIds = Array.from(state.playlists[currentPlaylist])

  const handleModal = () =>
    setState({ ...contentState, modal: !contentState.modal })

  return (
    <div className="Content" css={CSS}>
      <div className="playlist-title">{currentPlaylist}</div>
      {songIds.length <= 0 ? (
        <p>Your playlist is empty. Start by adding some songs!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <td />
              <td />
              <td>Title</td>
              <td>Artist</td>
              <td>Length</td>
            </tr>
          </thead>

          <tbody>
            {songIds.map(id => {
              const { title, artist, length } = state.media[id]
              const isFavorite = state.playlists.favorites.has(id)

              return (
                <tr key={id}>
                  <td
                    onClick={() =>
                      dispatch({ type: 'TOGGLE_FAVORITE', songId: id })
                    }
                  >
                    {isFavorite ? (
                      <i className="fa fa-heart" aria-hidden="true" />
                    ) : (
                      <i className="fa fa-heart-o" aria-hidden="true" />
                    )}
                  </td>
                  <td
                    onClick={() =>
                      setState({ ...contentState, modal: true, songId: id })
                    }
                  >
                    <i className="fa fa-plus" />
                  </td>
                  <td>{title}</td>
                  <td>{artist}</td>
                  <td>{length}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      )}
      <Modal show={contentState.modal} close={handleModal}>
        <div className="listPlaylists" css={CSS}>
          <table>
            <thead>
              <tr>
                <td />
                <td>Playlist</td>
              </tr>
            </thead>
            <tbody>
              {Object.keys(state.playlists)
                .filter(
                  playlist => playlist !== 'home' && playlist !== 'favorites'
                )
                .map(customPlaylist => {
                  const isInPlaylist = state.playlists[customPlaylist].has(
                    contentState.songId
                  )
                  return (
                    <tr key={customPlaylist}>
                      <td>
                        <i class="fa fa-check" />
                      </td>
                      <td>{customPlaylist}</td>
                    </tr>
                  )
                })}
            </tbody>
          </table>
        </div>
      </Modal>
    </div>
  )
}

const CSS = css`
  height: calc(100% - 50px);
  width: calc(100% - 200px);
  padding: 20px;
  background: #121212;
  padding-top: 80px;
  text-transform: capitalize;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 15px;
  }
  ::-webkit-scrollbar-thumb {
    background: #282828;
  }

  .playlist-title {
    font-size: 20px;
  }
  table {
    border-collapse: collapse;
    width: 100%;
    margin-top: 15px;
    font-size: initial;
  }
  table tr:not(:last-of-type) {
    border-bottom: 1px solid #282828;
  }
  table td {
    padding: 10px 0;
  }
  i {
    cursor: pointer;
  }
`

export default Content
