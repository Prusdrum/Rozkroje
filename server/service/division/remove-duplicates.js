const removeDuplicates = (dataToCompact) => {
    const data = dataToCompact.map(a => ({ length: a.length, count: a.count }));

    for (let i = 0; i < data.length; i += 1) {
        let refElement = data[i];

        for (let j = i + 1; j < data.length; j += 1) {
            let checkedElement = data[j];
            if (checkedElement.length === refElement.length) {
                refElement.count += checkedElement.count;
                checkedElement.count = 0;
            }
        }
    }

    return data.filter(element => element.count > 0);
}

module.exports = removeDuplicates;
