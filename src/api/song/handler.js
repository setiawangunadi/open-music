const ClientError = require('../../exceptions/ClientError');

class SongHandler{
    constructor(service, validator){
        this._service = service;
        this._validator = validator;

        this.postSongHandler = this.postSongHandler.bind(this);
        this.getAllSongHandler = this.getAllSongHandler.bind(this);
        this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
        this.putSongByIdHadler = this.putSongByIdHadler.bind(this);
        this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
    }

    async postSongHandler(request, h){
        try {
            this._validator.validateSongPayload(request.payload);
            const { title = 'untitled', year, genre, performer, duration, albumId } = request.payload;

            // this._service.addSong({ title, year, genre, performer, duration, albumId});

            const songId = await this._service.addSong({ title, year, genre, performer, duration, albumId});
    
            const response = h.response({
                status: 'success',
                data: {
                    songId,
                }
            });
            response.code(201);
            return response;
            // const {
            //     title = 'untitled',
            //     year,
            //     performer,
            //     genre,
            //     duration,
            //     album_id
            // } = request.payload;

            // const songId = await this._service.addSong({
            //     title,
            //     year,
            //     performer,
            //     genre,
            //     duration,
            //     album_id
            // });

            // const response = h.response({
            //     status: 'success',
            //     message: 'Lagu berhasil ditambahkan',
            //     data: {
            //         songId,
            //     },
            // });
            // response.code(201);
            // return response;
        } catch (error) {
            if (error instanceof ClientError){
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            //Server Error
            const response = h.response({
                status: 'fail',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async getAllSongHandler(request, h){
        try {
            const songs = await this._service.getSongs();

            const response = h.response({
                status: 'success',
                data: {
                    songs,
                }
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
        // try {
        //     const songs = await this._service.getSongs();
        //     return {
        //         status: 'success',
        //         data: {
        //             songs,
        //         },
        //     };
        // } catch (error) {
        //     return error;
        // }
    }

    async getSongByIdHandler(request, h){
        try {
            // this._validator.validateSongPayload(request.payload);
            const { song_id } = request.params;
            const song = await this._service.getSongById(song_id);
            const response = h.response({
                status: 'success',
                data: {
                    song: {
                        "id" : song.song_id,
                        "title" : song.title,
                        "year" : song.year,
                        "performer" : song.performer,
                        "genre" : song.genre,
                        "duration" : song.duration,
                        "albumId" : song.albumId,
                    }
                }
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof ClientError){
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            //Server Error
            const response = h.response({
                status: 'fail',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async putSongByIdHadler(request, h){
        try {
            this._validator.validateSongPayload(request.payload);
            const { song_id } = request.params;
            const { title, year, genre, performer, duration, albumId } = request.payload;

            await this._service.editSongById(song_id, { title, year, genre, performer, duration, albumId });

            const response = h.response({
                status : 'success',
                message : 'Lagu berhasil diperbarui',
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof ClientError){
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            //Server Error
            const response = h.response({
                status: 'fail',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }

    async deleteSongByIdHandler(request, h){
        try {
            const { song_id } = request.params;
            await this._service.deleteSongById(song_id);

            const response = h.response({
                status: 'success',
                message: 'Lagu berhasil dihapus',
            });
            response.code(200);
            return response;
        } catch (error) {
            if (error instanceof ClientError){
                const response = h.response({
                    status: 'fail',
                    message: error.message,
                });
                response.code(error.statusCode);
                return response;
            }

            //Server Error
            const response = h.response({
                status: 'fail',
                message: 'Maaf, terjadi kegagalan pada server kami.',
            });
            response.code(500);
            console.error(error);
            return response;
        }
    }
}

module.exports = SongHandler;

// const addSongHandler = (request, h) => {
//     const { title = 'untitled', year, genre, performer, duration, albumId } = request.payload;

//     const id = nanoid(16);
//     const song_id = `song-${id}`;
//     const createdAt = new Date().toISOString();
//     const updatedAt = createdAt;

//     const newSong = {
//         title, year, genre, performer, duration, albumId, song_id, createdAt, updatedAt,
//     };

//     songs.push(newSong);

//     const isSuccess = songs.filter((song) => song.song_id === song_id).length > 0;

//     if (isSuccess){
//         const response = h.response({
//             status: 'success',
//             data: {
//                 songId: song_id
//             }
//         });
//         response.code(201);
//         return response;
//     }

//     const response = h.response({
//         status: 'fail',
//         message: `Lagu gagal ditambahkan ${isSuccess}`,
//     });
//     response.code(500);
//     return response;
// };

// const getAllSongsHandler = (request, h) => {
    
//     const isSuccess = songs.filter((song) => song.song_id).length > 0;
//     if (isSuccess){
//         const response = h.response({
//             status: 'success',
//             data: {
//                 songs
//             }
//         });
//         response.code(200);
//         return response;
//     }
    
//     const response = h.response({
//         status : 'fail',
//         message : 'Lagu tidak tersedia'
//     });
//     response.code(404);
//     return response;
// }

// const getSongByIdHandler = (request, h) => {
//     const { song_id } = request.params;

//     const song = songs.filter((n) => n.song_id === song_id)[0];

//     if (song !== undefined){
//         const response = h.response({
//             status: 'success',
//             data: {
//                 song : {
//                     "id" : song.album_id,
//                     "title" : song.title,
//                     "year" : song.year,
//                     "performer" : song.performer,
//                     "genre" : song.genre,
//                     "duration" : song.duration,
//                     "albumId" : song.albumId,
//                 }
//             }
//         });
//         response.code(200);
//         return response;
//     }

//     const response = h.response({
//         status: 'fail',
//         message: 'Lagu tidak ditemukan',
//     });
//     response.code(404);
//     return response;
// };

// const editSongByIdHandler = (request, h) => {
//     const { song_id } = request.params;

//     const { title, year, genre, performer, duration, albumId } = request.payload;
//     const updatedAt = new Date().toISOString();

//     const index = songs.findIndex((song) => song.song_id === song_id);

//     if (index !== -1){
//         songs[index] = {
//             ...songs[index],
//             title,
//             year,
//             genre,
//             performer,
//             duration,
//             albumId,
//             updatedAt,
//         };

//         const response = h.response({
//             status : 'success',
//             message : 'Lagu berhasil diperbarui',
//         });
//         response.code(200);
//         return response;
//     }

//     const response = h.response({
//         status : 'fail',
//         message : 'Gagal memperbarui lagu. Id tidak ditemukan',
//     });
//     response.code(404);
//     return response;
// };

// const deleteSongByIdHandler = (request, h) => {
//     const { song_id } = request.params;

//     const index = songs.findIndex((song) => song.song_id === song_id);

//     if (index !== -1){
//         songs.splice(index, 1);
//         const response = h.response({
//             status : 'success',
//             message : 'Lagu berhasil dihapus',
//         });
//         response.code(200);
//         return response;
//     }

//     const response = h.response({
//         status : 'fail',
//         message : 'Lagu gagal dihapus. Id tidak ditemukan',
//     });
//     response.code(404);
//     return response;
// }

// module.exports = {
//     addSongHandler,
//     getAllSongsHandler,
//     getSongByIdHandler,
//     editSongByIdHandler,
//     deleteSongByIdHandler
// }