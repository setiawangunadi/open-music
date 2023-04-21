// const { handler } = require('@hapi/hapi/lib/cors');
// const {addSongHandler,
//     getAllSongsHandler,
//     getSongByIdHandler,
//     editSongByIdHandler,
//     deleteSongByIdHandler,} = require('./handler');

const routes = (handler) => [
    {
        method: 'POST',
        path: '/songs',
        handler: handler.postSongHandler,
    },
    {
        method: 'GET',
        path: '/songs',
        handler: handler.getAllSongHandler,
    },
    {
        method: 'GET',
        path: '/songs/{song_id}',
        handler: handler.getSongByIdHandler,
    },
    {
        method: 'PUT',
        path: '/songs/{song_id}',
        handler: handler.putSongByIdHadler,
    },
    {
        method: 'DELETE',
        path: '/songs/{song_id}',
        handler: handler.deleteSongByIdHandler,
    }

];

module.exports = routes;