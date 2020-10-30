import { GENERAL, ACTION_TYPES } from '../constants'

export const initialState = {
  [GENERAL.SONGS_REPO]: {},
  [GENERAL.CURRENT_PLAYLIST]: GENERAL.ALL_SONGS,
  [GENERAL.ALL_PLAYLISTS]: {
    [GENERAL.ALL_SONGS]: {
      [GENERAL.CUSTOM_PLAYLIST_IDENTIFIER]: false,
      [GENERAL.SONG_IDS]: []
    },
    [GENERAL.FAVORITES]: {
      [GENERAL.CUSTOM_PLAYLIST_IDENTIFIER]: false,
      [GENERAL.SONG_IDS]: []
    }
  }
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.UPDATE_ALL_SONGS:
      return { ...state, [GENERAL.SONGS_REPO]: action[GENERAL.SONGS_REPO] }
    case ACTION_TYPES.UPDATE_ALL_PLAYLISTS:
      return {
        ...state,
        [GENERAL.ALL_PLAYLISTS]: action[GENERAL.ALL_PLAYLISTS]
      }
    case ACTION_TYPES.UDPATE_CURRENT_PLAYLIST:
      return {
        ...state,
        [GENERAL.CURRENT_PLAYLIST]: action[GENERAL.CURRENT_PLAYLIST]
      }
    default:
      return state
  }
}

export default reducer
