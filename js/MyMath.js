class MyMath{

    // <----------------------------------variables---------------------------------->

    static get pi(){
        return 3.14159265358979323846264338327950288419716939937510;
    }

    static get twoPi(){
        return 2 * this.pi;
    }

    static get halfPi(){
        return this.pi / 2;
    }

    static get e(){
        return 2.71828182845904523536028747135266249775724709369995;
    }

    // <----------------------------------exponentiation---------------------------------->

    static sqrt(num){
        if (typeof num !== "number") {
            throw new TypeError("Input must be a number, MyMath.sqrt");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.sqrt");
        }
        if(num < 0){
            console.log("You can't take the square root of a negative number, MyMath.sqrt");
            return NaN;
        }
        let low = 0;
        let high = this.max(1, num);
        let mid = (low + high) / 2;
        let diff = mid * mid - num;
        const precision = 1e-15;
        while (this.abs(diff) > precision) {
            if (mid * mid > num)
                high = mid;
            else
                low = mid;
            mid = (low + high) / 2;
            diff = mid * mid - num;
        }
        return mid;
    }

    //helper method
    static #intPower(base, power){
        if (typeof base !== "number") {
            throw new TypeError("Input must be a number, MyMath.#intPower input1");
        }
        if(typeof power !== "number"){
            throw new TypeError("Input must be a number, MyMath.#intPower input2");
        }
        if(Number.isNaN(base) || base == Infinity || base == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.#intPower input1");
        }
        if(Number.isNaN(power) || power == Infinity || power == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.#intPower input2");
        }
        power -= power % 1;
        if(power == 0)
            return 1;
        if(power == 1)
            return base;
        let halfPower = this.#intPower(base, power / 2);
        if (power % 2 == 0)
            return halfPower * halfPower;
        else
            return halfPower * halfPower * base;
    }
    //helper method
    static #fractionalPower(base, fracPower){
        if (typeof base !== "number") {
            throw new TypeError("Input must be a number, MyMath.#fractionalPower input1");
        }
        if(typeof fracPower !== "number"){
            throw new TypeError("Input must be a number, MyMath.#fractionalPower input2");
        }
        if(Number.isNaN(base) || base == Infinity || base == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.#fractionalPower input1");
        }
        if(Number.isNaN(fracPower) || fracPower == Infinity || fracPower == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.#fractionalPower input2");
        }
        let result = 1;
        let current = this.sqrt(base);
        let bit = 0.5;
        while (bit > 1e-15) {
            if (fracPower >= bit) {
                result *= current;
                fracPower -= bit;
            }
            current = this.sqrt(current);
            bit *= 0.5;
        }
        return result;
    }

    static power(base, power){
        if (typeof base !== "number") {
            throw new TypeError("Input must be a number, MyMath.power input1");
        }
        if(typeof power !== "number"){
            throw new TypeError("Input must be a number, MyMath.power input2");
        }
        if(Number.isNaN(base) || base == Infinity || base == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.power input1");
        }
        if(Number.isNaN(power) || power == Infinity || power == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.power input2");
        }
        let integerPower = this.almostEqual(power, this.round(power));
        let negativePower = power < 0;
        let negativeBase = base < 0;
        let zeroToZero = this.almostEqual(base, 0) && this.almostEqual(power, 0);
        let zeroToNegative = this.almostEqual(base, 0) && negativePower;
        let negativeToIrrational = negativeBase && !integerPower;
        let valid = !(zeroToZero || zeroToNegative || negativeToIrrational);
        if(valid){
            if (this.almostEqual(base , 0) || this.almostEqual(base , 1))
                return base;
            if(negativePower){
                return 1 / this.power(base, -power);
            }
            let intPart = power - (power % 1);
            let result = this.#intPower(base, intPart);
            if(!integerPower){
                let fracPart = power % 1;
                result *= this.#fractionalPower(base, fracPart);
            }
            return result;
        }else{
            if (zeroToZero) {
                console.log("0^0 is undefined\n");
                return NaN;
            }
            else if (zeroToNegative) {
                throw new RangeError("0 to a negative power is undefined, division by 0\n");
            }
            else if (negativeToIrrational) {
                console.log("negative base to a fractional power is undefined in real world\n");
                return NaN;
            }
            return NaN;
        }

    }

    static exp(num){
        if (typeof num !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.exp");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.exp");
        }
        return this.power(this.e, num);    
    }

    // <----------------------------------trignomitric---------------------------------->

    static toRad(degree){
        if (typeof degree !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.toRad");
        }
        if(Number.isNaN(degree) || degree == Infinity || degree == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.toRad");
        }
        return degree * this.pi / 180;
    }

    static toDegree(rad){
        if (typeof rad !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.toDegree");
        }
        if(Number.isNaN(rad) || rad == Infinity || rad == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.toDegree");
        }
        return rad * 180 / this.pi;
    }

    static sin(rad){
        if (typeof rad !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.sin");
        }
        if(Number.isNaN(rad) || rad == Infinity || rad == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.sin");
        }
        rad %= this.twoPi;
        if (rad > this.pi)
            rad -= this.twoPi;
        if (rad < -this.pi)
            rad += this.twoPi;
        if (this.almostEqual(rad, 0) || this.almostEqual(rad, this.pi))
            return 0;
        if (this.almostEqual(rad, this.halfPi))
            return 1;
        if (this.almostEqual(rad, -this.halfPi))
            return -1;
        if (this.almostEqual(rad, this.pi / 6) || this.almostEqual(rad, 5 * this.pi / 6))
            return 0.5;
        if (this.almostEqual(rad, -5 * this.pi / 6) || this.almostEqual(rad, -1 * this.pi / 6))
            return -0.5;
        if (this.almostEqual(rad, this.pi / 3) || this.almostEqual(rad, 2 * this.pi / 3))
            return this.sqrt(3) / 2;
        if (this.almostEqual(rad, -this.pi / 3) || this.almostEqual(rad, -2 * this.pi / 3))
            return -this.sqrt(3) / 2;
        if (this.almostEqual(rad, this.pi / 4) || this.almostEqual(rad, 3 * this.pi / 4))
            return this.sqrt(2) / 2;
        if (this.almostEqual(rad, -this.pi / 4) || this.almostEqual(rad, -3 * this.pi / 4))
            return -this.sqrt(2) / 2;

        let sum = 0;
        for (let i = 0; i < 20; i++) {
            sum += this.#intPower(-1, i) * this.#intPower(rad, 2 * i + 1) / this.factorial(2 * i + 1);
        }
        return sum; 
    }

    static cos(rad){
        if (typeof rad !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.cos");
        }
        if(Number.isNaN(rad) || rad == Infinity || rad == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.cos");
        }
        return this.sin(this.halfPi - rad);
    }

    static tan(rad) {
        if (typeof rad !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.tan");
        }
        if(Number.isNaN(rad) || rad == Infinity || rad == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.tan");
        }
        if (this.almostEqual(this.cos(rad), 0)) {
            throw new RangeError("cannot enter (pi/2 + k*pi) where k is an integer, division by 0, MyMath.tan");
        }
        return this.sin(rad) / this.cos(rad);
    }

    static cot(rad) {
        if (typeof rad !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.cot");
        }
        if(Number.isNaN(rad) || rad == Infinity || rad == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.cot");
        }
        if (this.almostEqual(this.sin(rad), 0)) {
            throw new RangeError("cannot enter (k*pi) where k is an integer, division by 0, MyMath.cot");
        }
        return this.cos(rad) / this.sin(rad);
    }

    static sec(rad) {
        if (typeof rad !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.sec");
        }
        if(Number.isNaN(rad) || rad == Infinity || rad == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.sec");
        }
        if (this.almostEqual(this.cos(rad), 0)) {
            throw new RangeError("cannot enter (pi/2 + k*pi) where k is an integer, division by 0, MyMath.sec");
        }
        return 1 / this.cos(rad);
    }

    static csc(rad) {
        if (typeof rad !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.csc");
        }
        if(Number.isNaN(rad) || rad == Infinity || rad == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.csc");
        }
        if (this.almostEqual(this.sin(rad), 0)) {
            throw new RangeError("cannot enter (k*pi) where k is an integer, division by 0, MyMath.csc");
        }
        return 1 / this.sin(rad);
    }

    static sinDeg(deg){
        if (typeof deg !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.sinDeg");
        }
        if(Number.isNaN(deg) || deg == Infinity || deg == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.sinDeg");
        }
        return this.sin(this.toRad(deg));
    }

    static cosDeg(deg){
        if (typeof deg !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.cosDeg");
        }
        if(Number.isNaN(deg) || deg == Infinity || deg == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.cosDeg");
        }
        return this.cos(this.toRad(deg));
    }

    static tanDeg(deg){
        if (typeof deg !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.tanDeg");
        }
        if(Number.isNaN(deg) || deg == Infinity || deg == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.tanDeg");
        }
        if (this.almostEqual(this.cosDeg(deg), 0)) {
            throw new RangeError("cannot enter (180 + k*180) where k is an integer, division by 0, MyMath.tanDeg");
        }
        return this.tan(this.toRad(deg));
    }

    static cotDeg(deg){
        if (typeof deg !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.cotDeg");
        }
        if(Number.isNaN(deg) || deg == Infinity || deg == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.cotDeg");
        }
        if (this.almostEqual(this.sinDeg(deg), 0)) {
            throw new RangeError("cannot enter (k*180) where k is an integer, division by 0, MyMath.cotDeg");
        }
        return this.cot(this.toRad(deg));
    }

    static secDeg(deg){
        if (typeof deg !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.secDeg");
        }
        if(Number.isNaN(deg) || deg == Infinity || deg == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.secDeg");
        }
        if (this.almostEqual(this.cosDeg(deg), 0)) {
            throw new RangeError("cannot enter (180 + k*180) where k is an integer, division by 0, MyMath.secDeg");
        }
        return this.sec(this.toRad(deg));
    }

    static cscDeg(deg){
        if (typeof deg !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.cscDeg");
        }
        if(Number.isNaN(deg) || deg == Infinity || deg == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.cscDeg");
        }
        if (this.almostEqual(this.sinDeg(deg), 0)) {
            throw new RangeError("cannot enter (k*180) where k is an integer, division by 0, MyMath.cscDeg");
        }
        return this.csc(this.toRad(deg));
    }

    static asin(num) {
        if (typeof num !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.asin");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.asin");
        }
        if (this.abs(num) > 1) {
            throw new RangeError("enter a number between -1 and 1, MyMath.asin");
        }
        if (this.almostEqual(num, 1))
            return this.halfPi;
        if (this.almostEqual(num, -1))
            return -this.halfPi;
        if (this.almostEqual(num, 0))
            return 0;
        if (this.almostEqual(num, 0.5))
            return this.pi / 6;
        if (this.almostEqual(num, -0.5))
            return -this.pi / 6;
        if (this.almostEqual(num, this.sqrt(3) / 2))
            return this.pi / 3;
        if (this.almostEqual(num, -this.sqrt(3) / 2))
            return -this.pi / 3;
        if (this.almostEqual(num, this.sqrt(2) / 2))
            return this.pi / 4;
        if (this.almostEqual(num, -this.sqrt(2) / 2))
            return -this.pi / 4;
        let low = -this.halfPi;
        let high = this.halfPi;
        let mid = 0, s;
        for (let i = 0; i < 600; i++) {
            mid = (low + high) / 2;
            s = this.sin(mid);
            if (s > num)
                high = mid;
            else
                low = mid;
        }
        return mid;
    }

    static acos(num) {
        if (typeof num !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.acos");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.acos");
        }
        if (num < -1 || num > 1) {
            throw new RangeError("enter a number between -1 and 1\n");
        }
        return this.halfPi - this.asin(num);
    }

    static atan(num) {
        if (typeof num !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.atan");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.atan");
        }
        let t = num / this.sqrt(1 + num * num);
        return this.asin(t);
    }

    static atan2(y, x) {
        if (typeof y !== "number" ) {
            throw new TypeError("Inputs must be numbers, MyMath.atan2 input1");
        }
        if (typeof x !== "number" ) {
            throw new TypeError("Inputs must be numbers, MyMath.atan2 input2");
        }
        if(Number.isNaN(y) || y == Infinity || y == -Infinity){
            throw new RangeError("Inputs must be finite numbers, MyMath.atan2 input1");
        }
        if(Number.isNaN(x) || x == Infinity || x == -Infinity){
            throw new RangeError("Inputs must be finite numbers, MyMath.atan2 input2");
        }
        if (x > 0)
            return this.atan(y / x);
        if (x < 0 && y >= 0)
            return this.atan(y / x) + this.pi;
        if (x < 0 && y < 0)
            return this.atan(y / x) - this.pi;
        if (x == 0 && y > 0)
            return this.halfPi;
        if (x == 0 && y < 0)
            return -this.halfPi;
        return 0;
    }

    static acot(num) {
        if (typeof num !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.acot");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.acot");
        }
        if (num == 0) {
            throw new RangeError("cannot enter 0 for acot, MyMath.acot");
        }
        let angle = this.atan(1 / num);
        if (num > 0)
            return angle;
        else
            return angle + this.pi;
    }

    static asec(num) {
        if (typeof num !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.asec");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.asec");
        }
        if (num == 0) {
            throw new RangeError("cannot enter 0 for asec, MyMath.asec");
        }
        if (this.abs(num) < 1) {
            throw new RangeError("cannot enter a number between -1 and 1 for asec, MyMath.asec");
        }
        return this.acos(1 / num);
    }

    static acsc(num) {
        if (typeof num !== "number" ) {
            throw new TypeError("Input must be a number, MyMath.acsc");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.acsc");
        }
        if (num == 0) {
            throw new RangeError("cannot enter 0 for acsc, MyMath.acsc");
        }
        if (this.abs(num) < 1) {
            throw new RangeError("cannot enter a number between -1 and 1 for acsc, MyMath.acsc");
        }
        return this.asin(1 / num);
    }

    // <----------------------------------logarithmic---------------------------------->

    // helper method
    static #logBinary(base, num, low, high, increasing) {
        if (typeof base !== "number") {
            throw new TypeError("Input must be a number, MyMath.#logBinary input1");
        }
        if(typeof num !== "number"){
            throw new TypeError("Input must be a number, MyMath.#logBinary input2");
        }
        if(typeof low !== "number"){
            throw new TypeError("Input must be a number, MyMath.#logBinary input3");
        }
        if(typeof high !== "number"){
            throw new TypeError("Input must be a number, MyMath.#logBinary input4");
        }
        if(typeof increasing !== "boolean"){
            throw new TypeError("Input must be a boolean, MyMath.#logBinary input5");
        }
        if(Number.isNaN(base) || base == Infinity || base == -Infinity ){
            throw new RangeError("Inputs must be finite numbers, MyMath.#logBinary input1");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity ){
            throw new RangeError("Inputs must be finite numbers, MyMath.#logBinary input2");
        }
        if(Number.isNaN(low) || low == Infinity || low == -Infinity ){
            throw new RangeError("Inputs must be finite numbers, MyMath.#logBinary input3");
        }
        if(Number.isNaN(high) || high == Infinity || high == -Infinity ){
            throw new RangeError("Inputs must be finite numbers, MyMath.#logBinary input4");
        }
        const precision = 1e-12;
        while (high - low > precision) {
            let mid = (low + high) / 2;
            let value = this.power(base, mid);
            if (increasing) {
                if (value > num)
                    high = mid;
                else
                    low = mid;
            } else {
                if (value > num)
                    low = mid;
                else
                    high = mid;
            }
        }
        return (low + high) / 2;
    }

    static log(base, num) {
        if (typeof base !== "number") {
            throw new TypeError("Input must be a number, MyMath.log input1");
        }
        if(typeof num !== "number"){
            throw new TypeError("Input must be a number, MyMath.log input2");
        }
        if(Number.isNaN(base) || base == Infinity || base == -Infinity){
            throw new RangeError("Inputs must be finite numbers, MyMath.log");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Inputs must be finite numbers, MyMath.log");
        }
        let validBase = (base != 1 && base > 0);
        let validNum = num > 0;
        let increasing = (base > 1);
        let positive = !(num > 1 ^ increasing);
        if (validBase && validNum) {
            if (positive && increasing) {
                let high = 1;
                while (this.power(base, high) < num)
                    high *= 2;
                return this.#logBinary(base, num, 0, high, true);
            } else if (increasing && !positive) {
                let low = -1;
                while (this.power(base, low) > num)
                    low *= 2;
                return this.#logBinary(base, num, low, 0, true);
            } else if (!increasing && !positive) {
                let low = -1;
                while (this.power(base, low) < num)
                    low *= 2;
                return this.#logBinary(base, num, low, 0, false);
            } else if (!increasing && positive) {
                let high = 1;
                while (this.power(base, high) > num)
                    high *= 2;
                return this.#logBinary(base, num, 0, high, false);
            }
            return NaN;
        } else if (base == 1 && validNum) {
            throw new RangeError("base cannot be 1\n");
        } else if (base <= 0 && validNum) {
            throw new RangeError("base cannot be less than or equal to 0\n");
        } else if (validBase && !validNum) {
            console.log("number cannot be less than or equal to 0, not defined in the real world\n");
            return NaN;
        } else {
            throw new RangeError("enter a valid base and number\n");
        }
    }

    static ln(num){
        if (typeof num !== "number") {
            throw new TypeError("Input must be a number, MyMath.ln");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.ln");
        }
        return this.log(this.e, num);
    }

    static log10(num){
        if (typeof num !== "number") {
            throw new TypeError("Input must be a number, MyMath.log10");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.log10");
        }
        return this.log(10, num);
    }

    static log2(num){
        if (typeof num !== "number") {
            throw new TypeError("Input must be a number, MyMath.log2");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.log2");
        }
        return this.log(2, num);
    }

    // <----------------------------------1 input functions---------------------------------->

    static factorial(num) {
        if (typeof num !== "number") {
            throw new TypeError("Input must be a number, MyMath.factorial");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.factorial");
        }
        if (num >= 2) {
            let b = 1;
            for (let i = 2; i <= num; i++) {
                b *= i;
            }
            return b;
        } else if ((num == 0) || (num == 1))
            return 1;
        else {
            console.log("enter a number greater than or equal 0\n");
            return NaN;
        }
    }

    static abs(num){
        if (typeof num !== "number") {
            throw new TypeError("Input must be a number, MyMath.abs");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.abs");
        }
        return num < 0 ? -num : num;
    }

    static floor(num){
        if (typeof num !== "number") {
            throw new TypeError("Input must be a number, MyMath.floor");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.floor");
        }
        let truncated = num - (num % 1);
        if (num < 0 && !this.almostEqual(num, truncated))
            return truncated - 1;
        return truncated;
    }

    static ceil(num) {
        if (typeof num !== "number") {
            throw new TypeError("Input must be a number, MyMath.ceil");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.ceil");
        }
        let truncated = num - (num % 1);
        if (num > 0 && !this.almostEqual(num, truncated))
            return truncated + 1;
        return truncated;
    }

    static round(num) {
        if (typeof num !== "number") {
            throw new TypeError("Input must be a number, MyMath.round");
        }
        if(Number.isNaN(num) || num == Infinity || num == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.round");
        }
        return (num > 0 ? this.floor(num + 0.5) : this.ceil(num - 0.5));
    }

    // <----------------------------------2 input functions---------------------------------->

    static almostEqual(a, b) {
        if (typeof a !== "number") {
            throw new TypeError("Input must be a number, MyMath.almostEqual input1");
        }
        if (typeof b !== "number") {
            throw new TypeError("Input must be a number, MyMath.almostEqual input2");
        }
        if(Number.isNaN(a) || a == Infinity || a == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.almostEqual input1");
        }
        if(Number.isNaN(b) || b == Infinity || b == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.almostEqual input2");
        }
        const ABS_EPS = 1e-12;
        const REL_EPS = 1e-9;
        let diff = this.abs(a - b);
        if (diff <= ABS_EPS)
            return true;
        return diff <= this.max(this.abs(a), this.abs(b)) * REL_EPS;
    }

    static max(a, b){
        if (typeof a !== "number") {
            throw new TypeError("Input must be a number, MyMath.max input1");
        }
        if (typeof b !== "number") {
            throw new TypeError("Input must be a number, MyMath.max input2");
        }
        if(Number.isNaN(a) || a == Infinity || a == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.max input1");
        }
        if(Number.isNaN(b) || b == Infinity || b == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.max input2");
        }
        return a > b ? a : b;
    }

    static min(a, b){
        if (typeof a !== "number") {
            throw new TypeError("Input must be a number, MyMath.min input1");
        }
        if (typeof b !== "number") {
            throw new TypeError("Input must be a number, MyMath.min input2");
        }
        if(Number.isNaN(a) || a == Infinity || a == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.min input1");
        }
        if(Number.isNaN(b) || b == Infinity || b == -Infinity){
            throw new RangeError("Input must be a finite number, MyMath.min input2");
        }
        return a < b ? a : b;
    }
}

