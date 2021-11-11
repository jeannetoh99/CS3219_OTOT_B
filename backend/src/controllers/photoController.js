const axios = require('axios');
const Redis = require('redis');

const redisClient = Redis.createClient();

const DEFAULT_EXPIRATION = 3600

const getPhotos = async (req, res) => {
    const albumId = req.query.albumId;
    redisClient.get('photos', async (error, photos) => {
        if (error) console.error(error)
        if (photos != null) {
            console.log('Cache Hit');
            return res.json(JSON.parse(photos));
        } else {
            console.log('Cache Miss');
            const { data } = await axios.get(
                "http://jsonplaceholder.typicode.com/photos",
                { params: { albumId } }
            )
            redisClient.setex('photos', DEFAULT_EXPIRATION, JSON.stringify(data));
            return res.json(data);
        }
    })

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
