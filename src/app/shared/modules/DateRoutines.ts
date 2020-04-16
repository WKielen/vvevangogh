import * as moment from 'moment';

export function FormValueToDutchDateString(value: any): string {
    return moment(value).format('YYYY-MM-DD');
}

export function calcBetweenDates(LastDate, FirstDate) {
    const diff = Math.floor(LastDate.getTime() - FirstDate.getTime());
    const day = 1000 * 60 * 60 * 24;

    const days = Math.floor(diff / day);
    const weeks = Math.floor(days / 7);
    //var months = Math.floor(days / 31);
    //var years = Math.floor(months / 12);

    return {'days': days, 'weeks': weeks};
}