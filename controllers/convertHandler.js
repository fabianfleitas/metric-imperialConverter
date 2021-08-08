function ConvertHandler() {

    this.getNum = function(input) {
        //if the input does not have a number
        if (!input.match(/(\d+[/.]?[\d+]?)/)) {
            return 1
        }
        //if the input has double dot
        if (input.match(/\./)) {
            let dots = input.match(/\./g)
            if (dots.length > 1) return (false)
        }
        //remove the literals
        let number = input.replace(/[a-zA-Z]+/, "")
            //if the number has a slash
        let slashPos = number.indexOf("/")
        if (slashPos !== -1) {
            let x = number.substring(0, slashPos)
            let y = number.substring(slashPos + 1, number.length)
            number = x / y
            if (!number) {
                return false
            }
        }
        let result = parseFloat(number)
        if (result === 0) return false
        return result;
    };

    this.allUnits = ["gal", "L", "mi", "km", "lbs", "kg"]
    this.metricUnits = ["L", "km", "kg"]
    this.imperialUnits = ["gal", "mi", "lbs"]

    this.getUnit = function(input) {
        //Replace all the numbers
        let str = input.replace(/[\d]?[\W]?/gm, "")
            // Transform to uppercase and lowercase
        if (str === "l" || str === "L") {
            str = str.toUpperCase()
        } else {
            str = str.toLowerCase()
        }
        if (!this.allUnits.includes(str)) return false
        return str
    };

    this.getReturnUnit = function(initUnit) {
        //save the position if the unit are in metric  or imperial
        const metPos = this.metricUnits.indexOf(initUnit)
        const impPos = this.imperialUnits.indexOf(initUnit)
        if (metPos !== -1) {
            return this.imperialUnits[metPos]
        } else {
            return this.metricUnits[impPos]
        }
    };

    this.spellOutUnit = function(initUnit) {
        const spelledUnits = ["gallons", "liters", "miles", "kilometers", "pounds", "kilograms"]
        const pos = this.allUnits.indexOf(initUnit)
        if (pos !== -1) return spelledUnits[pos]
        return false
    };

    this.convert = function(initNum, initUnit) {
        //the values for the conversions= 0: gal to L ,1: mi to km ,2: kg to lbs
        const values = [3.78541, 1.609340, 0.453592]
        const impPos = this.imperialUnits.indexOf(initUnit)
        const metPos = this.metricUnits.indexOf(initUnit)
        let result;

        if (impPos !== -1) {
            result = initNum * values[impPos]
        } else {
            result = initNum / values[metPos]
        }
        return Math.round((result + Number.EPSILON) * 100000) / 100000
    };

    this.getString = function(initNum, initUnit, returnNum, returnUnit) {
        if (!initNum && !initUnit) {
            return "invalid number and unit"
        } else if (!initNum) {
            return "invalid number"
        } else if (!initUnit) {
            return "invalid unit"
        }
        //save this to use a method
        let self = this
        return {
            "initNum": initNum,
            "initUnit": initUnit,
            "returnNum": returnNum,
            "returnUnit": returnUnit,
            "string": `${initNum} ${self.spellOutUnit(initUnit)} converts to ${returnNum} ${self.spellOutUnit(returnUnit)}`
        };
    };

}

module.exports = ConvertHandler;