class Complex{

    // <----------------------------variables------------------------->

    static get pi() { 
        return MyMath.pi; 
    }
    #real;
    #imag;
    #radius;
    #theta;

    // <------------------------constructors------------------------>

    constructor(realOrComplex, imag) {
        if(typeof realOrComplex !== "number" && !(realOrComplex instanceof Complex)){
            throw new TypeError("Input must be a number or a Complex object, Complex.set input1");
        }
        if(typeof imag !== "number" && typeof imag !== "undefined"){
            throw new TypeError("Input must be a number or undefined, Complex.set input2");
        }
        if(typeof realOrComplex === "number" && (Number.isNaN(realOrComplex) || realOrComplex == Infinity || realOrComplex == -Infinity)){
            throw new RangeError("Input must be a finite number, Complex.set input1");
        }
        if(typeof imag === "number" && (Number.isNaN(imag) || imag == Infinity || imag == -Infinity)){
            throw new RangeError("Input must be a finite number, Complex.set input2");
        }
        if (realOrComplex instanceof Complex) {
            this.#real = realOrComplex.#real;
            this.#imag = realOrComplex.#imag;
        } 
        else if (typeof realOrComplex === "number" && typeof imag === "number") {
            this.#real = realOrComplex;
            this.#imag = imag;
        } 
        else if (typeof realOrComplex === "number" && typeof imag === "undefined") {
            this.#real = realOrComplex;
            this.#imag = 0;
        }
        else if (typeof realOrComplex === "undefined" && typeof imag === "number") {
            this.#real = 0;
            this.#imag = imag;
        }
        else if (typeof realOrComplex === "undefined" && typeof imag === "undefined") {
            this.#real = 0;
            this.#imag = 0;
        }
        this.#updatePolar();
    }

