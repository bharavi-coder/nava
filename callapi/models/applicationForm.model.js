class ApplicationForm {
  constructor(data) {
    // Primary Contact
    this.title = data.title;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.phone = data.phone;
    this.email = data.email;

    // Business Information
    this.legalBusinessName = data.legalBusinessName;
    this.dba = data.dba;
    this.businessType = data.businessType;
    this.address = data.address;
    this.city = data.city;
    this.state = data.state;
    this.zip = data.zip;
    this.businessPhone = data.businessPhone;
    this.businessEmail = data.businessEmail;
    this.website = data.website;

    // Business Details
    this.yearsInBusiness = data.yearsInBusiness;
    this.locations = data.locations;
    this.monthlyPurchaseVolume = data.monthlyPurchaseVolume;
    this.preferredOrderingMethod = data.preferredOrderingMethod;

    // Tax
    this.ein = data.ein;
    this.resaleCertificate = data.resaleCertificate;

    // References
    this.reference1Title = data.reference1Title;
    this.reference1FirstName = data.reference1FirstName;
    this.reference1LastName = data.reference1LastName;
    this.reference1Phone = data.reference1Phone;
    this.reference1Email = data.reference1Email;

    this.reference2Title = data.reference2Title;
    this.reference2FirstName = data.reference2FirstName;
    this.reference2LastName = data.reference2LastName;
    this.reference2Phone = data.reference2Phone;
    this.reference2Email = data.reference2Email;

    // Buyers
    this.buyer1Title = data.buyer1Title;
    this.buyer1FirstName = data.buyer1FirstName;
    this.buyer1LastName = data.buyer1LastName;
    this.buyer1Phone = data.buyer1Phone;
    this.buyer1Email = data.buyer1Email;

    this.buyer2Title = data.buyer2Title;
    this.buyer2FirstName = data.buyer2FirstName;
    this.buyer2LastName = data.buyer2LastName;
    this.buyer2Phone = data.buyer2Phone;
    this.buyer2Email = data.buyer2Email;
  }
}

module.exports = ApplicationForm;
