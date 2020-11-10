const API = function (value, type) {
    if (type == 'experienceDescription') {
        if (value == 'I\'ve done many projects') {
            return [
                {
                    "range": [10,23],
                    "message": "This is vague. Instead of “Managed projects for many clients”, say “Managed projects for 10 clients including BlueBank.”"
                },
                {
                    "range": [0,23],
                    "message": "Include a valuable metric if possible. For example: \"Increased revenue by 20% within one month.\"."
                },
            ];
        }
        else {
            return [
                {
                    "range": [10,23],
                    "message": "This is vague. Instead of “Managed projects for many clients”, say “Managed projects for 10 clients including BlueBank.”"
                },
                {
                    "range": [0,23],
                    "message": "Include a valuable metric if possible. For example: \"Increased revenue by 20% within one month.\"."
                },
            ];
        }
    }
    else {
        return [];
    }
}

export default API;