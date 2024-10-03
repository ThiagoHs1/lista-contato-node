
import express from "express";
import {  promises } from "fs";
import { createContact, deleteContact, getContacts } from "../services/contact";

const dataSource = './data/list.txt'


const router = express.Router();

router.post('/contato', async (req, res) => {
    const {name} = req.body;

    if (!name || name.length < 2  ) {
         res.json({error: 'Nome é obrigatório'});  
         return ;
    }

    await createContact(name);

    res.status(201).json ({contato: name})

} );

router.get('/contatos', async (req, res) => {

    let list = await getContacts();

    res.json({contatos: list});

});

router.delete('/contato', async (req, res) => {

    const {name} = req.query;
    if (!name) {
        res.status(400).json({error: 'Nome é obrigatório'});
        return;
    }

    await deleteContact(name as string   );
 
    res.json({ contato: name });


  
});

export default router
