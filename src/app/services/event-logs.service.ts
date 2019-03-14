import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export const EventLogEntryTypes = {
  security: "security",
  log: "log",
}

export const EventLogEntrySeverities = {
  high: "high",
  medium: "medium",
  low: "low",
}

const descriptions = [
  "something bad happend",
  "user had logged in",
  "user's password is weak",
  "user had logged out",
  "application had crashed for unknown reason",
];

export type EventLogEntryType = "security" | "log";
export type EventLogEntrySeverity = "high" | "medium" | "low";

export interface IEventLogEntry {
  type: EventLogEntryType;
  description: string;
  severity: EventLogEntrySeverity;
}

@Injectable({
  providedIn: 'root'
})
export class EventLogsService {
  private events: IEventLogEntry[] = [
    {
      type: <EventLogEntryType>EventLogEntryTypes.security,
      severity: <EventLogEntrySeverity>EventLogEntrySeverities.high,
      description: "something bad happend",
    },
    {
      type: <EventLogEntryType>EventLogEntryTypes.log,
      severity: <EventLogEntrySeverity>EventLogEntrySeverities.low,
      description: "user had logged in",
    },
    {
      type: <EventLogEntryType>EventLogEntryTypes.security,
      severity: <EventLogEntrySeverity>EventLogEntrySeverities.medium,
      description: "user's password is weak",
    },
    {
      type: <EventLogEntryType>EventLogEntryTypes.log,
      severity: <EventLogEntrySeverity>EventLogEntrySeverities.low,
      description: "user had logged out",
    },
    {
      type: <EventLogEntryType>EventLogEntryTypes.log,
      severity: <EventLogEntrySeverity>EventLogEntrySeverities.high,
      description: "application had crashed for unknown reason",
    },
  ];

  constructor() { }

  getEvents(): Observable<IEventLogEntry[]> {
    const eventsObservable = new Observable<IEventLogEntry[]>(observer => {
      setTimeout(() => {
        observer.next(this.events);
      }, 1000);
    });

    return eventsObservable;
  }

  getEventsForDevice(deviceName: string, tail: number = 5): IEventLogEntry[] {
    const events = [];

    for (let i = 0; i < tail; i++) {
      events.push(this.generateEvent());
    }

    return events;
  }

  private generateEvent(): IEventLogEntry {

    const severityKeys = Object.keys(EventLogEntrySeverities);
    const severity = Math.floor(severityKeys.length * Math.random());

    const typeKeys = Object.keys(EventLogEntryTypes);
    const type = Math.floor(typeKeys.length * Math.random());
    const description = Math.floor(descriptions.length * Math.random());

    const event = {
      type: <EventLogEntryType>EventLogEntryTypes[typeKeys[type]],
      severity: <EventLogEntrySeverity>EventLogEntrySeverities[severityKeys[severity]],
      description: descriptions[description],
    };

    return event;
  }

}
