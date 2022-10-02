import { Calendar } from "antd";
import { Moment } from "moment";
import React from "react";
import { FC } from "react";
import { IEvent } from "../models/IEvent";
import { formatDate } from "../utils/date";

interface EventsCalendarProps {
  events: IEvent[];
}

const EventsCalendar: FC<EventsCalendarProps> = ({ events }) => {
  const dateCellRender = (value: Moment) => {
    const formatedDate = formatDate(value.toDate());
    const currentDayEvents = events.filter((ev) => ev.date === formatedDate);
    return (
      <div>
        {currentDayEvents.map((ev, index) => (
          <div key={index}>{ev.description}</div>
        ))}
      </div>
    );
  };

  return (
    <Calendar dateCellRender={dateCellRender} style={{ padding: "15px" }} />
  );
};

export default EventsCalendar;
