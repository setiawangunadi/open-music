const albums = require('./albums');

class AlbumHandler{
    constructor(service){
        this._service = service;

        this.postAlbumHandler = this.postAlbumHandler.bind(this);
        this.getAlbumByIdHandler = this.getAlbumByIdHandler.bind(this);
        this.putAlbumByIdHandler = this.putAlbumByIdHandler.bind(this);
        this.deleteAlbumByIdHandler = this.deleteAlbumByIdHandler.bind(this);
    }

    postAlbumHandler(request, h){
        try {
            const { name = 'untitled', year } = request.payload;

            this._service.addAlbum({ name, year});
    
            const albumId = this._service.addAlbum({ name, year });
    
            const response = h.response({
                status: 'success',
                data: {
                    albumId,
                }
            });
            response.code(201);
            return response;
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(400);
            return response;
        }
    }

    getAlbumByIdHandler(request, h){
        try {
            const { album_id } = request.params;
            const album = this._service.getAlbumById(album_id);
            const response = h.response({
                status: 'success',
                data: {
                    album: {
                        "id" : album.album_id,
                        "name" : album.name,
                        "year" : album.year
                    }
                },
            });
            response.code(200);
            return response;
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(404);
            return response;
        }
    }

    putAlbumByIdHandler(request, h){
        try {
            const { album_id } = request.params;

            this._service.editAlbumById(album_id, request.payload);
    
            const response = h.response({
                status : 'success',
                message: 'Album berhasil diperbarui',
            });
            response.code(200);
            return response;
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(404);
            return response;
        }
    }

    deleteAlbumByIdHandler(request, h){
        try {
            const { album_id } = request.params;
            this._service.deleteAlbumById(album_id);

            const response = h.response({
                status: 'success',
                message: 'Album berhasil dihapus',
            });
            response.code(200);
            return response;
        } catch (error) {
            const response = h.response({
                status: 'fail',
                message: error.message,
            });
            response.code(404);
            return response; 
        }

    }
}

module.exports = AlbumHandler;