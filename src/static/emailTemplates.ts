/* eslint-disable max-len */
export class EmailTemplates {
  static emailVerification({ name = '', verificationCode }) {
    const subject = `Verify your email`;
    const html = `
    <div>
      <p>Hi ${name},</p>
      <p>
      As you requested to verify your email, we have sent you verification code here. Please copy below code to verify your email.
      </p>

      <h4>${verificationCode}</h4>
    </div>
    `;

    return {
      subject,
      html,
    };
  }

  static resetPassword({ name = '', verificationCode }) {
    const subject = `Password reset link.`;
    const html = `
    <div>
      <p>Hi ${name},</p>
      <p>
      Code to reset the password.
      </p>

      <h4>${verificationCode}</h4>
    </div>
    `;

    return {
      subject,
      html,
    };
  }
}
