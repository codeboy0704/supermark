const sharp = require('sharp');
const fs = require('fs')
const path = require('path');

const inputFolder = './SRC/image/images';
const outputFolder = './SRC/image/compressed_images';

if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

if (!fs.readdirSync(outputFolder).length === 0) {
    console.log(`La carpeta ${outputFolder} ya cuenta con contenido`);
    return;
}

fs.readdir(inputFolder, (err, files) => {
    if (err) {
        console.error('Error al leer la carpeta de imágenes:', err);
        return;
    }

    files.forEach((file) => {
        const inputFile = path.join(inputFolder, file);
        const outputFile = path.join(outputFolder, `${path.parse(file).name}.jpeg`);

        sharp(inputFile)
            .jpeg({ quality: 75 })
            .toFile(outputFile)
            .then(() => {
                console.log(`Imagen comprimida y guardada en: ${outputFile}`);
            })
            .catch((err) => {
                console.error('Error al comprimir la imagen:', err);
            });
    });
});