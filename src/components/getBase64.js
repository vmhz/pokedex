const getBase64 = async (url, maxSizeMB = 3) => {
    const save = (blob) =>
        new Promise((resolve, reject) => {
            maxSizeMB = Number(maxSizeMB) * 10000

            if (blob.size > maxSizeMB) {
                throw ({
                    saved: false,
                    msj: 'The file exceeds the size limit',
                    size: blob.size
                });
            }
            let fileReader = new FileReader();

            fileReader.addEventListener('load', function (evt) {
                resolve({
                    saved: true,
                    msj: 'Success',
                    data: fileReader.result
                })
            });
            fileReader.readAsDataURL(blob);
        })

    try {
        const res = await fetch(url);
        const blob = await res.blob();
        return save(blob);
    } catch (err) {
        return console.log(err);
    }
}
export default getBase64