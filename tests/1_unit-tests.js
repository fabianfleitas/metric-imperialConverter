const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  suite('Get Number', function () {
    // #1
    test('Whole number input', function (done) {
      assert.equal(convertHandler.getNum("5kg"),5);
      done()
    });
    // #2
    test('Decimal number input', function (done) {
      assert.equal(convertHandler.getNum("10.1mi"),10.1);
      done()
    });
    // #3
    test('Fractional number input', function (done) {
      assert.equal(convertHandler.getNum("1/2L"),0.5);
      done()
    });
     // #4
    test('Fractional number with decimal', function (done) {
      assert.equal(convertHandler.getNum("1/2.5gal"),0.4);
      done()
    });
     // #5
    test('Double fraction', function (done) {
      assert.equal(convertHandler.getNum("5/2/3L"),false);
      done()
    });
      // #6
    test('Default Number', function (done) {
      assert.equal(convertHandler.getNum("kg"),1);
      done()
    });
  })
  suite('Get Unit',function(){
    //#7
    test('Valid Input Unit', function (done) {
      assert.equal(convertHandler.getUnit("100lbs"),"lbs")
      done()
    })
     //#8
    test('Invalid Input Unit', function (done) {
      assert.equal(convertHandler.getUnit("5g"),false)
      done()
    })
     //#9
    test('Each Valid Input Unit', function (done) {

      const inputs = ["1gal", "1.5L", "5mi", "20km", "100lbs", "3kg"]
      const units = ["gal", "L", "mi", "km", "lbs", "kg"]

      inputs.forEach((item,index) =>{
        assert.equal(convertHandler.getUnit(item),units[index])
      })
      done()
    })
  });

  suite('Get Spelled out String',function(){
     //#10
    test('Correct Spelled Out String', function (done) {

      const inputs = ["gal", "L", "mi", "km", "lbs", "kg"]
       const spelled= ["gallons","liters","miles","kilometers","pounds","kilograms"]

      inputs.forEach((item,index) =>{
        assert.equal(convertHandler.spellOutUnit(item),spelled[index])
      })
      done()
      })
  })
  suite('Get Converted Unit',function(){
    //#11
    test('gal to L',function(done){
        assert.equal(convertHandler.getReturnUnit("gal"),"L")
      done()
    })
    //#12
     test('L to gal',function(done){
        assert.equal(convertHandler.getReturnUnit("L"),"gal")
      done()
    })
    //#13
     test('mi to km',function(done){
        assert.equal(convertHandler.getReturnUnit("mi"),"km")
      done()
    })
    //#14
     test('km to km',function(done){
        assert.equal(convertHandler.getReturnUnit("km"),"mi")
      done()
    })
     //#15
     test('lbs to kg',function(done){
        assert.equal(convertHandler.getReturnUnit("lbs"),"kg")
      done()
    })
     //#16
     test('kg to lbs',function(done){
        assert.equal(convertHandler.getReturnUnit("kg"),"lbs")
      done()
    })
  })
});

