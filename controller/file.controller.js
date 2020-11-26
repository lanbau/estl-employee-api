const uploadSingle = (req, res) => {
    try {
        if(!req.files) {
            res.send({
                status: false,
                message: 'No file uploaded'
            });
        } else {
            //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
            let csvFile = req.files.csvFile;
            
            //Use the mv() method to place the file in upload directory (i.e. "uploads")
            csvFile.mv('./uploads/' + csvFile.name);

            //send response
            res.send({
                status: true,
                message: 'File is uploaded',
                data: {
                    name: csvFile.name,
                    size: csvFile.size
                }
            });
        }
    } catch (err) {
        console.log(err)
        res.status(500).send(err);
    }
}

module.exports = {
  uploadSingle
};