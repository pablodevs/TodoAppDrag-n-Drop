const sideSize = 6; // Grid de lado 6
const gridPosBase = [
    [1, 1],
    [4, 1],
    [2, 2],
    [6, 2],
    [5, 3],
    [1, 4],
    [4, 4],
    [3, 5],
    [6, 5],
];
const encriptedMessage = "lróaon. sg sdersoildsu.:.cc kiomamii";

const decrypt = (message, holesGrid) => {
    /*
        Primero rellenamos un grid 6×6 con el mensaje letra a letra en filas de 6 (sideSize)
         - Ya hemos comprobado previamente que la longitud del mensaje es 36, igual al número de casillas en el grid (36 == 6*6)
    */
    let grid = [...message].reduce(
        (solución, letter, index) => {
            solución[Math.floor(index / sideSize)][
                index - Math.floor(index / sideSize) * sideSize
            ] = letter;
            return solución;
        },
        Array(sideSize)
            .fill()
            .map(() => Array(sideSize).fill(" "))
    );

    // Corregimos el 'holesGrid' para que esté en formato (row,col) de 0 a 5 en lugar de (col,row) 0 a 6:
    let correctedHolesGrid = holesGrid.map(child => [
        child[1] - 1,
        child[0] - 1,
    ]);

    // Ahora lo formateamos para que solo tenga 0 (no hay hueco) o 1 (hay hueco)
    let formatedHolesGrid = [];
    for (let row = 0; row < sideSize; row++) {
        let newRow = [];
        for (let col = 0; col < sideSize; col++) {
            if (
                correctedHolesGrid
                    .map(JSON.stringify)
                    .includes(JSON.stringify([row, col]))
            )
                newRow.push(1);
            else newRow.push(0);
        }
        formatedHolesGrid.push(newRow);
    }
    /* formatedHolesGrid:
        [
            [ 1, 0, 0, 1, 0, 0 ],
            [ 0, 1, 0, 0, 0, 1 ],
            [ 0, 0, 0, 0, 1, 0 ],
            [ 1, 0, 0, 1, 0, 0 ],
            [ 0, 0, 1, 0, 0, 1 ],
            [ 0, 0, 0, 0, 0, 0 ]
        ]
    */

    // Finalmente sacamos la url rotando la formatedHolesGrid 90º, 4 veces
    let url = "";
    while (url.length < sideSize * sideSize) {
        for (let i = 0; i < sideSize; i++) {
            for (let j = 0; j < sideSize; j++) {
                if (formatedHolesGrid[i][j]) url += grid[i][j];
            }
        }
        formatedHolesGrid = rotateGrid(formatedHolesGrid);
    }
    return url;
};

/*
    Iba a sacar la traspuesta de la matriz y después dar la vuelta a sus filas (o primero dar la vuelta y luego transponer)...
     - Transpose ------> grid.forEach((row, index) => row.forEach((num, numIndex) => transposedGrid[numIndex][index] = num));
     - Reverse rows: --> grid.map(row => row.reverse())
    Pero luego encontré este increíble enfoque para matrices cuadradas ⬇⬇⬇ [credito para Nitin Jadhav (https://stackoverflow.com/users/741251/nitin-jadhav)]:
*/
const rotateGrid = (grid, direction = "clockwise") => {
    if (direction === "counter-clockwise")
        return grid[0].map((val, index) =>
            grid.map(row => row[row.length - 1 - index])
        );
    return grid[0].map((val, index) => grid.map(row => row[index]).reverse());
};

const decryptedMessage = decrypt(encriptedMessage, gridPosBase);
console.log(decryptedMessage);
