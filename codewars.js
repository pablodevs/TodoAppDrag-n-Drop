const getOuterCoords = size => {
    /*
        Función que recorre el anillo externo de una matriz size × size
        Ejemplo, para una 3×3:
            start ---------------->
            ^ (0, 0) (0, 1) (0, 2) |
            | (1, 0)        (1, 2) |
            | (2, 0) (2, 1) (2, 2) v
            <---------------------
    */
    // inicializo los arrays que van a contener las coordenadas i y j
    let [arrayi, arrayj] = [[], []];

    const specialPush = (array, num, times) => {
        // Agarra un array y le añade 'times' veces el valor 'num'
        for (let k = 0; k < times; k++) {
            array.push(num);
        }
    };
    const fillOuterCoords = (array, cond, num, size) => {
        // Rellena con recursion los arrays
        if (num === size) return;
        else {
            if (cond === "i") {
                if (num === 0) specialPush(array, num, size - 1);
                else if (num === size - 1) specialPush(array, num, size - 2);
            }
            array.push(num);
            fillOuterCoords(array, cond, num + 1, size); // recursion call
            if (cond === "j") {
                if (num === 0) specialPush(array, num, size - 1);
                else if (num === size - 1) specialPush(array, num, size - 2);
            }
            array.push(num);
            return;
        }
    };

    fillOuterCoords(arrayi, "i", 0, size);
    fillOuterCoords(arrayj, "j", 0, size);

    let finalArray = arrayi.map((e, index) => [e, arrayj[index]]);
    finalArray.pop();

    finalArray.forEach(e => console.log(`(${e[0]}, ${e[1]})`));
    return finalArray;
};

function solvePuzzle(clues) {
    const size = clues.length / 4;

    let matrix = [];

    for (let i = 0; i < 4; i++) {
        let row = [];
        for (let j = 0; j < 4; j++) {
            if (i === 0 || j === 0 || i === size - 1 || j === size - 1) {
                // if ([0, size - 1].includes(i) && [0, size - 1].includes(j)) {
                //     // Corners
                //     row.push(2);
                // } else {
                //     // Outer ring numbers
                //     row.push(1);
                // }
            } else row.push(0);
        }
        matrix.push(row);
    }
    return matrix;
}

var clues = [2, 2, 1, 3, 2, 2, 3, 1, 1, 2, 2, 3, 3, 2, 1, 3];
// console.log(solvePuzzle(clues));

getOuterCoords(7);
