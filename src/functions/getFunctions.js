const getFunctions = {

    generateTimestamp: function () {
        const objectDate = new Date();
        const year = objectDate.getUTCFullYear();
        const month = (objectDate.getUTCMonth() + 1).toString().padStart(2, '0');
        const day = objectDate.getUTCDate().toString().padStart(2, '0');
        const hours = objectDate.getUTCHours().toString().padStart(2, '0');
        const minutes = objectDate.getUTCMinutes().toString().padStart(2, '0');
        const seconds = objectDate.getUTCSeconds().toString().padStart(2, '0');

        const format = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        return format;
    }

}

export default getFunctions;