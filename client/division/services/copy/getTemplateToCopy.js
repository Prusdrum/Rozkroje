import {I18n} from 'react-i18nify';

export default (results) => {
    const header = (
        `${I18n.t('division.pattern')}\t${I18n.t('division.amount')}\t${I18n.t('division.waste')}`
    );

    const body = results.map(result => {
        const elements = result.elements.join(', ');
        const count = `x${result.count}`;
        const waste = `${result.waste} mm`;
        return `${elements}\t${count}\t${waste}`;
    }).join('\n');

    const template = (
        `${header}\n${body}`
    );

    return template;
}