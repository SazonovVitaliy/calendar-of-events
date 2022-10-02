import { Button, DatePicker, Form, Input, Row, Select } from "antd";
import React, { useState } from "react";
import { FC, useEffect } from "react";
import { rules } from "../utils/rules";
import { eventAction } from "../store/slices/eventSlice/eventSlice";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../hooks/redux";
import UserService from "../api/UserService";
import { IUser } from "../models/IUser";
import { IEvent } from "../models/IEvent";
import { Moment } from "moment";
import { formatDate } from "../utils/date";

interface EventFormProps {
  guests: IUser[];
  submit: (event: IEvent) => void;
}

const EventForm: FC<EventFormProps> = (props) => {
  const [event, setEvent] = useState<IEvent>({
    author: "",
    date: "",
    description: "",
    guest: "",
  });
  const { user } = useAppSelector((state) => state.authReducer);
  const { setGuests } = eventAction;
  const dispatch = useDispatch();
  const fetchGuests = async () => {
    const guests = await UserService.getUsers();
    dispatch(setGuests(guests.data));
  };
  useEffect(() => {
    fetchGuests();
  }, []);

  const selectDate = (date: Moment | null) => {
    date && setEvent({ ...event, date: formatDate(date.toDate()) });
  };

  const submitForm = () => {
    props.submit({ ...event, author: user.username });
  };

  return (
    <Form onFinish={submitForm}>
      <Form.Item
        label="Описание события"
        name={"description"}
        rules={[rules.required()]}
      >
        <Input
          value={event.description}
          onChange={(e) => setEvent({ ...event, description: e.target.value })}
        />
      </Form.Item>
      <Row justify="space-between">
        <Form.Item
          label="Дата события"
          name={"date"}
          rules={[
            rules.required(),
            rules.isDateAfter("Нельзя создать событие в прошлом"),
          ]}
        >
          <DatePicker onChange={(date) => selectDate(date)} />
        </Form.Item>
        <Form.Item
          label="Выберите гостя"
          name={"guest"}
          rules={[rules.required()]}
        >
          <Select
            onChange={(guest: string) => setEvent({ ...event, guest })}
            style={{ width: 120 }}
          >
            {props.guests.map((guest) => (
              <Select.Option key={guest.username} value={guest.username}>
                {guest.username}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Создать
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EventForm;
