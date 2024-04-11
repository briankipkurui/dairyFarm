package com.orizon.dairyFarm.utilis;

import java.time.LocalDate;

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
}
