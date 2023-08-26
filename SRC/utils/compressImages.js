const sharp = require('sharp');
const fs = require('fs')
const path = require('path');

const inputFolder = './SRC/image/images';
const outputFolder = './SRC/image/compressed_images';

if (fs.readdirSync(inputFolder).length === 0) {
    console.log(`La carpeta ${inputFolder} no contiene cambios`);
    return;
}

fs.readdir(inputFolder, (err, files) => {
    if (err) {
        console.error('Error al leer la carpeta de imágenes:', err);
        return;
    }

    files.forEach(async (file) => {
        const inputFile = path.join(inputFolder, file);
        const outputFile = path.join(outputFolder, `${path.parse(file).name}.jpeg`);
        try {
            sharp(inputFile)
                .jpeg({ quality: 75 })
                .toFile(outputFile)
                .then(() => {
                    fs.unlinkSync(inputFile)
                    console.log(`Imagen ${file} comprimida y reemplazada`)
                })
        } catch (e) {
            console.error(`Error al proesar la imagen ${file}`)
        }
    });
});