const generateBoxStyles = value => {
    if (!value) {
        return;
    }

    const top = value?.top || 0;
    const right = value?.right || 0;
    const bottom = value?.bottom || 0;
    const left = value?.left || 0;

    if (top === right && right === bottom && bottom === left) {
        return `${top}`;
    }
    return `${top} ${right} ${bottom} ${left}`;
};
export default generateBoxStyles;
