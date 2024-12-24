export const requestPasswordRecoverSubject = '📬 Sua solicitação de redefinição de senha do Easy Finance';
export const requestPasswordRecoverBody = ({ token }) => `<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinição de Senha</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
        }
        .container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
            overflow: hidden;
        }
        .header {
            background-color: #4CAF50;
            padding: 20px;
            text-align: center;
            color: #ffffff;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content p {
            font-size: 16px;
            line-height: 1.5;
            color: #333333;
        }
        .cta-button {
            display: inline-block;
            padding: 12px 20px;
            margin-top: 20px;
            color: #ffffff;
            background-color: #4CAF50;
            text-decoration: none;
            font-size: 16px;
            border-radius: 4px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .cta-button:hover {
            background-color: #45a049;
        }
        .footer {
            background-color: #f1f1f1;
            color: #666666;
            padding: 10px;
            font-size: 12px;
            text-align: center;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Troque sua senha</h1>
        </div>
        <div class="content">
            <p>Olá,</p>
            <p>Recebemos uma solicitação para redefinir a senha da sua conta no Easy Finance.</p>
            <p>Se você não fez essa solicitação, ignore este e-mail. Caso contrário, clique no botão abaixo para continuar:</p>
            <a href="${process.env.WEB_URL}/auth/reset-password/${token}" class="cta-button">Redefinir minha senha</a>
            <p>Por motivos de segurança, o link expira em 24 horas.</p>
        </div>
        <div class="footer">
            <p>Precisa de ajuda? <a href="mailto:support@easyfinance.com">Entre em contato conosco</a>.</p>
            <p>&copy; 2024 Easy Finance. Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>
`;
