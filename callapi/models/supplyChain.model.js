class SupplyChainEnquiry {
  constructor(data) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.primaryNumber = data.primaryNumber;
    this.businessName = data.businessName;
    this.businessType = data.businessType;
    this.message = data.message || "";
  }
}

module.exports = SupplyChainEnquiry;
