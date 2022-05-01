export const debouncedFunction = (cb, time) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            cb(...args);
        }, time);
    }
}