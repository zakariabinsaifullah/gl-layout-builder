const generateBoxStyles = value => {
    if (!value) {
        return;
    }

    const top = value?.top || '';
    const right = value?.right || '';
    const bottom = value?.bottom || '';
    const left = value?.left || '';

    if (top === right && right === bottom && bottom === left) {
        return `${top}`;
    }
    return `${top} ${right} ${bottom} ${left}`;
};
export default generateBoxStyles;
