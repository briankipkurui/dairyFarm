package com.orizon.dairyFarm.utilis;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class Utilities {

    public static String splitName(String name) {
        String[] parts = name.split(" ");
        StringBuilder initials = new StringBuilder();
        for (String part : parts) {
            initials.append(part.charAt(0));
        }
        return initials.toString().toUpperCase();
    }

    public static String splitNameIntoSubstring(String name) {
        if (name.length() >= 2) {
            return name.substring(0, 2);
        } else {
            return name;
        }
    }

    public static int getLastTwoDigitsOfYear() {
        int currentYear = LocalDate.now().getYear();
        return currentYear % 100;
    }

    public static String concatenateStrings(String... strings) {
        StringBuilder concatenatedString = new StringBuilder();
        for (String str : strings) {
            concatenatedString.append(str).append("/");
        }
        if (concatenatedString.length() > 0) {
            concatenatedString.setLength(concatenatedString.length() - 1);
        }
        return concatenatedString.toString();
    }

    public static String concatenateSerialNumber(String... strings) {
        StringBuilder concatenatedString = new StringBuilder();
        for (String str : strings) {
            concatenatedString.append(str).append("-");
        }
        if (concatenatedString.length() > 0) {
            concatenatedString.setLength(concatenatedString.length() - 1);
        }
        return concatenatedString.toString();
    }

    public static LocalDateTime convertStringToLocalDateTime(String dateString) {
        // Check if the input string is null or empty
        if (dateString == null || dateString.isEmpty()) {
            return null; // Return null if the input string is null or empty
        }
        LocalDate localDate = LocalDate.parse(dateString);

        // Convert LocalDate to LocalDateTime (assuming time as midnight)
        LocalDateTime localDateTime = localDate.atStartOfDay();
        // Parse string to LocalDateTime
        return localDateTime;
    }

    public static String toCamelCase(String snakeCase) {
        StringBuilder result = new StringBuilder();
        boolean toUpperCase = false;

        for (char ch : snakeCase.toCharArray()) {
            if (ch == '_') {
                toUpperCase = true;
            } else {
                if (toUpperCase) {
                    result.append(Character.toUpperCase(ch));
                    toUpperCase = false;
                } else {
                    result.append(ch);
                }
            }
        }

        return result.toString();
    }

    public static String removeBrackets(String input) {
        if (input == null || input.isEmpty()) {
            return input; // Return as is if input is null or empty
        }

        // Use a regular expression to remove brackets and their content
        return input.replaceAll("\\(.*?\\)", "").trim();
    }

    public static String reverseAndCamelCase(String input) {
        if (input == null || !input.contains("(") || !input.contains(")")) {
            return input; // Return as is if no brackets
        }

        try {
            // Extract content inside brackets
            int openBracketIndex = input.indexOf("(");
            int closeBracketIndex = input.indexOf(")");

            if (closeBracketIndex <= openBracketIndex) {
                return input; // Invalid format, return as is
            }

            String beforeBracket = input.substring(0, openBracketIndex).trim();
            String insideBracket = input.substring(openBracketIndex + 1, closeBracketIndex).trim();

            // Convert the inside bracket to camel case
            String camelCased = toCamelCase(insideBracket);

            // Reverse and join with a dot
            return camelCased + "." + beforeBracket;
        } catch (Exception e) {
            // Handle unexpected cases gracefully
            return input;
        }
    }
}