    // <-----------------------getters and setters------------------>

    get real() {
        return this.#real; 
    }

    get imag() {
        return this.#imag; 
    }

    get radius() {
        return this.#radius; 
    }

    get theta() {
        return this.#theta; 
    }

    set real(real) { 
        if(typeof real !== "number"){
            throw new TypeError("Input must be a number, Complex.set real");
        }
        if(Number.isNaN(real) || real == Infinity || real == -Infinity){
            throw new RangeError("Input must be a finite number, Complex.set real");
        }
        this.#real = real; 
        this.#updatePolar(); 
    }

    set imag(imag) { 
        if(typeof imag !== "number"){
            throw new TypeError("Input must be a number, Complex.set imag");
        }
        if(Number.isNaN(imag) || imag == Infinity || imag == -Infinity){
            throw new RangeError("Input must be a finite number, Complex.set imag");
        }
        this.#imag = imag; 
        this.#updatePolar(); 
    }

    set(realOrComplex, imag) {
        if(typeof realOrComplex !== "number" && !(realOrComplex instanceof Complex)){
            throw new TypeError("Input must be a number or a Complex object, Complex.set input1");
        }
        if(typeof imag !== "number" && typeof imag !== "undefined"){
            throw new TypeError("Input must be a number or undefined, Complex.set input2");
        }
        if(typeof realOrComplex === "number" && (Number.isNaN(realOrComplex) || realOrComplex == Infinity || realOrComplex == -Infinity)){
            throw new RangeError("Input must be a finite number, Complex.set input1");
        }
        if(typeof imag === "number" && (Number.isNaN(imag) || imag == Infinity || imag == -Infinity)){
            throw new RangeError("Input must be a finite number, Complex.set input2");
        }
        if (realOrComplex instanceof Complex) {
            this.#real = realOrComplex.#real;
            this.#imag = realOrComplex.#imag;
        } 
        else if (typeof realOrComplex === "number" && typeof imag === "number") {
            this.#real = realOrComplex;
            this.#imag = imag;
        } 
        else if (typeof realOrComplex === "number" && typeof imag === "undefined") {
            this.#real = realOrComplex;
            this.#imag = 0;
        }
        else if (typeof realOrComplex === "undefined" && typeof imag === "number") {
            this.#real = 0;
            this.#imag = imag;
        }
        else if (typeof realOrComplex === "undefined" && typeof imag === "undefined") {
            this.#real = 0;
            this.#imag = 0;
        }
        this.#updatePolar();
    }

