const useSwicth = (name) => {
    const part1 = name.split('%20')[0];
    const part2 = name.split('%20')[1];
    const part3 = part1.concat(" ");
    const fullName = part3.concat(part2);
    return fullName;
}

export default useSwicth;