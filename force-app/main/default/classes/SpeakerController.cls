public with sharing class SpeakerController {

    // Search speakers by name and speciality
    @AuraEnabled(cacheable=true)
    public static List<Speaker_c__c> searchSpeakers(String name, String speciality) {
        String nameLike = '%' + (name == null ? '' : name.trim()) + '%';
        String specFilter = (speciality == null ? '' : speciality.trim());

        if (specFilter != '') {
            return [
                SELECT Id, Name, Email_c__c, Bio_c__c, Speciality_c__c
                FROM Speaker_c__c
                WHERE Name LIKE :nameLike
                  AND Speciality_c__c = :specFilter
            ];
        } else {
            return [
                SELECT Id, Name, Email_c__c, Bio_c__c, Speciality_c__c
                FROM Speaker_c__c
                WHERE Name LIKE :nameLike
            ];
        }
    }

    // Get assignments for a speaker on a specific date
    @AuraEnabled(cacheable=true)
    public static List<Speaker_Assignment_c__c> getAssignmentsForDate(Id speakerId, Date selectedDate) {
        if (speakerId == null || selectedDate == null) {
            return new List<Speaker_Assignment_c__c>();
        }

        return [
            SELECT Id, Speaker_c__c, Session_c__c,
                   Session_c__r.Title_c__c,
                   Session_c__r.Session_Date_c__c,
                   Session_c__r.Start_Time_c__c,
                   Session_c__r.End_Time_c__c
            FROM Speaker_Assignment_c__c
            WHERE Speaker_c__c = :speakerId
              AND Session_c__r.Session_Date_c__c = :selectedDate
        ];
    }

    // Create a new session and assignment
   @AuraEnabled
public static Id createSessionAndAssignment(
    Id speakerId,
    Date sessionDate,
    String startTime,
    String endTime,
    String title,
    String level
) {
    if (speakerId == null) {
        throw new AuraHandledException('Speaker is required.');
    }

    if (sessionDate == null || sessionDate <= Date.today()) {
        throw new AuraHandledException('Session date must be in the future.');
    }

    Time st = parseTime(startTime);
    Time et = parseTime(endTime);

    if (st == null || et == null || et <= st) {
        throw new AuraHandledException('Provide valid start and end times.');
    }

    Session_c__c sess = new Session_c__c();
    sess.Title_c__c = String.isBlank(title) ? 'Conference Session' : title.trim();
    sess.Session_Date_c__c = sessionDate;
    sess.Start_Time_c__c = st;   
    sess.End_Time_c__c = et;     
    sess.Level_c__c = String.isBlank(level) ? 'Beginner' : level;

    insert sess;

    Speaker_Assignment_c__c assign = new Speaker_Assignment_c__c();
    assign.Speaker_c__c = speakerId;
    assign.Session_c__c = sess.Id;
    insert assign;

    return assign.Id;
}


  
    // -----------------------------
    // TIME PARSER (KEY FIX)
    // -----------------------------
private static Time parseTime(String t) {
        if (String.isBlank(t)) return null;

        // Accepts "HH:mm" or "HH:mm:ss"
        List<String> parts = t.split(':');

        Integer h = Integer.valueOf(parts[0]);
        Integer m = Integer.valueOf(parts[1]);
        Integer s = parts.size() > 2 ? Integer.valueOf(parts[2]) : 0;

        return Time.newInstance(h, m, s, 0);
    }
}