    // <----------------methods------------------->

    static add(a, b) {
        if (!(a instanceof Complex)) {
            throw new TypeError("Input must be Complex objects, Complex.add input1");
        }
        if(!(b instanceof Complex)){
            throw new TypeError("Input must be Complex objects, Complex.add input2");
        }
        return new Complex(a.real + b.real, a.imag + b.imag);
    }

    add(b) {
        if (!(b instanceof Complex)) {
            throw new TypeError("Input must be a Complex object, Complex.add");
        }
        return new Complex(this.real + b.real, this.imag + b.imag);
    }

    static sub(a, b) {
        if (!(a instanceof Complex)) {
            throw new TypeError("Input must be Complex objects, Complex.sub input1");
        }
        if(!(b instanceof Complex)){
            throw new TypeError("Input must be Complex objects, Complex.sub input2");
        }
        return new Complex(a.real - b.real, a.imag - b.imag);
    }

    sub(b) {
        if (!(b instanceof Complex)) {
            throw new TypeError("Input must be a Complex object, Complex.sub");
        }
        return new Complex(this.real - b.real, this.imag - b.imag);
    }

    static mul(a, b) {
        if (!(a instanceof Complex)) {
            throw new TypeError("Input must be Complex objects, Complex.mul input1");
        }
        if(!(b instanceof Complex)){
            throw new TypeError("Input must be Complex objects, Complex.mul input2");
        }
        return new Complex(a.real * b.real - a.imag * b.imag, a.real * b.imag + a.imag * b.real);
    }

