
import express from "express";
import { readFile, promises } from "fs";

const dataSource = './data/list.txt'


const router = express.Router();

router.post('/contato', async (req, res) => {
    const {name} = req.body;

    if (!name || name.length < 2  ) {
         res.json({error: 'Nome é obrigatório'});  
         return ;
    }

    let list: string[] = [];
    try {
        const data = await promises.readFile(dataSource, 'utf8');
        list = data.split('\n');
    } catch (err) {
        console.error(err);
    }

    list.push(name);

    await promises.writeFile(dataSource, list.join('\n'));


    res.status(201).json ({contato: name})

} );

export default router;
