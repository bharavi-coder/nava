const transporter = require("../config/mailer");
const ApplicationForm = require("../models/applicationForm.model");

exports.submitApplicationForm = async (req, res) => {
  try {
    const documents = req.files || [];
    const formData = new ApplicationForm(req.body);

    // ---------------- VALIDATION ----------------
    let errors = {};

    const requireField = (value, key, label) => {
      if (!value || String(value).trim() === "") {
        errors[key] = `${label} is required`;
      }
    };

    requireField(formData.firstName, "firstName", "First name");
    requireField(formData.lastName, "lastName", "Last name");
    requireField(formData.phone, "phone", "Phone");
    requireField(formData.email, "email", "Email");
    requireField(formData.legalBusinessName, "legalBusinessName", "Legal business name");
    requireField(formData.businessType, "businessType", "Business type");
    requireField(formData.address, "address", "Address");
    requireField(formData.city, "city", "City");
    requireField(formData.state, "state", "State");
    requireField(formData.zip, "zip", "ZIP");
    requireField(formData.ein, "ein", "EIN");

    const emailRegex = /^\S+@\S+\.\S+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.email = "Invalid email format";
    }

    if (formData.phone && formData.phone.length < 10) {
      errors.phone = "Phone must be at least 10 digits";
    }

    if (Object.keys(errors).length > 0) {
      return res.status(422).json({
        success: false,
        errors,
      });
    }

    // ---------------- DATE ----------------
    const date = new Date().toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    // ---------------- ATTACHMENTS ----------------
    const attachments = documents.map(file => ({
      filename: file.originalname,
      content: file.buffer,
    }));

    // ---------------- HTML TEMPLATE ----------------
    const htmlBody = `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Application Form Submission</title>
</head>

<body style="margin:0;padding:0;font-family:Arial;background:#f5f5f5">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:20px;">
<tr><td align="center">

<table width="700" cellpadding="0" cellspacing="0" style="background:#ffffff;border:1px solid #dddddd;">

<tr>
<td colspan="2" style="background:#333;padding:20px;text-align:center;">
<h1 style="color:#fff;margin:0;font-size:22px;">Application Form Submission</h1>
</td>
</tr>

<!-- Primary Contact -->
<tr><td colspan="2" style="background:#666;padding:12px;text-align:center;">
<h2 style="color:#fff;margin:0;font-size:18px;">Primary Contact</h2>
</td></tr>

<tr><td style="padding:10px 20px;font-weight:bold;">Title:</td><td>${formData.title || "-"}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">First Name:</td><td>${formData.firstName}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Last Name:</td><td>${formData.lastName}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Phone:</td><td>${formData.phone}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Email:</td><td>${formData.email}</td></tr>

<!-- Business Info -->
<tr><td colspan="2" style="background:#666;padding:12px;text-align:center;">
<h2 style="color:#fff;margin:0;font-size:18px;">Business Information</h2>
</td></tr>

<tr><td style="padding:10px 20px;font-weight:bold;">Legal Business Name:</td><td>${formData.legalBusinessName}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">DBA:</td><td>${formData.dba || "-"}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Business Type:</td><td>${formData.businessType}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Address:</td><td>${formData.address}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">City:</td><td>${formData.city}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">State:</td><td>${formData.state}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">ZIP:</td><td>${formData.zip}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Business Phone:</td><td>${formData.businessPhone || "-"}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Business Email:</td><td>${formData.businessEmail || "-"}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Website:</td><td>${formData.website || "-"}</td></tr>

<!-- Business Details -->
<tr><td colspan="2" style="background:#666;padding:12px;text-align:center;">
<h2 style="color:#fff;margin:0;font-size:18px;">Business Details</h2>
</td></tr>

<tr><td style="padding:10px 20px;font-weight:bold;">Years in Business:</td><td>${formData.yearsInBusiness || "-"}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Locations:</td><td>${formData.locations || "-"}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Monthly Purchase Volume:</td><td>${formData.monthlyPurchaseVolume || "-"}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Preferred Ordering Method:</td><td>${formData.preferredOrderingMethod || "-"}</td></tr>

<!-- Tax -->
<tr><td colspan="2" style="background:#666;padding:12px;text-align:center;">
<h2 style="color:#fff;margin:0;font-size:18px;">Tax Information</h2>
</td></tr>

<tr><td style="padding:10px 20px;font-weight:bold;">EIN:</td><td>${formData.ein}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Resale Certificate:</td><td>${formData.resaleCertificate || "-"}</td></tr>

<!-- Trade Reference 1 -->
<tr><td colspan="2" style="background:#666;padding:12px;text-align:center;">
<h2 style="color:#fff;margin:0;font-size:18px;">Trade Reference 1</h2>
</td></tr>

<tr><td style="padding:10px 20px;font-weight:bold;">Name:</td><td>${formData.reference1FirstName || "-"} ${formData.reference1LastName || "-"}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Phone:</td><td>${formData.reference1Phone || "-"}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Email:</td><td>${formData.reference1Email || "-"}</td></tr>

<!-- Trade Reference 2 -->
<tr><td colspan="2" style="background:#666;padding:12px;text-align:center;">
<h2 style="color:#fff;margin:0;font-size:18px;">Trade Reference 2</h2>
</td></tr>

<tr><td style="padding:10px 20px;font-weight:bold;">Name:</td><td>${formData.reference2FirstName || "-"} ${formData.reference2LastName || "-"}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Phone:</td><td>${formData.reference2Phone || "-"}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Email:</td><td>${formData.reference2Email || "-"}</td></tr>

<!-- Buyer 1 -->
<tr><td colspan="2" style="background:#666;padding:12px;text-align:center;">
<h2 style="color:#fff;margin:0;font-size:18px;">Buyer 1</h2>
</td></tr>

<tr><td style="padding:10px 20px;font-weight:bold;">Name:</td><td>${formData.buyer1FirstName || "-"} ${formData.buyer1LastName || "-"}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Phone:</td><td>${formData.buyer1Phone || "-"}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Email:</td><td>${formData.buyer1Email || "-"}</td></tr>

<!-- Buyer 2 -->
<tr><td colspan="2" style="background:#666;padding:12px;text-align:center;">
<h2 style="color:#fff;margin:0;font-size:18px;">Buyer 2</h2>
</td></tr>

<tr><td style="padding:10px 20px;font-weight:bold;">Name:</td><td>${formData.buyer2FirstName || "-"} ${formData.buyer2LastName || "-"}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Phone:</td><td>${formData.buyer2Phone || "-"}</td></tr>
<tr><td style="padding:10px 20px;font-weight:bold;">Email:</td><td>${formData.buyer2Email || "-"}</td></tr>

<tr>
<td colspan="2" style="background:#f5f5f5;padding:20px;text-align:center;border-top:1px solid #ddd;">
Application received on ${date}
</td>
</tr>

</table>
</td></tr></table>
</body>
</html>
`;

    await transporter.sendMail({
      from: process.env.MAIL_USERNAME,
      to: "disma.megh@gmail.com",
      // to: "ajay@meghtechnologies.com",
      replyTo: formData.email,
      subject: "New Application Form Submission",
      html: htmlBody,
      attachments,
    });

    res.json({
      success: true,
      message: "Application form submitted successfully and email sent.",
    });

  } catch (error) {
    console.error("Application form error:", error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while submitting application form.",
    });
  }
};
