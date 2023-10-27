const router = require('express').Router();
const File = require("../models/file")
router.get('/:uuid' , async(req, res)=>{
    // get the uuid from params and query db for user with that uuid

    try{

        const file = await File.findOne({uuid: req.params.uuid});
        if(!file){
            return res.status(404).json({err:"Link has been expired"})
        }

        

        return res.json({
            uuid:file.uuid,
            filename:file.filename,
            filesize:file.size,
            link: `${process.env.APP_BASE_URL}/uploads/${file.filename}`
        })
    }
   catch (e) {
    console.log(e)
   }

})

module.exports = router;