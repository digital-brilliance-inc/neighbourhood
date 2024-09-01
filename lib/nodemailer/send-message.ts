'use server';
import { createTransport } from 'nodemailer';
import { Theme } from '@auth/core/types';
import { NodemailerConfig } from 'next-auth/providers/nodemailer';
import mjml2html from 'mjml';

const server: any = {
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
};

export async function sendEmailMessage({
  toEmail,
  fromEmail,
  fromName,
  message,
  context,
  subject,
}: {
  toEmail: string;
  fromEmail: string;
  fromName: string;
  message: string;
  context: string;
  subject: string;
}) {
  const transport = createTransport(server);
  await transport.sendMail({
    to: toEmail,
    from: 'hello@milton.church',
    replyTo: fromEmail,
    subject: subject || `Connection request from Milton.Church`,
    html: toHtml({ fromName, fromEmail, message, subject, context }),
  });
}

function toHtml({
  fromName,
  fromEmail,
  message,
  subject,
  context,
}: Record<'fromName' | 'fromEmail' | 'message' | 'subject' | 'context', string>) {
  return mjml2html(`
  <mjml>
    <mj-head>
      <mj-attributes>
        <mj-font name="Inter" href="https://fonts.googleapis.com/css?family=Inter"/>
        <mj-all font-family="Inter" align="center" font-size="16px" line-height="140%"/>
        <mj-class name="title" font-size="24px" font-weight="700"/>
        <mj-class name="body" padding-top="24px" padding-bottom="24px"/>
      </mj-attributes>
    </mj-head>
    <mj-body>
      <mj-section>
        <mj-column >
          <mj-image width="40" src="https://milton.church/litn-logo.png"/>
          <mj-text mj-class="title">
            Milton.Church
          </mj-text>
          <mj-text mj-class="body">
            <div style="font-weight: 600; margin-bottom: 8px">The following message was sent from ${fromName} (${fromEmail})</div>
            <div style="font-weight: 600; margin-bottom: 16px">Re: ${context}</div>
            <div style="font-family: monospace; margin-bottom: 8px; padding: 24px; background-color: #e9e9e9; border-radius: 4px; text-align: left; font-size: 14px">${message.replaceAll(
              '\r\n',
              '<br>',
            )}</div>
          </mj-text>
          <mj-button href="mailto:${fromEmail}?subject=Re: ${
    subject || 'Connection request on Milton.Church'
  }&body=%0D%0A%0D%0A-------------%0D%0ASent by ${fromName}:%0D%0A${message.replaceAll(
    '\r\n',
    '%0D%0A',
  )}" target="_blank" border-radius="100px" background-color="#327ABD" color="#FFFFFF" padding="8px 32px" font-size="16px" font-weight="700">Reply to ${fromName}</mj-button>
          
        </mj-column>
      </mj-section>
    </mj-body>
  </mjml>
`).html;
}

// Email Text body (fallback for email clients that don't render HTML, e.g. feature phones)
function text({ url, host }: Record<'url' | 'host', string>) {
  return `Sign in to ${host}\n${url}\n\n`;
}
