const uploadFile = require("../middleware/upload");

const upload = async (req, res) => {
    console.log(req.file)
  try {
    await uploadFile(req, res);

    if (req.file == undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }

    res.status(200).send({
      message: "Uploaded the file successfully: " + req.file.originalname,
    });
  } catch (err) {
    res.status(500).send({
      message: `Could not upload the file: ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  fs.readdir(directoryPath, function (err, files) {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }

    let fileInfos = [];

    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: baseUrl + file,
      });
    });

    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = __basedir + "/resources/static/assets/uploads/";

  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

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
  upload,
  getListFiles,
  download,
  uploadSingle
};