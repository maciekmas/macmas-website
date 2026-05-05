import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Walidacja
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Wszystkie pola są wymagane.' },
        { status: 400 }
      );
    }

    // Prosta walidacja email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: 'Podaj prawidłowy adres e-mail.' },
        { status: 400 }
      );
    }

    // Konfiguracja transportu SMTP (Gmail)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Wyślij maila
    await transporter.sendMail({
      from: `"Formularz MACMAS" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `Nowa wiadomość od ${name} – macmas.pl`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #D30000;">Nowa wiadomość z formularza kontaktowego</h2>
          <hr style="border: 1px solid #eee;" />
          <p><strong>Imię:</strong> ${name}</p>
          <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Wiadomość:</strong></p>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
            <p>${message.replace(/\n/g, '<br>')}</p>
          </div>
          <hr style="border: 1px solid #eee; margin-top: 30px;" />
          <p style="color: #999; font-size: 12px;">Wysłano z formularza na macmas.pl</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Błąd wysyłki maila:', error);
    return NextResponse.json(
      { error: 'Nie udało się wysłać wiadomości. Spróbuj ponownie później.' },
      { status: 500 }
    );
  }
}
