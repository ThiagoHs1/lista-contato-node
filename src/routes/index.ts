
import express from "express";


const router = express.Router();

router.post('/contato', (req, res) => {
    const {name} = req.body;

    if (!name || name.length < 2  ) {
         res.json({error: 'Nome é obrigatório'});  
         return ;
    }

    res.status(201).json ({contato: name})

} );

export default router;