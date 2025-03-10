const useDevideName = (name) => {
    const namePart01 = name.split('%20')[0];
    const namePart02 = name.split('%20')[1];
    return [namePart01, namePart02];
};

export default useDevideName;