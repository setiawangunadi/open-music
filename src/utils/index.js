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

module.exports = { mapAlbumToModel };