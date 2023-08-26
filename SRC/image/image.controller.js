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