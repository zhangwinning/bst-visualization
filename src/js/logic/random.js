
const MAX = 100

const generatorRandom = (nums) => {
    let arr = [];
    while (arr.length < nums) {
        const randomnumber = Math.floor(Math.random() * MAX) + 1;
        if (arr.indexOf(randomnumber) > -1) continue;
        arr.push(randomnumber);
    }
    return arr;
};


module.exports = generatorRandom
