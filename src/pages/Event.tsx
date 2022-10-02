import { Button, Layout, Modal, Row } from "antd";
import React, { useState, useEffect, FC } from "react";
import EventForm from "../components/EventForm";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { IEvent } from "../models/IEvent";
import { eventAction } from "../store/slices/eventSlice/eventSlice";
import EventsCalendar from "./../components/EventsCalendar";

const Event: FC = () => {
  const { guests, events } = useAppSelector((state) => state.eventReducer);
  const { user } = useAppSelector((state) => state.authReducer);
  const { setEvents, createEvent } = eventAction;
  const dispatch = useAppDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const addNewEvent = (event: IEvent) => {
    setModalVisible(false);
    dispatch(createEvent(event));
  };
  const currEvents = events.filter(
    (ev) => ev.author === user.username || ev.guest === user.username
  );
  useEffect(() => {
    dispatch(setEvents(currEvents));
  }, []);
  return (
    <Layout>
      <EventsCalendar events={currEvents} />
      <Row justify="center">
        <Button onClick={showModal}>Добавить событие</Button>
      </Row>
      <Modal
        title="Добавить событие"
        visible={modalVisible}
        footer={null}
        onCancel={closeModal}
      >
        <EventForm guests={guests} submit={addNewEvent} />
      </Modal>
    </Layout>
  );
};

export default Event;
