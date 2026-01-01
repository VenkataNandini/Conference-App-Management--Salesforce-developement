public with sharing class SessionController {
  @AuraEnabled
  public static void createAssignment(Id speakerId, Id sessionId) {
    Speaker_Assignment_c__c assignment = new Speaker_Assignment_c__c(
      Speaker_c__c = speakerId,
      Session_c__c = sessionId
    );

    insert assignment;
  }
}
