class ErrorType {
    constructor(range, message) {
        this.range = range;
        this.message = message;
    }
}

class Rule {
    constructor() {
        
    }
    checkRule(text) {
        throw new Error('You have to implement the method checkRule!');
    }
    getErrors(text) {
        throw new Error('You have to implement the method getErrors!');
    }
}

class ContainsRule extends Rule {

}

const ruleset = [
    new Rule()
]

const API = function (value, type) {
    let errors = [];
    if (type === 'experienceDescription') {
        if (value.indexOf('I\'ve done many projects') !== -1) {
            errors.push(
                new ErrorType([10,23], "This is vague. Instead of “Managed projects for many clients”, say “Managed projects for 10 clients including BlueBank.”"),
                new ErrorType([0,23], "Include a valuable metric if possible. For example: \"Increased revenue by 20% within one month.\".")
            );
        }
    }
    return errors;
}

export default API;