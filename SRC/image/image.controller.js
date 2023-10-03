import fs from 'fs'
import path from 'path'
import Image from './image.model';
import Product from '../products/Products';
import capitalize from '../utils/capitalize';

export const saveImage = async (req, res, next) => {
    const inputFolder = "./SRC/image/compressed_images"
    try {
        const files = fs.readdirSync(inputFolder)
        files.forEach(async img => {
            let imageName = img.split('.jpeg')[0];
            let restructName = imageName.replace(/_/g, " ")
            let capitalizeName = capitalize(restructName)
            const imageRoute = path.join(inputFolder, `${imageName}.jpeg`)
            const binaryImage = fs.readFileSync(imageRoute)
            const productsData = await Product.find({}, { name: 1 }).exec()
            const equal = productsData.find(product => product.name.toLowerCase() == capitalizeName.toLowerCase())
            const similar = productsData.find(product => product.name.toLowerCase().includes(capitalizeName.toLowerCase()))
            if (equal.image) {
                const image = Image.findById(equal.image)
                return res.status(400).json({ data: { message: "Imagen ya almacenada", img: image } })
            } else if (similar.image) {
                const image = Image.findById(similar.image)
                return res.status(400).json({ data: { message: "Imagen ya almacenada", img: image } })
            }
            if (equal) {
                const img = new Image({
                    title: capitalizeName,
                    image: binaryImage,
                    productID: equal._id
                })
                await img.save()
                const updatedProduct = await Product.findByIdAndUpdate(equal._id, { image: img._id })
                return res.status(201).json({ data: { "Image": img, "Product": updatedProduct } })
            } else if (similar) {
                const img = new Image({
                    title: capitalizeName,
                    image: binaryImage,
                    productID: similar._id
                })
                await img.save()
                const updatedProduct = await Product.findByIdAndUpdate(similar._id, { image: img._id })
                return res.status(201).json({ data: { "Image": img, "Product": updatedProduct } })
            } else {
                const img = new Image({
                    title: capitalizeName,
                    image: binaryImage,
                })
                await img.save()
                return res.status(201).json({ data: img })
            }
        })
    } catch (e) {
        next(e)
    }
}

export const getBinaryImg = async (req, res, next) => {
    const imageId = req.params.id;
    try {
        const img = await Image.findById(imageId)
        if (!img) {
            res.status(404).json({ data: img })
            return
        }
        const imageData = img.image
        res.contentType('image/jpeg');
        res.send(imageData);
    } catch (e) {
        next(e)
    }
}

export const getOne = async (req, res, next) => {
    const { id } = req.params
    try {
        const image = await Image.findOne({ _id: id }).exec()
        if (!image) {
            return res.status(404).json({ data: "Imagen no encontarda" })
        }
        return res.status(200).json({ data: image })

    } catch (e) {
        next(e)
    }
}

export const getMany = async (req, res, next) => {
    try {
        const images = await Image.find({}).exec()
        return res.status(200).json({ data: images })
    } catch (e) {
        next(e)
    }
}