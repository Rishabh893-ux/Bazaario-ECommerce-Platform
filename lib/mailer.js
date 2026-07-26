import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Sends an order confirmation email to the user using Resend.
 */
export async function sendOrderConfirmationEmail(userEmail, userName, orderId, totalAmount) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is missing. Email receipt will not be sent.");
    return;
  }

  const shortOrderId = orderId.slice(-6).toUpperCase();

  const htmlTemplate = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FDFBF7; padding: 40px 20px; color: #2C2420;">
      <div style="max-w: 500px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(44, 36, 32, 0.05);">
        
        <!-- Logo Area -->
        <h1 style="font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 30px; letter-spacing: -0.5px;">
          Vendly<span style="color: #459A59;">.</span>
        </h1>
        
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 20px; border-bottom: 2px solid #EAE1DB; padding-bottom: 15px;">
          Receipt for Order #${shortOrderId}
        </h2>
        
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
          Hi ${userName},
        </p>
        
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
          Thank you for shopping small! Your payment of <strong style="color: #E85D4E; font-size: 18px;">$${totalAmount.toFixed(2)}</strong> has been successfully processed, and the independent sellers are preparing your items for shipment.
        </p>
        
        <div style="background-color: #FDFBF7; border-radius: 8px; padding: 20px; text-align: center; margin-bottom: 30px;">
          <p style="margin: 0; font-size: 14px; color: rgba(44, 36, 32, 0.6);">Order Tracking Number</p>
          <p style="margin: 5px 0 0 0; font-size: 20px; font-weight: 700; letter-spacing: 2px;">${shortOrderId}</p>
        </div>
        
        <p style="font-size: 14px; line-height: 1.5; color: rgba(44, 36, 32, 0.6); text-align: center; margin-bottom: 0;">
          You can track the status of your order at any time by logging into your Vendly dashboard.
        </p>
        
      </div>
      <p style="font-size: 12px; color: rgba(44, 36, 32, 0.4); text-align: center; margin-top: 30px;">
        © ${new Date().getFullYear()} Vendly. Supporting independent sellers worldwide.
      </p>
    </div>
  `;

  try {
    // Note: When testing locally without a verified domain, use onboarding@resend.dev
    const data = await resend.emails.send({
      from: 'Vendly Store <onboarding@resend.dev>',
      to: userEmail,
      subject: `Order Confirmation - Vendly #${shortOrderId}`,
      html: htmlTemplate,
    });
    console.log(`Order confirmation email sent to ${userEmail} via Resend:`, data);
  } catch (error) {
    console.error("Failed to send order confirmation email via Resend:", error);
  }
}

/**
 * Sends an email when a vendor is approved.
 */
export async function sendVendorApprovalEmail(userEmail, storeName) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is missing. Vendor approval email will not be sent.");
    return;
  }

  const htmlTemplate = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FDFBF7; padding: 40px 20px; color: #2C2420;">
      <div style="max-w: 500px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(44, 36, 32, 0.05);">
        
        <h1 style="font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 30px; letter-spacing: -0.5px;">
          Vendly<span style="color: #459A59;">.</span>
        </h1>
        
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 20px; border-bottom: 2px solid #EAE1DB; padding-bottom: 15px;">
          Store Approved! 🎉
        </h2>
        
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
          Great news! <strong>${storeName}</strong> has been officially approved to sell on Vendly.
        </p>
        
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
          You can now log into your Vendor Dashboard, list your products, and start receiving orders from customers around the world.
        </p>
        
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="https://vendly.com/vendor/dashboard" style="background-color: #459A59; color: white; padding: 12px 24px; border-radius: 50px; text-decoration: none; font-weight: bold; display: inline-block;">
            Go to Dashboard
          </a>
        </div>
        
      </div>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: 'Vendly Admin <onboarding@resend.dev>',
      to: userEmail,
      subject: `Your store '${storeName}' has been approved!`,
      html: htmlTemplate,
    });
    console.log(`Vendor approval email sent to ${userEmail} via Resend:`, data);
  } catch (error) {
    console.error("Failed to send vendor approval email:", error);
  }
}

/**
 * Sends a password reset email using Resend.
 */
export async function sendPasswordResetEmail(userEmail, resetUrl) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY is missing. Password reset email will not be sent.");
    return;
  }

  const htmlTemplate = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #FDFBF7; padding: 40px 20px; color: #2C2420;">
      <div style="max-w: 500px; margin: 0 auto; background-color: #FFFFFF; border-radius: 12px; padding: 40px; box-shadow: 0 4px 6px rgba(44, 36, 32, 0.05);">
        <h1 style="font-size: 24px; font-weight: 800; text-align: center; margin-bottom: 30px; letter-spacing: -0.5px;">
          Vendly<span style="color: #459A59;">.</span>
        </h1>
        <h2 style="font-size: 20px; font-weight: 600; margin-bottom: 20px; border-bottom: 2px solid #EAE1DB; padding-bottom: 15px;">
          Password Reset Request
        </h2>
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 20px;">
          We received a request to reset your password. If you didn't make this request, you can safely ignore this email.
        </p>
        <p style="font-size: 16px; line-height: 1.5; margin-bottom: 30px;">
          Click the link below to set a new password. This link will expire in 1 hour.
        </p>
        <div style="text-align: center; margin-bottom: 30px;">
          <a href="${resetUrl}" style="background-color: #0D9488; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block;">
            Reset Password
          </a>
        </div>
      </div>
    </div>
  `;

  try {
    const data = await resend.emails.send({
      from: 'Vendly Store <onboarding@resend.dev>',
      to: userEmail,
      subject: "Password Reset Request",
      html: htmlTemplate,
    });
    console.log(\`Password reset email sent to \${userEmail} via Resend:\`, data);
  } catch (error) {
    console.error("Failed to send password reset email:", error);
  }
}