    mul(b) {
        if (!(b instanceof Complex)) {
            throw new Error("Input must be a Complex object, Complex.mul");
        }
        return new Complex(this.real * b.real - this.imag * b.imag, this.real * b.imag + this.imag * b.real);
    }

    static div(a, b) {
        if (!(a instanceof Complex)) {
            throw new TypeError("Input must be Complex objects, Complex.div input1");
        }
        if(!(b instanceof Complex)){
            throw new TypeError("Input must be Complex objects, Complex.div input2");
        }
        let conjugate = b.real * b.real + b.imag * b.imag;
        if (MyMath.almostEqual(conjugate, 0)) {
            console.log("cant devide by zero");
            return null;
        }
        return new Complex((a.real * b.real + a.imag * b.imag) / conjugate,
                (a.imag * b.real - a.real * b.imag) / conjugate);
    }

    div(b) {
        if (!(b instanceof Complex)) {
            throw new Error("Input must be a Complex object, Complex.div");
        }
        let conjugate = b.real * b.real + b.imag * b.imag;
        if (MyMath.almostEqual(conjugate, 0)) {
            console.log("cant devide by zero");
            return null;
        }
        return new Complex((this.real * b.real + this.imag * b.imag) / conjugate,
                (this.imag * b.real - this.real * b.imag) / conjugate);
    }

