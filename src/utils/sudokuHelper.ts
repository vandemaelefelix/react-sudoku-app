export const initializeSudoku = (): any[] => {
    let newSudoku: any[] = [];

    for (let row = 0; row < 9; row++) {
        console.log(row);
        let rowArray = [];

        for (let cell = 0; cell < 9; cell++) {
            rowArray.push({
                id: parseInt(`${row}${cell}`),
                value: parseInt(`${row}${cell}`),
                selected: false,
            });
        }

        newSudoku.push(rowArray);
    }

    return newSudoku;
};
