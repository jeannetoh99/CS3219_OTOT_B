import axios from 'axios';

const getPhotos = async (req, res) => {
    const albumId = req.query.albumId;
    const { data } = await axios.get(
        "http://jsonplaceholder.typicode.com/photos",
        { params: { albumId } }
    )
    res.json(data);
};

const getPhotoById = async (req, res) => {
    const { data } = await axios.get(
        `http://jsonplaceholder.typicode.com/photos/${req.param.id}`,
    )
    res.json(data);
};

module.exports = {
    getPhotos,
    getPhotoById,
};
