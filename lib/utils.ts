import moment from 'moment';
import { datetime, RRule } from 'rrule';
import { EventModel } from './model/event-model';

export function toRRule(options: any) {
  const ms = moment(options.dtstart).utc();
  const mu = moment(options.until).utc();
  return new RRule({
    ...options,
    dtstart: datetime(ms.year(), ms.month() + 1, ms.date(), ms.hour(), ms.minute(), ms.second()),
    until: options.until
      ? datetime(mu.year(), mu.month() + 1, mu.date(), mu.hour(), mu.minute(), mu.second())
      : undefined,
  });
}

export function eventOccurrences(eventModels: Array<EventModel>, from: string, to: string) {
  const result: Array<any> = eventModels.reduce((p: any, eventModel) => {
    return [
      ...p,
      ...toRRule(eventModel.rruleOptions)
        .between(moment(from).toDate(), moment(to).toDate())
        .map((occDate: Date, index: number) => ({
          ...eventModel,
          id: eventModel.id + '-' + index,
          startDate: moment(occDate).format('YYYY-MM-DD'),
        })),
    ];
  }, []);
  result.sort((a, b) => (a.start < b.start ? -1 : 1));
  return result;
}
