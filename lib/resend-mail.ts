import { EmailLinkTemplate, EmailTemplate } from '@/components/email-template';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const resendVerificationToken = async (msg: string, email: string) => {
  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: [email],
    subject: 'Email verification',
    react: EmailTemplate({ msg }),
  });

  if (error) {
    return Response.json({ error }, { status: 500 });
  }
  return Response.json({ data });
};

export const resendResetPasswordToken = async (token: string, email: string) => {

    const link = `http://localhost:3000/auth/reset-password?token=${token}`;

    const { data, error } = await resend.emails.send({
        from: 'Acme <onboarding@resend.dev>',
        to: [email],
        subject: 'Email verification',
        react: EmailLinkTemplate({ link }),
    });

    if (error) {
        return Response.json({ error }, { status: 500 });
    }
    return Response.json({ data });
};
