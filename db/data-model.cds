namespace my.Records;

entity PersonalInformation{
  key ID : String;
  FirstName : String(50);
  LastName : String(50);
  DateOfBirth : Date;
  Gender : String(10);
  Nationality : String(50);
  Address : String(100);
  City : String(50);
  PostalCode : String(20);
  Country : String(50);
  Email : String(100);
  Phone : String(20);
  MaritalStatus : String(20);
  Occupation : String(100);
  EducationLevel : String(50);
  BloodGroup : String(5);
  EmergencyContactName : String(100);
  EmergencyContactPhone : String(20);
  PassportNumber : String(20);
  DriverLicenseNumber : String(20);
  linkFamily  : Association to many FamilyInformation on linkFamily.linkEmployee = $self;                    
}

entity FamilyInformation{
  key FID : String;
  FatherName : String(50);
  MotherName : String(50);
  SpouseName : String(50);
  SpouseDateOfBirth : Date;
  SpouseOccupation : String(100);
  SpouseEmail : String(100);
  SpousePhone : String(20);
  NumberOfChildren : Integer;
  Child1Name : String(50);
  Child1DateOfBirth : Date;
  Child1Gender : String(10);
  Child2Name : String(50);
  Child2DateOfBirth : Date;
  Child2Gender : String(10);
  Child3Name : String(50);
  Child3DateOfBirth : Date;
  Child3Gender : String(10);
  Sibling1Name : String(50);
  Sibling1DateOfBirth : Date;
  Sibling1Relationship : String(50);
  linkEmployee: Association to PersonalInformation
}
