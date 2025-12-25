const transporter = require("../config/mailer");

exports.submitSupplyChainForm = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      primaryNumber,
      businessName,
      businessType,
      message,
    } = req.body;

    // ---------------------------
    // FIELD VALIDATION
    // ---------------------------
    let errors = {};

    if (!firstName || firstName.trim() === "") {
      errors.firstName = "First name is required";
    }

    if (!lastName || lastName.trim() === "") {
      errors.lastName = "Last name is required";
    }

    if (!email || email.trim() === "") {
      errors.email = "Email is required";
    }

    if (!primaryNumber || primaryNumber.trim() === "") {
      errors.primaryNumber = "Primary number is required";
    }

    if (!businessName || businessName.trim() === "") {
      errors.businessName = "Business name is required";
    }

    if (!businessType || businessType.trim() === "") {
      errors.businessType = "Business type is required";
    }

    // email format check
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (email && !emailRegex.test(email)) {
      errors.email = "Invalid email format";
    }

    // phone number digits check
    if (primaryNumber && primaryNumber.length < 10) {
      errors.primaryNumber = "Primary number must be at least 10 digits";
    }

    // If any validation errors
    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        success: false,
        errors,
      });
    }

    // ---------------------------
    // FORMAT CURRENT DATE
    // ---------------------------
    const formattedDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    // ---------------------------
    // HTML EMAIL TEMPLATE
    // ---------------------------
    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Supply Chain Enquiry</title>
</head>
<body style="margin:0;padding:0;font-family:Arial,Segoe UI,Tahoma,sans-serif;background:#f5f5f5;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:20px;">
<tr>
<td align="center">

<table width="700" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #dddddd;">

<!-- Header -->
<tr>
<td colspan="2" style="background:#333333;padding:20px;text-align:center;">
<h1 style="margin:0;color:#ffffff;font-size:22px;">Supply Chain Enquiry</h1>
</td>
</tr>

<!-- Contact Details -->
<tr>
<td colspan="2" style="background:#666666;padding:12px;text-align:center;">
<h2 style="margin:0;color:#ffffff;font-size:18px;">Contact Details</h2>
</td>
</tr>

<tr>
<td style="padding:10px 20px;border-bottom:1px solid #eeeeee;width:30%;font-weight:bold;">First Name:</td>
<td style="padding:10px 20px;border-bottom:1px solid #eeeeee;">${firstName}</td>
</tr>

<tr>
<td style="padding:10px 20px;border-bottom:1px solid #eeeeee;font-weight:bold;">Last Name:</td>
<td style="padding:10px 20px;border-bottom:1px solid #eeeeee;">${lastName}</td>
</tr>

<tr>
<td style="padding:10px 20px;border-bottom:1px solid #eeeeee;font-weight:bold;">Email:</td>
<td style="padding:10px 20px;border-bottom:1px solid #eeeeee;">${email}</td>
</tr>

<tr>
<td style="padding:10px 20px;border-bottom:1px solid #eeeeee;font-weight:bold;">Primary Number:</td>
<td style="padding:10px 20px;border-bottom:1px solid #eeeeee;">${primaryNumber}</td>
</tr>

<!-- Business Information -->
<tr>
<td colspan="2" style="background:#666666;padding:12px;text-align:center;">
<h2 style="margin:0;color:#ffffff;font-size:18px;">Business Information</h2>
</td>
</tr>

<tr>
<td style="padding:10px 20px;border-bottom:1px solid #eeeeee;font-weight:bold;">Business Name:</td>
<td style="padding:10px 20px;border-bottom:1px solid #eeeeee;">${businessName}</td>
</tr>

<tr>
<td style="padding:10px 20px;border-bottom:1px solid #eeeeee;font-weight:bold;">Business Type:</td>
<td style="padding:10px 20px;border-bottom:1px solid #eeeeee;">${businessType}</td>
</tr>

<!-- Message -->
<tr>
<td colspan="2" style="background:#666666;padding:12px;text-align:center;">
<h2 style="margin:0;color:#ffffff;font-size:18px;">Message</h2>
</td>
</tr>

<tr>
<td colspan="2" style="padding:20px;border-bottom:1px solid #eeeeee;">
<p style="margin:0;font-size:14px;line-height:1.6;">
${message || "-"}
</p>
</td>
</tr>

<!-- Footer -->
<tr>
<td colspan="2" style="background:#f5f5f5;padding:20px;text-align:center;border-top:1px solid #dddddd;">
<p style="margin:0;font-size:14px;color:#666666;">
Received on ${formattedDate}
</p>
</td>
</tr>

</table>

</td>
</tr>
</table>
</body>
</html>
`;

    // ---------------------------
    // SEND EMAIL
    // ---------------------------
    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,   // must be same SMTP account
      // to: "ajay@meghtechnologies.com",  // receiving email
      to: "disma.megh@gmail.com",
      replyTo: email,                    // user reply goes to sender
      subject: "New Supply Chain Enquiry",
      html: htmlBody,
    });

    return res.json({
      success: true,
      message: "Supply Chain enquiry submitted successfully",
    });
  } catch (err) {
    console.error("Mail sending error:", err);
    return res.status(500).json({
      success: false,
      message: "Email sending failed. Please try again later.",
    });
  }
};
