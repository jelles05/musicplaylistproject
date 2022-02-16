
class PlaylistData {
    static getAll (resultCallback) {
        fetch('https://music-playlist-21.herokuapp.com/playlist', { method: 'GET' })
            .then(response => response.json())
            .then(responseObject => {
                resultCallback(responseObject)
            })
    }

    static getTracks (playlistID, resultCallback) {
        fetch('https://music-playlist-21.herokuapp.com/playlist/' + playlistID, { method: 'GET' })
            .then(response => response.json())
            .then(responseObject => {
                resultCallback(responseObject)
            })
    }

    static addTrack (track, resultCallback) {
        fetch('https://music-playlist-21.herokuapp.com/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(track)
        })
            .then(response => response.json())
            .then(responseObject => {
                resultCallback(responseObject)
            })
    }

    static deleteTrack (track, resultCallback) {
        const url = 'https://music-playlist-21.herokuapp.com/playlist'
        fetch(url, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(track)
        })
            .then(response => response.json())
            .then(responseObject => {
                resultCallback(responseObject)
            })
    }
}

export default PlaylistData
