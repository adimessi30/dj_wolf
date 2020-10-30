/** @jsx jsx */
import { useState } from 'react'
import { css, jsx } from '@emotion/core'
import Modal from './Modal'
import { GENERAL } from '../constants'
import {
  GlobalContext,
  useGlobalContext
} from '../context/GlobalContextProvider'
import {
  addToPlaylistHelper,
  removeFromPlaylistHelper
} from '../FireStoreAccessor/fireStoreHelper'

const Content = () => {
  const [contentState, setState] = useState({
    modal: false,
    songId: null
  })
  const [{ songsRepo, currentPlaylist, allPlaylists }, {}] = useGlobalContext(
    GlobalContext
  )
  const songIds = allPlaylists[currentPlaylist][GENERAL.SONG_IDS]
  const handleModal = () =>
    setState({ ...contentState, modal: !contentState.modal })

  return (
    <div className="Content" css={songsTableCSS}>
      {songIds.length <= 0 ? (
        <p>Your playlist is empty. Start by adding some songs!</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th />
              <th />
              {allPlaylists[currentPlaylist][
                GENERAL.CUSTOM_PLAYLIST_IDENTIFIER
              ] ? (
                <th />
              ) : null}
              <th>Title</th>
              <th>Artist</th>
              <th>Length</th>
            </tr>
          </thead>

          <tbody>
            {songIds.map(id => {
              const { title, artist, length } = songsRepo[id]
              const isFavorite = allPlaylists[GENERAL.FAVORITES][
                GENERAL.SONG_IDS
              ].includes(id)

              return (
                <tr key={id}>
                  <td>
                    {isFavorite ? (
                      <i
                        className="fa fa-heart"
                        aria-hidden="true"
                        title="Remove from Favorites"
                        onClick={() =>
                          removeFromPlaylistHelper(allPlaylists, {
                            playlistName: GENERAL.FAVORITES,
                            songId: id
                          })
                        }
                      />
                    ) : (
                      <i
                        className="fa fa-heart-o"
                        aria-hidden="true"
                        title="Add to Favorites"
                        onClick={() =>
                          addToPlaylistHelper(allPlaylists, {
                            playlistName: GENERAL.FAVORITES,
                            songId: id
                          })
                        }
                      />
                    )}
                  </td>
                  <td
                    onClick={() =>
                      setState({ ...contentState, modal: true, songId: id })
                    }
                  >
                    <i
                      className="fa fa-plus"
                      aria-hidden="true"
                      title="Add to playlist(s)"
                    />
                  </td>
                  {allPlaylists[currentPlaylist][
                    GENERAL.CUSTOM_PLAYLIST_IDENTIFIER
                  ] ? (
                    <td>
                      <i
                        className="fa fa-remove"
                        aria-hidden="true"
                        title="Remove from playlist"
                        onClick={() =>
                          removeFromPlaylistHelper(allPlaylists, {
                            playlistName: currentPlaylist,
                            songId: id
                          })
                        }
                      />
                    </td>
                  ) : null}
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
        <div className="listPlaylists" css={listPlaylistsCSS}>
          {Object.keys(allPlaylists).length === 2 ? (
            <p>
              You don't have any playlists yet. Please create some playlists to
              start adding songs to them.
            </p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th />
                  <th>Playlist</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(allPlaylists)
                  .filter(
                    playlist =>
                      allPlaylists[playlist][GENERAL.CUSTOM_PLAYLIST_IDENTIFIER]
                  )
                  .map(customPlaylist => {
                    const isInPlaylist = allPlaylists[customPlaylist][
                      GENERAL.SONG_IDS
                    ].includes(contentState.songId)
                    return (
                      <tr key={customPlaylist}>
                        <td>
                          {isInPlaylist ? (
                            <i
                              className="check fa fa-check-circle"
                              aria-hidden="true"
                              title="Remove from playlist"
                              onClick={removeFromPlaylistHelper(allPlaylists, {
                                playlistName: customPlaylist,
                                songId: contentState.songId
                              })}
                            />
                          ) : (
                            <i
                              className="check fa fa-check-circle-o"
                              aria-hidden="true"
                              title="Add to playlist"
                              onClick={addToPlaylistHelper(allPlaylists, {
                                playlistName: customPlaylist,
                                songId: contentState.songId
                              })}
                            />
                          )}
                        </td>
                        <td>{customPlaylist}</td>
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          )}
        </div>
      </Modal>
    </div>
  )
}

const songsTableCSS = css`
  height: calc(100% - 50px);
  width: calc(100% - 200px);
  padding: 20px;
  background: #121212;
  padding-top: 50px;
  text-transform: capitalize;
  overflow: scroll;
  ::-webkit-scrollbar {
    width: 15px;
  }
  ::-webkit-scrollbar-thumb {
    background: #282828;
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
  table th {
    text-align: left;
    text-transform: uppercase;
    border-bottom: 1px solid white;
  }
  table td {
    padding: 10px 0;
  }
  i {
    cursor: pointer;
  }
`

const listPlaylistsCSS = css`
  p {
    text-transform: none;
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
  table th {
    text-align: left;
    text-transform: uppercase;
    border-bottom: 1px solid white;
  }
  table td {
    padding: 10px 0;
  }
  .check {
    position: relative;
    top: unset;
    right: unset;
    cursor: pointer;
  }
`

export default Content
