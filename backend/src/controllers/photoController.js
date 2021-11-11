const axios = require('axios');
const Redis = require('redis');

const redisClient = Redis.createClient();

const DEFAULT_EXPIRATION = 3600

const getPhotos = async (req, res) => {
    const albumId = req.query.albumId;

    const photos = await getOrSetCache(`photos?albumId=${albumId}`, () => {
        const { data } = await axios.get(
            "http://jsonplaceholder.typicode.com/photos",
            { params: { albumId } }
        );
        return data;
    })

    res.json(photos);
};

const getPhotoById = async (req, res) => {


    const { data } = await axios.get(
        `http://jsonplaceholder.typicode.com/photos/${req.param.id}`,
    )
    res.json(data);
};

const getOrSetCache = (key, callback) => {
    return new Promise ((resolve, reject) => {
        redisClient.get(key, (error, data) => {
            if (error) return reject(error);
            if (Data !== null) return resolve(JSON.parse(data));
            const freshData = await callback();
            redisClient.setex(key, DEFAULT_EXPIRATION, JSON.stringify(freshData));
            resolve(freshData)
        })
    })
}

module.exports = {
    getPhotos,
    getPhotoById,
};
