import express from "express";
import { getAllMints, getAllSells } from "./api/api.js";

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Servidor escutando na porta ${port}`);
});

// Rota para obter todas as mints
app.get('/mint/:address', async (req, res) => {
    const address = req.params.address;
    try {
        const result = await getAllMints(address);
        res.json(result);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Ocorreu um erro ao buscar as mints.' });
    }
});

app.get('/sales/:address', async (req, res) => {
    const address = req.params.address;
    try {
        const result = await getAllSells(address);
        res.json(result)
        
    } catch (e) {
        console.log(e);
        res.status(500).json({ error: 'Ocorreu um erro ao buscar as vendas.' });
    }


})
