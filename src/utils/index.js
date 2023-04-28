const mapAlbumToModel = ({
    album_id,
    name,
    year,
    created_at,
    updated_at
}) => ({
    album_id,
    name,
    year,
    createdAt: created_at,
    updatedAt: updated_at,
});

const mapSongToModel = ({
    song_id,
    title,
    year,
    genre,
    performer,
    duration,
    album_id,
    created_at,
    updated_at
}) => ({
    song_id,
    title,
    year,
    genre,
    performer,
    duration,
    albumId : album_id,
    createdAt: created_at,
    updatedAt: updated_at,
});

const mapDBToModel = ({ song_id, title, performer }) => ({
    id : song_id,
    title,
    performer,
});

module.exports = { mapAlbumToModel, mapSongToModel, mapDBToModel };