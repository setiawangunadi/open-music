const Hapi = require('@hapi/hapi');
// const routes = require('./api/song/routes');

const albums = require('./api/album');
const AlbumsService = require('./services/inMemory/AlbumsService');

const songs = require('./api/song');
const SongsService = require('./services/inMemory/SongsService');

const init = async () => {
    const albumsService = new AlbumsService();
    const songsService = new SongsService();

    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
        cors: {
            origin: ['*'],
        },
        },
    });

//   server.route(routes);
    await server.register([
        {
            plugin: albums,
            options: {
                service: albumsService
            }
        },
        {
            plugin: songs,
            options: {
                service: songsService
            }
        }
    ]);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
