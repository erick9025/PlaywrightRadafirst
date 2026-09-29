export enum DatePattern {
    // Original formats
    USFormat = "MM/DD/YYYY",
    USFormat_MonthsNoLeadingZero = "M/DD/YYYY",
    USFormat_MonthShort = "MMM/DD/YYYY",
    USFormat_MonthComplete = "MMMM/DD/YYYY",
    USFormat_HumanReadable = "MMMM D, YYYY",
    JustTime_AMPM = "hh:mm:ss A",
    JustTime_AMPM_HoursNoLeadingZeros = "h:mm:ss A",
    // Consolidated formats supported inside the tryToParseDateTime method inside testUtilities
    DatePipeTimeAMPM = "MM/dd/yyyy | hh:mm:ss a", // 07/23/2025 | 09:42:04 AM
    DatePipeTimeAMPMNoSeconds = "MM/dd/yyyy | hh:mm a", // 07/23/2025 | 09:42 AM
    DateTimeAMPM = "MM/DD/YYYY hh:mm:ss a", // 07/23/2025 09:42:04 AM
    DateNoLeading0CommaTimeAMPM = "M/D/YYYY, hh:mm:ss a", // 07/23/2025, 09:42:04 AM
    DateUSFormatWithTimeAMPM = "MMMM DD/YYYY | hh:mm:ss A", // 07/23/2025
    DateFullMonthComma = "MMMM D, YYYY", // October 7, 2025
    DateShortMonthCommaTimeAMPM = "MMM D, YYYY, h:mm:ss A", // Jul 21, 2026, 3:26:36 PM
    DateNoLeading0TimeAMPMWithTimezone = "M/D/YYYY h:mm a Z", // 8/13/25 1:00 AM GMT-5
}
 