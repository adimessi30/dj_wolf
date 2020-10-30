/** @jsx jsx */
import { useState, useRef } from 'react'
import { css, jsx } from '@emotion/core'
import Modal from './Modal'
import Toast from './Toast'
import logo from '../img/new_howl.png'
import {
  GlobalContext,
  useGlobalContext
} from '../context/GlobalContextProvider'
import {
  addPlaylistHelper,
  setCurrentPlaylistHelper
} from '../FireStoreAccessor/fireStoreHelper'

const Sidebar = () => {
  const [sidebarState, setState] = useState({
    modal: false,
    toast: ''
  })

  const [{ _, currentPlaylist, allPlaylists }, __] = useGlobalContext(
    GlobalContext
  )

  const playlistRef = useRef(null)

  const addPlaylist = e => {
    e.preventDefault()
    addPlaylistHelper(allPlaylists, playlistRef.current.value)
    setState({
      modal: false,
      toast: 'Your playlist was created successfully!'
    })
  }

  const handleModal = () =>
    setState({ ...sidebarState, modal: !sidebarState.modal })

  return (
    <ul className="Sidebar" css={CSS}>
      <img src={logo} />
      <li className="library">Library</li>
      {Object.keys(allPlaylists).map(playlist => (
        <li
          key={playlist}
          className={playlist === currentPlaylist ? 'active' : ''}
          onClick={() =>
            setCurrentPlaylistHelper(allPlaylists, currentPlaylist, playlist)
          }
        >
          {playlist}
        </li>
      ))}
      <li
        className="new-playlist"
        onClick={() => setState({ ...sidebarState, modal: true })}
      >
        <i className="fa fa-plus-circle" />
        <span>New Playlist</span>
      </li>
      <Modal show={sidebarState.modal} close={handleModal}>
        <form onSubmit={addPlaylist}>
          <div className="title">New Playlist</div>
          <div className="content-wrap">
            <input
              type="text"
              placeholder="My Playlist"
              required
              ref={playlistRef}
            />
            <br />
            <button type="submit">Create</button>
          </div>
        </form>
      </Modal>
      <Toast
        toast={sidebarState.toast}
        close={() => setState({ ...sidebarState, toast: '' })}
      />
    </ul>
  )
}

const CSS = css`
  width: 200px;
  height: 100%;
  background: #000000;

  img {
    height: 125px;
    padding-left: 30px;
    margin-bottom: 20px;
  }

  li {
    padding-left: 20px;
    text-transform: capitalize;
    margin-bottom: 10px;
    cursor: pointer;
    font-weight: bold;
  }

  li.active {
    border-left: 2px solid white;
    padding-left: 18px;
  }

  li.library {
    cursor: unset;
    color: #999;
    text-transform: uppercase;
    font-weight: normal;
  }

  li.new-playlist {
    position: absolute;
    bottom: 80px;
    i {
      margin-right: 5px;
      transform: translateY(1px);
      &:before {
        font-size: 20px;
      }
    }
    span {
      color: #999;
      font-weight: normal;
    }
  }

  form {
    button {
      background-color: #61dbfb;
      color: white;
      padding: 12.5px 30px;
      border-radius: 25px;
      text-transform: uppercase;
      font-weight: bold;
      font-size: 13px;
      border: none;
      cursor: pointer;
    }
    .title {
      margin: 0;
      margin-bottom: 35px;
    }
    input {
      margin-bottom: 20px;
      height: 35px;
      padding-left: 8px;
      font-size: 16px;
      width: 100%;
      color: black;
    }
    .content-wrap {
      margin: 0px auto;
      max-width: 250px;
      text-align: center;
    }
  }
`

export default Sidebar
