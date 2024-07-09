import multiparty from 'multiparty';
import S3 from 'aws-sdk/clients/s3';
import { ProcessCredentials } from 'aws-sdk';
import fs from 'fs';

export default function handle(req, res){

    const s3Client = new S3({
        region: 'ap-southeast-2',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        }
    })


    const form = new multiparty.Form({
        uploadDir: '.public'
    });
    form.parse(req, async(err, fields, files) =>{
        if(err){
            throw err;
        }

        const fileInfo = files['cover'][0];
        const filename = fileInfo.path.split('/')[1];

        s3Client.upload({
            Bucket:'josh-twitter-clone',
            Body: fs.readFileSync(fileInfo.path),
            ACL: 'public-read',
            Key: filename,
            ContentType: fileInfo.headers['content-type'],
        })
        res.json(files);
    })
}

export const config = {
    api: {
        bodyParser : false
    }
};