
import { Resend } from 'resend';
import HandlebarsMailTemplate from 'src/config/HandlebarsMailTemplate';
import mail from 'src/config/mail';
import { AppError } from 'src/shared/errors/AppError';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

interface ISendMail {
  to: string;
  from?: string;
  subject: string;
  templateData: IParseMailTemplate;
}

const resend = new Resend(mail.config.secret);

export default class ResendMail {
  public async sendMail({ to, from, subject, templateData }: ISendMail): Promise<void> {
    const mailTemplate = new HandlebarsMailTemplate();

    const { error } = await resend.emails.send({
      from: from || 'Find a Friend <thiago@thikachi.dev.br>',
      to,
      subject,
      html: await mailTemplate.parse(templateData),
    });

    if (error) {
      throw new AppError(error.message);
    }
  }
}
