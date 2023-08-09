using my.Records as my from '../db/data-model';

service CatalogService {
   
    entity PersonalInformation as projection on my.PersonalInformation;
    entity FamilyInformation as projection on my.FamilyInformation;
}