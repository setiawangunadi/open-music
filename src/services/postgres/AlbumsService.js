const { nanoid } = require("nanoid");
const { Pool } = require("pg");
const InvariantError = require('../../exceptions/InvariantError');
const { mapAlbumToModel } = require('../../utils');
const NotFoundError = require("../../exceptions/NotFoundError");

class AlbumsService{
    constructor(){
        this._pool = new Pool();
    }

    async addAlbum({ name, year }){
        const id = nanoid(16);
        const album_id = `album-${id}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text : 'INSERT INTO albums VALUES($1, $2, $3, $4, $5) RETURNING album_id',
            values: [album_id, name, year, createdAt, updatedAt],
        };

        const result = await this._pool.query(query);

        if (!result.rows[0].album_id){
            throw new InvariantError('Album gagal ditambahkan');
        }

        return result.rows[0].album_id;
    }

    async getAlbumById(album_id){
        const query = {
            text: 'SELECT * FROM albums WHERE album_id = $1',
            values: [album_id],
        };
        const result = await this._pool.query(query);

        if (!result.rows.length){
            throw new NotFoundError('Album tidak ditemukan');
        }

        return result.rows.map(mapAlbumToModel)[0];
    }

    async editAlbumById(album_id, { name, year }){
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE albums SET name = $1, year = $2, updated_at = $3 WHERE album_id = $4 RETURNING album_id',
            values: [name, year, updatedAt, album_id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length){
            throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
        }
    }

    async deleteAlbumById(album_id){
        const query = {
            text: 'DELETE FROM albums WHERE album_id = $1 RETURNING album_id',
            values: [album_id],
        };

        const result = await this._pool.query(query);

        if (!result.rows.length){
            throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
        }
    }
}

module.exports = AlbumsService;