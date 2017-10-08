const ga = window.ga;

export const calculateClicked = (data, refLength) => {
    const label = JSON.stringify(data);

    const lengths = _.chain(data)
        .map('length')
        .uniq()
        .value();

    const uniqLengths = lengths.length;
    const maxLength = _.max(lengths);
    const minLength = _.min(lengths);

    const elementSum = _.chain(data)
        .map('count')
        .sum()
        .value();

    calculationEvent('calculate', {
        uniqLengths,
        maxLength,
        minLength,
        elementSum,
        refLength
    }); 
}

export const referenceLengthChanged = (newLength) => {
    calculationEvent('referenceLengthChanged', newLength); 
}

export const resetClicked = () => {
    calculationEvent('resetClicked'); 
}

export const copyClicked = () => {
    calculationEvent('copyClicked'); 
}

const calculationEvent = (eventName, data) => {
    if (process.env.NODE_ENV === 'development') {
        console.log(`tracker: ${eventName}`, JSON.stringify(data));
    } else if (process.env.NODE_ENV === 'production') {
        let eventData = {
            hitType: 'event',
            eventCategory: 'Calculation',
            eventAction: eventName,
        };

        if (data) {
            eventData['eventLabel'] = JSON.stringify(data);
        }

        ga('send', eventData);
    }    
}