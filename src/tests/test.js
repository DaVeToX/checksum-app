const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../src/app");
const expect = chai.expect;

chai.use(chaiHttp);

describe("Check Checksum API", () => {
    // Positive test
    it("Should return true if 2 numbers combined are equal to the target value", (done) => {
        chai
        .request(app)
        .post("/checksum")
        .send({ listA: [1, 65, 23, 4, 7], listB: [2, 6, 2, 7, 8], target: 10 })
        .end((err, res) => {
            expect(res).to.have.status(200);
            expect(res.body.result).to.be.true;
            expect(res.body.equation).to.equal("3 + 6 = 9");
            done();
        });
    });
    // Negative test
    it("Should return false if no 2 numbers have a sum equal to the target value", (done) => {
        chai
            .request(app)
            .post("/checksum")
            .send({ listA: [1, 65, 23, 4, 7], listB: [2, 6, 2, 7, 8], target: 100 })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.result).to.be.false;
                done();
            });
    });
    // Negative test
    it("Should return an error if listA, listB or target is missing", (done) => {
        chai
            .request(app)
            .post("/checksum")
            .send({ listA: [1, 2, 3], target: 5 }) // listB is missing
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.error).to.equal("Missing data in the request");
                done();
            });
    });
});
