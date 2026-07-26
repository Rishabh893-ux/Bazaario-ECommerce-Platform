/**
 * Sends an order confirmation email to the user.
 * (Currently disabled)
 */
export async function sendOrderConfirmationEmail(userEmail, userName, orderId, totalAmount) {
  console.log(`Email disabled. Would have sent order confirmation to ${userEmail}`);
}

/**
 * Sends an email when a vendor is approved.
 * (Currently disabled)
 */
export async function sendVendorApprovalEmail(userEmail, storeName) {
  console.log(`Email disabled. Would have sent vendor approval to ${userEmail}`);
}

/**
 * Sends a password reset email.
 * (Currently disabled)
 */
export async function sendPasswordResetEmail(userEmail, resetUrl) {
  console.log(`Email disabled. Would have sent password reset to ${userEmail}. URL: ${resetUrl}`);
}
