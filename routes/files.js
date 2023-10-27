const router = require('express').Router();
const multer = require('multer');
const path = require('path');
const File = require('../models/file')
const { v4: uuid4 } = require('uuid')
const bodyParser = require('body-parser')

router.use(
    bodyParser.json()
);

router.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../uploads')
    },

    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

let upload = multer({ storage: storage });

// router.use(upload.single);

router.use(bodyParser.urlencoded({ extended: false }))
router.post("/", upload.single('myfile'), async (req, res) => {


    if (!req.file) {

        return res.json({ error: "All fields are required! " })
    }

    const file = new File({
        filename: req.file.filename,
        uuid: uuid4(),
        path: req.file.path,
        size: req.file.size
    })

    const response = await file.save();
    return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` })



})

module.exports = router;