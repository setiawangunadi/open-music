const { nanoid } = require("nanoid");
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class SongsService {
    constructor() {
        this._songs = [];
    }

    addSong({ title, year, genre, performer, duration, albumId }) {
        const id = nanoid(16);
        const song_id = `song-${id}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newSong = {
            title, year, genre, performer, duration, albumId, song_id, createdAt, updatedAt,
        };

        this._songs.push(newSong);

        const isSuccess = this._songs.filter((song) => song.song_id === song_id).length > 0;

        if(!isSuccess){
            throw new InvariantError('Lagu gagal ditambahkan');
        }

        return song_id;
    
    }

    getSongById(song_id){
        const song = this._songs.filter((n) => n.song_id === song_id)[0];
        if(!song){
            throw new NotFoundError('Lagu tidak ditemukan');
        }

        return song;
    }

    getSongs(){
        return this._songs;
    }

    editSongById(song_id, { title, year, genre, performer, duration, albumId }){
        const index = this._songs.findIndex((song) => song.song_id === song_id);

        if (index === -1){
            throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
        }

        const updatedAt = new Date().toISOString();

        this._songs[index] = {
            ...this._songs[index],
            title,
            year,
            genre,
            performer,
            duration,
            albumId,
            updatedAt,
        };
    }

    deleteSongById(song_id){
        const index = this._songs.findIndex((song) => song.song_id === song_id);

        if(index === -1){
            throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan');
        }

        this._songs.splice(index, 1);
    }
}

module.exports = SongsService;