    static abs(a) {
        if (!(a instanceof Complex)) {
            throw new Error("Input must be a Complex object, Complex.abs");
        }
        return MyMath.sqrt(a.real * a.real + a.imag * a.imag);
    }

    abs() {
        return MyMath.sqrt(this.real * this.real + this.imag * this.imag);
    }

    static arg(a) {
        if (!(a instanceof Complex)) {
            throw new Error("Input must be a Complex object, Complex.arg");
        }
        return MyMath.atan2(a.imag, a.real);
    }

    arg() {
        return MyMath.atan2(this.imag, this.real);
    }

    static conj(a) {
        if (!(a instanceof Complex)) {
            throw new Error("Input must be a Complex object, Complex.conj");
        }
        return new Complex(a.real, -a.imag);
    }

    conj() {
        return new Complex(this.real, -this.imag);
    }

    static polar(radiusOrComplex, theta) {
        if (typeof radiusOrComplex === "number" && typeof theta === "number") {
            return new Complex(radiusOrComplex * MyMath.cos(theta), radiusOrComplex * MyMath.sin(theta));
        }
        else if (radiusOrComplex instanceof Complex && typeof theta === "undefined") {
            return new Complex(radiusOrComplex.radius * MyMath.cos(radiusOrComplex.theta),
                               radiusOrComplex.radius * MyMath.sin(radiusOrComplex.theta));
        } 
        else {
            throw new TypeError("Invalid input for Complex.polar");
        }
    }

    polar() {
        return new Complex(this.radius * MyMath.cos(this.theta),
                           this.radius * MyMath.sin(this.theta));
    }

