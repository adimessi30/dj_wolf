import regeneratorRuntime from 'regenerator-runtime'
import { firestore } from 'firebase/app'
import fireStoreDB from './fireStore'
import { GENERAL } from '../constants'

const FieldValue = firestore.FieldValue

export const addPlaylist = async playlistName => {
  fireStoreDB
    .collection(GENERAL.ALL_PLAYLISTS)
    .doc(playlistName)
    .set({
      [GENERAL.CUSTOM_PLAYLIST_IDENTIFIER]: true,
      [GENERAL.SONG_IDS]: []
    })
}

export const removePlaylist = async playlistName => {
  fireStoreDB
    .collection(GENERAL.ALL_PLAYLISTS)
    .doc(playlistName)
    .delete()
}

export const addToPlaylist = async (playlistName, songId) => {
  fireStoreDB
    .collection(GENERAL.ALL_PLAYLISTS)
    .doc(playlistName)
    .update({ [GENERAL.SONG_IDS]: FieldValue.arrayUnion(songId) })
}

export const removeFromPlaylist = async (playlistName, songId) => {
  fireStoreDB
    .collection(GENERAL.ALL_PLAYLISTS)
    .doc(playlistName)
    .update({ [GENERAL.SONG_IDS]: FieldValue.arrayRemove(songId) })
}

export const addSongToRepo = async (songId, title, artist, length) => {
  fireStoreDB
    .collection(GENERAL.SONGS_REPO)
    .doc(songId)
    .set({ title, artist, length })
    .then(() => {
      fireStoreDB
        .collection(GENERAL.ALL_PLAYLISTS)
        .doc(GENERAL.ALL_SONGS)
        .update({ [GENERAL.SONG_IDS]: FieldValue.arrayUnion(songId) })
    })
}

export const removeSongFromRepo = async songId => {
  fireStoreDB
    .collection(GENERAL.SONGS_REPO)
    .doc(songId)
    .delete()
    .then(() => {
      fireStoreDB
        .collection(GENERAL.ALL_PLAYLISTS)
        .get()
        .then(snapshot => {
          snapshot.docs.map(doc => {
            doc.data()[GENERAL.SONG_IDS].has(songId) &&
              doc.ref.update({
                [GENERAL.SONG_IDS]: FieldValue.arrayRemove(songId)
              })
          })
        })
    })
}

export const setCurrentPlaylist = async playlistName => {
  fireStoreDB
    .collection(GENERAL.MISC)
    .doc(GENERAL.LAST_KNOWN_STATE)
    .set({ [GENERAL.CURRENT_PLAYLIST]: playlistName }, { merge: true })
}
