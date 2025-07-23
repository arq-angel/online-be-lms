export const userActivationUrlEmailTemplate = ({ email, name, url }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Action Required - Activate your new account",
    text: `Hello ${name}, follow the link to activate your account. url: ${url}`, // plain‑text body
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

export const userAccountActivatedNotificaionEmail = ({ email, name }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Your account is now active",
    text: `Hello ${name}, your account is ready to use. You may go and sign in now.`, // plain‑text body
    html: `
       <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Hello ${name},</p>

        <p>Your account is ready to use. You may go and sign in now.</p>

        <p>Regards,<br/>Local Library Team</p>
      </div>
    `, // HTML body
  };
};

export const passwordResetOTPSendTemplate = ({ email, name, otp }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Your OTP to reset the password",
    text: `Dear ${name}, Here is your OTP to reset the password. This OTP will expire in 15 min. OTP is ${otp}.`, // plain‑text body
    html: `
       <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Dear ${name},</p>

        <p>Here is your OTP to reset the password. This OTP will expire in 15 min. </p>
        <p>OTP is ${otp}.</p>

        <p>Regards,<br/>Local Library Team</p>
      </div>
    `, // HTML body
  };
};

export const userProfileUpdatedNotificationTemplate = ({ email, name }) => {
  return {
    from: `"Local Library" <${process.env.SMTP_EMAIL}>`,
    to: email,
    subject: "Your account has been updated",
    text: `Dear ${name}, Your account has been just updated, if this wasn't you, change your password and contact us.`, // plain‑text body
    html: `
       <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p>Dear ${name},</p>

        <p>Your account has been just updated, if this wasn't you, change your password and contact us.</p>

        <p>Regards,<br/>Local Library Team</p>
      </div>
    `, // HTML body
  };
};
