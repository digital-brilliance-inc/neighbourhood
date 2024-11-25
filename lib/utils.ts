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
  const result: Array<any> = eventModels.reduce((p: any, eventModel: EventModel) => {
    const occs = toRRule(eventModel.rruleOptions).between(moment(from).toDate(), moment(to).toDate());
    return [
      ...p,
      ...occs.map((occDate: Date, index: number) => ({
        ...eventModel,
        id: eventModel.id + (occs.length > 1 ? '-' + index : ''),
        startDate: moment(occDate).format('YYYY-MM-DD'),
      })),
    ];
  }, []);
  result.sort((a, b) => (a.startDate < b.startDate ? -1 : 1));
  return result;
}
