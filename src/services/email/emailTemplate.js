export const userActivationUrlEmailTemplate = ({ email, name, url }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Action Required - Activate your new account",
    text: `Hello ${name}, follow the link to activate your account. url: `, // plain‑text body
    html: `
       <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Hello ${name},</p>

        <p>Your account has been created. Click the button below to activate your account:</p>

        <p>
          <a 
            href="${url}" 
            style="
              display: inline-block;
              background-color: green;
              color: white;
              padding: 0.75rem 1.5rem;
              text-decoration: none;
              border-radius: 5px;
              font-weight: bold;
            "
          >
            Activate Now
          </a>
        </p>

        <p>If the button above doesn't work, please copy and paste the following link into your browser:</p>
        <p><a href="${url}">${url}</a></p>

        <p>Regards,<br/>Local Library Team</p>
      </div>
    `, // HTML body
  };
};