    // helper method
    #updatePolar() {
        this.#radius = this.abs();
        this.#theta = this.arg();
    }

    static display(a) {
        if (!(a instanceof Complex)) {
            throw new Error("Input must be a Complex object, Complex.display");
        }
        if (a == null) {
            console.log("null");
            return;
        }
        if (MyMath.abs(a.imag) < 1e-6)
            console.log(`${a.real.toFixed(6)}`);
        else if (MyMath.abs(a.real) < 1e-6)
            console.log(`${a.imag.toFixed(6)}i`);
        else if (a.imag < -1e-6)
            console.log(`${a.real.toFixed(6)} - ${(-a.imag).toFixed(6)}i`);
        else
            console.log(`${a.real.toFixed(6)} + ${a.imag.toFixed(6)}i`);
    }

    display() {
        if (MyMath.abs(this.imag) < 1e-6)
            console.log(`${this.real.toFixed(6)}`);
        else if (MyMath.abs(this.real) < 1e-6)
            console.log(`${this.imag.toFixed(6)}i`);
        else if (this.imag < -1e-6)
            console.log(`${this.real.toFixed(6)} - ${(-this.imag).toFixed(6)}i`);
        else
            console.log(`${this.real.toFixed(6)} + ${this.imag.toFixed(6)}i`);
    }

    static displayPolar(a) {
        if (!(a instanceof Complex)) {
            throw new Error("Input must be a Complex object, Complex.displayPolar");
        }
        if (a == null) {
            console.log("null");
            return;
        }
        if (MyMath.abs(a.radius) < 1e-6)
            console.log(`${(0).toFixed(6)}`);
        else if (MyMath.almostEqual(a.theta % (2 * this.pi), 0))
            console.log(`${a.radius.toFixed(6)}`);
        else if (MyMath.almostEqual(a.theta % (2 * this.pi), this.pi))
            console.log(`${(-a.radius).toFixed(6)}`);
        else
            console.log(`${a.radius.toFixed(6)} * e^( ${(a.theta % (2 * this.pi)).toFixed(6)} i)`);
    }

    displayPolar() {
        if (MyMath.abs(this.radius) < 1e-6)
            console.log(`${(0).toFixed(6)}`);
        else if (MyMath.almostEqual(this.theta % (2 * this.pi), 0))
            console.log(`${this.radius.toFixed(6)}`);
        else if (MyMath.almostEqual(this.theta % (2 * this.pi), this.pi))
            console.log(`${(-this.radius).toFixed(6)}`);
        else
            console.log(`${this.radius.toFixed(6)} * e^( ${(this.theta % (2 * this.pi)).toFixed(6)} i)`);
    }

    // helper method
    static #powRealReal(base, power) {
        if (typeof base !== "number") {
            throw new TypeError("Input must be a number, Complex.powRealReal input1");
        }
        if(typeof power !== "number"){
            throw new TypeError("Input must be a number, Complex.powRealReal input2");
        }
        if(Number.isNaN(base) || base == Infinity || base == -Infinity){
            throw new RangeError("Input must be a finite number, Complex.powRealReal input1");
        }
        if(Number.isNaN(power) || power == Infinity || power == -Infinity){
            throw new RangeError("Input must be a finite number, Complex.powRealReal input2");
        }
        let integerPower = MyMath.almostEqual(power, MyMath.round(power));
        let negativeBase = base < 0;
        if (negativeBase && !integerPower) {
            let result = polar(MyMath.power(-base, power), power * this.pi);
            return result;
        }
        return new Complex(MyMath.power(base, power), 0);
    }

    // helper method
    static #powComplexReal(base, power) {
        if (!(base instanceof Complex)) {
            throw new TypeError("Input must be a Complex object, Complex.powComplexReal input1");
        }
        if(typeof power !== "number"){
            throw new TypeError("Input must be a number, Complex.powComplexReal input2");
        }
        if(Number.isNaN(power) || power == Infinity || power == -Infinity){
            throw new RangeError("Input must be a finite number, Complex.powComplexReal input2");
        }
        let radius = MyMath.power(base.radius, power);
        let theta = power * base.theta;
        return this.polar(radius, theta);
    }

    // helper method
    static #powRealComplex(base, power) {
        if (typeof base !== "number") {
            throw new TypeError("Input must be a number, Complex.powRealComplex input1");
        }
        if(!(power instanceof Complex)){
            throw new TypeError("Input must be a Complex object, Complex.powRealComplex input2");
        }
        if(Number.isNaN(base) || base == Infinity || base == -Infinity){
            throw new RangeError("Input must be a finite number, Complex.powRealComplex input1");
        }
        if (MyMath.almostEqual(base, 0)) {
            console.log("0 to a complex power is undefined\n");
            return null;
        }
        if (base > 0) {
            let radius = MyMath.power(base, power.real);
            let theta = power.imag * MyMath.ln(base);
            return this.polar(radius, theta);
        }
        let radius = MyMath.power(-base, power.real) * MyMath.exp(-power.imag * this.pi);
        let theta = this.pi * power.real + power.imag * MyMath.ln(-base);
        return this.polar(radius, theta);
    }

    // helper method
    static #powComplexComplex(base, power) {
        if (!(base instanceof Complex)) {
            throw new TypeError("Input must be a Complex object, Complex.powComplexComplex input1");
        }
        if(!(power instanceof Complex)){
            throw new TypeError("Input must be a Complex object, Complex.powComplexComplex input2");
        }
        let radius = MyMath.power(base.radius, power.real) * MyMath.exp(-power.imag * base.theta);
        let theta = power.imag * MyMath.ln(base.radius) + power.real * base.theta;
        return this.polar(radius, theta);
    }

    static complexPower(base, power) {
        if (!(base instanceof Complex)) {
            throw new TypeError("Input must be a Complex object, Complex.complexPower input1");
        }
        if(!(power instanceof Complex)){
            throw new TypeError("Input must be a Complex object, Complex.complexPower input2");
        }
        let realPower = MyMath.almostEqual(power.imag, 0);
        let realBase = MyMath.almostEqual(base.imag, 0);
        if (realBase && realPower) {
            return this.#powRealReal(base.real, power.real);
        }
        if (!realBase && realPower) {
            return this.#powComplexReal(base, power.real);
        }
        if (realBase && !realPower) {
            return this.#powRealComplex(base.real, power);
        }
        return this.#powComplexComplex(base, power);
    }

    static sqrt(a) {
        if (!(a instanceof Complex)) {
            throw new TypeError("Input must be a Complex object, Complex.sqrt");
        }
        return this.polar(MyMath.sqrt(a.radius), a.theta / 2);
    }

    static exp(a) {
        if (!(a instanceof Complex)) {
            throw new TypeError("Input must be a Complex object, Complex.exp");
        }
        return this.polar(MyMath.exp(a.real), a.imag);
    }

    static ln(a) {
        if (!(a instanceof Complex)) {
            throw new TypeError("Input must be a Complex object, Complex.ln");
        }
        return new Complex(MyMath.ln(a.radius), a.theta);
    }

    static log(a) {
        if (!(a instanceof Complex)) {
            throw new TypeError("Input must be a Complex object, Complex.log");
        }
        return this.div(this.ln(a), new Complex(MyMath.ln(10), 0));
    }
}

