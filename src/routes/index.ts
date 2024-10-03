
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

router.get('/contatos', async (req, res) => {

    let list: string[] = [];
    try {
        const data = await promises.readFile(dataSource, 'utf8');
        list = data.split('\n');
    } catch (err) {
        console.error(err);
    }

    res.json({contatos: list});

});

router.delete('/contato', async (req, res) => {

    const {name} = req.query;
    if (!name) {
        res.status(400).json({error: 'Nome é obrigatório'});
        return;
    }

    let list: string[] = [];
    try {
        const data = await promises.readFile(dataSource, 'utf8');
        list = data.split('\n');
    } catch (err) {
        console.error(err);
    }

    list = list.filter(item => item.toLowerCase() !== (name as string).toLowerCase());

    await promises.writeFile(dataSource, list.join('\n'));

    res.json({ contato: name });


  
});

export default router
