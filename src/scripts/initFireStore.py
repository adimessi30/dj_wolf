import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import json

firebase_admin.initialize_app(credentials.Certificate(
    '/home/adimessi30/React/dj_wolf/src/scripts/creds.json'))

db = firestore.client()
all_songs = json.load(open('/home/adimessi30/React/dj_wolf/src/media.json'))
batch = db.batch()

songsRepo = db.collection('songsRepo')
for songId, songContent in all_songs.items():
    print(songId)
    batch.set(songsRepo.document(songId), songContent)

allPlaylists = db.collection('allPlaylists')
batch.set(allPlaylists.document('allSongs'), {
    'isCustomPlaylist': False,
    'songIds': list(all_songs.keys())
})
batch.set(allPlaylists.document('favorites'), {
    'isCustomPlaylist': False,
    'songIds': list()
})

batch.commit()