class Calculas{
    static derivative(f,x){
        if(typeof f !== "function"){
            throw new TypeError("Input must be a function, Calculas.derivative input1");
        }
        if(f.length !== 1){
            throw new TypeError("Input function must be with one input, Calculas.derivative input1");
        }
        if(typeof x !== "number"){
            throw new TypeError("Input must be a number, Calculas.derivative input2");
        }
        if(Number.isNaN(x) || x == Infinity || x == -Infinity){
            throw new RangeError("Input number must be a finite number, Calculas.derivative input2");
        }
        let h = 1e-6 * MyMath.max(1.0, MyMath.abs(x));
        return (f(x + h) - f(x - h)) /(2 * h);
    }

    static nthDerivative(f, x, n) {
        if(typeof f !== "function"){
            throw new TypeError("Input must be a function, Calculas.derivative input1");
        }
        if(f.length !== 1){
            throw new TypeError("Input function must be with one input, Calculas.derivative input1");
        }
        if(typeof x !== "number"){
            throw new TypeError("Input must be a number, Calculas.derivative input2");
        }
        if(Number.isNaN(x) || x == Infinity || x == -Infinity){
            throw new RangeError("Input number must be a finite number, Calculas.derivative input2");
        }
        if(typeof n !== "number"){
            throw new TypeError("Input must be a number, Calculas.derivative input3");
        }
        if(Number.isNaN(n) || n == Infinity || n == -Infinity){
            throw new RangeError("Input number must be a finite number, Calculas.derivative input3");
        }
        n -= n%1;
        if (n == 0)
            return f.call(x);
        let g = y => this.nthDerivative(f, y, n - 1);
        return this.derivative(g, x);
    }

    static integration(f, a, b) {
        if(typeof f !== "function"){
            throw new TypeError("Input must be a function, Calculas.integration input1");
        }
        if(f.length !== 1){
            throw new TypeError("Input function must be with one input, Calculas.integration input1");
        }
        if(typeof a !== "number"){
            throw new TypeError("Input must be a number, Calculas.integration input2");
        }
        if(Number.isNaN(a) || a == Infinity || a == -Infinity){
            throw new RangeError("Input number must be a finite number, Calculas.integration input2");
        }
        if(typeof b !== "number"){
            throw new TypeError("Input must be a number, Calculas.integration input3");
        }
        if(Number.isNaN(b) || b == Infinity || b == -Infinity){
            throw new RangeError("Input number must be a finite number, Calculas.integration input3");
        }
        let n = 1000000;
        let h = (b - a) / n;
        let sum = 0.5 * (f.call(a) + f.call(b));
        for (let i = 1; i < n; i++) {
            let x = a + i * h;
            sum += f.call(x);
        }
        return sum * h;
    }
}

class MyRandom {
    static #seed = Date.now();
    static #a = 1664525;
    static #c = 1013904223;
    static #m = 2 ** 32;

    static random(a, b){
        if(Number.isNaN(a) || a == Infinity || a == -Infinity){
            throw new RangeError("Inputs must be a finite number, MyRandom.random input1");
        }
        if(Number.isNaN(b) || b == Infinity || b == -Infinity){
            throw new RangeError("Inputs must be a finite number, MyRandom.random input2");
        }
        let isNumberA = typeof a === "number";
        let isNumberB = typeof b === "number";
        let x, y;
        if(isNumberA && isNumberB){
            x=a;
            y=b;
            let min = MyMath.min(x, y);
            let max = MyMath.max(x, y);
            return min + (max - min) * this.random();
        }
        else if(isNumberA && !isNumberB){
            return a * this.random();
        }
        else if(!isNumberA && isNumberB){
            return b - b * this.random();
        }
        else{
            this.#seed = ((this.#a * this.#seed + this.#c) % this.#m);
            return this.#seed / this.#m;
        }
    }

    static randomInt(a, b){
        if(Number.isNaN(a) || a == Infinity || a == -Infinity){
            throw new RangeError("Inputs must be a finite number, MyRandom.randomInt input1");
        }
        if(Number.isNaN(b) || b == Infinity || b == -Infinity){
            throw new RangeError("Inputs must be a finite number, MyRandom.randomInt input2");
        }
        let x,y;
        if(typeof a !== "number"){
            x=0;
        }
        else{
            x=a;
        }
        if(typeof b !== "number"){
            y=0;
        }
        else{
            y=b;
        }
        x -= x % 1;
        y -= y % 1;
        let min = MyMath.min(x, y);
        let max = MyMath.max(x, y);
        let result =  min + (max - min + 1) * this.random();
        result -= result % 1;
        return result;
    }
}