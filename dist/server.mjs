import express from 'express';
import cors from 'cors';
import * as path from "node:path";
import bodyParser from 'body-parser'
import AIEngine from '../dist/app/ai-engine.js';
import multer from 'multer';

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(process.cwd()));


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'tests/csv_files/');
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const baseName = path.basename(file.originalname, ext);
        const fileName = `${baseName}${ext}`;
        cb(null, fileName);
    }
})

const upload = multer({ storage })

app.post('/', upload.single('csvfile'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Select CSV file to upload ' });
    }

    let ai_engine = new AIEngine();
    if (res.statusCode == 200) {
        console.log(req.body.testType)
        if (req.body.testType == 'Web') {
            ai_engine.web_spec_creator(req.file.originalname)
        }
        if (req.body.testType == 'API') {
            ai_engine.api_spec_creator(req.file.originalname)
        }
        return res.json({ success: 'CSV file has been upload to tests/csv-files/ folder and spec file has been generated' });
    }
})

app.listen('5500', () => {
    console.log('Server is running on https://localhost:5500');
})