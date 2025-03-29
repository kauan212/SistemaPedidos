const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

// Middleware para habilitar CORS
app.use(cors());

// Middleware para analisar os dados do corpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configurar o transporte de e-mail (usando o Gmail como exemplo)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kauanoliveiradesouza2016@gmail.com',  // Seu e-mail
        pass: 'srfc acth ccgd pjzt'  // Senha de aplicativo gerada
    },
    tls: {
        rejectUnauthorized: false  // Desativa verificação de certificado (ajuda a evitar alguns erros de SSL)
    }
});

// Rota para receber os pedidos
app.post('/enviar-pedido', (req, res) => {
    const {
        revendedor,
        produto1, produto2, produto3, produto4, produto5, produto6, produto7, produto8
    } = req.body;

    const mailOptions = {
        from: 'kauanoliveiradesouza2016@gmail.com',
        to: 'kauanoliveiradesouza2016@gmail.com',  // Seu e-mail de destino
        subject: 'Novo Pedido Recebido',
        text: `Pedido recebido de ${revendedor}:\n
Brigadeiro: ${produto1} unidades\n
Beijinho: ${produto2} unidades\n
Paçoca: ${produto3} unidades\n
Pé de Moça: ${produto4} unidades\n
Casadinho: ${produto5} unidades\n
Olho de Sogra: ${produto6} unidades\n
Cajuzinho: ${produto7} unidades\n
Coco Queimado: ${produto8} unidades`
    };

    // Enviar o e-mail
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Erro ao enviar o e-mail:', error);
            return res.status(500).json({ status: 'error', message: 'Erro ao enviar o e-mail.' });
        }
        console.log('E-mail enviado:', info);
        res.status(200).json({ status: 'success', message: 'Pedido enviado com sucesso!' });
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
