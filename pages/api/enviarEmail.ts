import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ mensagem: "Metodo nao permitido." });
  }

  const { nome, email, telefone, assunto, mensagem } = req.body;
  const { EMAIL_HOST, EMAIL_PORT, EMAIL_SECURE, EMAIL_USER, EMAIL_PASS, EMAIL_TO } =
    process.env;
  const nomeRemetente = String(nome).replace(/[\r\n]/g, "").trim();
  const emailRemetente = String(email).replace(/[\r\n]/g, "").trim();

  if (!nome || !email || !mensagem) {
    return res.status(400).json({ mensagem: "Preencha os campos obrigatorios." });
  }

  if (
    !EMAIL_HOST ||
    !EMAIL_PORT ||
    !EMAIL_USER ||
    !EMAIL_PASS ||
    !EMAIL_TO ||
    EMAIL_PASS === "senha-ou-app-password"
  ) {
    return res.status(500).json({ mensagem: "Credenciais de email nao configuradas." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: EMAIL_HOST,
      port: Number(EMAIL_PORT),
      secure: EMAIL_SECURE === "true",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${nomeRemetente} pelo site" <${EMAIL_USER}>`,
      to: EMAIL_TO,
      replyTo: `"${nomeRemetente}" <${emailRemetente}>`,
      subject: assunto || `Novo contato de ${nomeRemetente}`,
      html: `
        <h2>Novo contato pelo site</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Telefone:</strong> ${telefone || "Nao informado"}</p>
        <p><strong>Assunto:</strong> ${assunto || "Nao informado"}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${mensagem}</p>
      `,
    });

    return res.status(200).json({ mensagem: "Email enviado com sucesso." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ mensagem: "Erro ao enviar email." });
  }
}
