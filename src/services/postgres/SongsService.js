const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapSongToModel, mapAllSongToModel, mapDBToModel } = require('../../utils');

class SongsService{
    constructor() {
        this._pool = new Pool();
    }


    async addSong({ title, year, genre, performer, duration, albumId }){
        const id = nanoid(16);
        const song_id = `song_${id}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING song_id',
            values: [song_id, title, year, performer, genre, duration, albumId, createdAt, updatedAt],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].song_id){
            throw new InvariantError('Lagu gagal ditambahkan');
        }

        return result.rows[0].song_id;

    }

    async getSongs(){
        const result = await this._pool.query('SELECT song_id, title, performer FROM songs');
        return result.rows.map(mapDBToModel);
    }

    async getSongById(song_id){
        const query = {
            text: 'SELECT * FROM songs WHERE song_id = $1',
            values: [song_id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length){
            throw new NotFoundError('Lagu tidak ditemukan');
        }

        return result.rows.map(mapSongToModel)[0];
    }

    async editSongById(song_id, { title, year, genre, performer, duration, albumId }){
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6, updated_at = $7 WHERE song_id = $8 RETURNING song_id',
            values: [title, year, genre, performer, duration, albumId, updatedAt, song_id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length) {
            throw new NotFoundError('Gagal memperbarui lagu. Id tidak ditemukan');
        }
    }

    async deleteSongById(song_id){
        const query = {
            text: 'DELETE FROM songs WHERE song_id = $1 RETURNING song_id',
            values: [song_id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length){
            throw new NotFoundError('Lagu gagal dihapus. Id tidak ditemukan')
        }
    }
}

module.exports = SongsService;