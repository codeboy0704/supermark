import fs from 'fs'
import path from 'path'
import Image from './image.model';

export const saveBinaryImg = async (req, res, next) => {
    try {
        const inputFolder = "./SRC/image/compressed_images"
        const files = fs.readdirSync(inputFolder)
        files.forEach(async img => {
            const imageRoute = path.join(inputFolder, img)
            const binaryImage = fs.readFileSync(imageRoute)
            const contentType = "image/jpeg"
            const imageTitle = img.split('.jpeg')[0];

            const newImage = new Image({
                title: imageTitle,
                image: binaryImage,
                contentType: contentType
            })

            await newImage.save();
        })
        res.status(201).json({ data: "Imagenes guardadas correctamente" })
    } catch (e) {
        next(e)
    }
}

export const getBinaryImg = async (req, res, next) => {
    const imageTitle = req.params.title;
    try {
        const img = await Image.findOne({ title: imageTitle })
        if (!img) {
            return res.status(404).json({ data: "Imagen no encontrada" })
        }

        res.contentType('image/jpeg')
        res.status(201).json({ data: img.image })
    } catch (e) {
        next(e)
    }
}

export const getImage = async (req, res, next) => {
    try {
        const images = await Image.find({})
        return res.status(200).json({ data: images })
    } catch (e) {
        next(e)
    }
}