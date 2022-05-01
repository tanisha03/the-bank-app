export const debouncedFunction = (cb, time) => {
    let timer;
    return function(...args) {
        if(timer) clearInterval(timer);
        timer = setTimeout(() => {
            cb(...args);
        }, time);
    }
}