import uniqueHash from 'unique-hash'
import {
  addPlaylist,
  addSongToRepo,
  addToPlaylist,
  removeFromPlaylist,
  removePlaylist,
  removeSongFromRepo,
  setCurrentPlaylist
} from './fireStoreDao'
import { GENERAL } from '../constants'

export const addPlaylistHelper = (allPlaylists, playlistName) => {
  if (!Object.keys(allPlaylists).includes(playlistName.toLowerCase())) {
    addPlaylist(playlistName.toLowerCase())
    console.log(`Added playlist: ${playlistName}`)
  } else {
    console.log(`Playlist: ${playlistName} already exists`)
  }
}

export const removePlaylistHelper = playlistName => {
  if (Object.keys(allPlaylists).includes(playlistName)) {
    if (currentPlaylist === playlistName) {
      setCurrentPlaylist(GENERAL.ALL_SONGS)
    }
    removePlaylist(playlistName)
    console.log(`Removed playlist: ${playlistName}`)
  } else {
    console.log(`Playlist: ${playlistName} does not exist`)
  }
}

export const addSongToRepoHelper = (songsRepo, { title, artist, length }) => {
  const songId = uniqueHash(title + '|' + artist + '|' + length, {
    format: 'string'
  })
  if (!Object.keys(songsRepo).includes(songId)) {
    addSongToRepo(songId, title, artist, length)
  }
}

export const removeSongFromRepoHelper = (songsRepo, songId) => {
  if (Object.keys(songsRepo).includes(songId)) {
    removeSongFromRepo(songId)
  }
}

export const addToPlaylistHelper = (allPlaylists, { playlistName, songId }) => {
  if (!allPlaylists[playlistName][GENERAL.SONG_IDS].includes(songId)) {
    addToPlaylist(playlistName, songId)
    console.log(`Added songId: ${songId} to playlist: ${playlistName}`)
  } else {
    console.log(
      `SongId: ${songId} is already added to playlist: ${playlistName}`
    )
  }
}

export const removeFromPlaylistHelper = (
  allPlaylists,
  { playlistName, songId }
) => {
  if (allPlaylists[playlistName][GENERAL.SONG_IDS].includes(songId)) {
    removeFromPlaylist(playlistName, songId)
    console.log(`Removed songId: ${songId} from playlist: ${playlistName}`)
  } else {
    console.log(`SongId: ${songId} is not part of playlist: ${playlistName}`)
  }
}

export const setCurrentPlaylistHelper = (
  allPlaylists,
  currentPlaylist,
  playlistName
) => {
  if (
    Object.keys(allPlaylists).includes(playlistName) &&
    currentPlaylist !== playlistName
  ) {
    setCurrentPlaylist(playlistName)
    console.log(`Setting current playlist to ${playlistName}`)
  } else {
    console.log(`Current playlist is already set to ${playlistName}`)
  }
}
