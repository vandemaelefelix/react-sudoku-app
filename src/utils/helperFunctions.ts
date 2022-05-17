const getTimeString = (timeNumber: number) => {
    const minutes = Math.floor(timeNumber / 60);
    const seconds = timeNumber - minutes * 60;
    return `${minutes <= 9 ? '0' : ''}${minutes}:${seconds <= 9 ? '0' : ''}${seconds}`;
};

export default getTimeString;
