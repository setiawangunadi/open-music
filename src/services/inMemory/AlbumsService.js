const { nanoid } = require("nanoid");
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class AlbumsService {
    constructor() {
        this._albums = [];
    }

    addAlbum({ name, year }) {
        const id = nanoid(16);
        const album_id = `album-${id}`;
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const newAlbum = {
            name, year, album_id, createdAt, updatedAt,
        };

        this._albums.push(newAlbum);

        const isSuccess = this._albums.filter((album) => album.album_id === album_id).length > 0;

        if(!isSuccess){
            throw new InvariantError('Album gagal ditambahkan');
        }

        return album_id;
    }

    getAlbumById(album_id){
        const album = this._albums.filter((n) => n.album_id === album_id)[0];
        if(!album){
            throw new NotFoundError('Album tidak ditemukan');
        }

        return album;
    }

    editAlbumById(album_id, { name, year }){
        const index = this._albums.findIndex((album) => album.album_id === album_id);

        if (index === -1){
            throw new NotFoundError('Gagal memperbarui album. Id tidak ditemukan');
        }

        const updatedAt = new Date().toISOString();

        this._albums[index] = {
            ...this._albums[index],
            name,
            year,
            updatedAt,
        };
    }

    deleteAlbumById(album_id){
        const index = this._albums.findIndex((album) => album.album_id === album_id);

        if(index === -1){
            throw new NotFoundError('Album gagal dihapus. Id tidak ditemukan');
        }

        this._albums.splice(index, 1);
    }
}

module.exports = AlbumsService;