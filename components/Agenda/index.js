import React, { useEffect, useState } from 'react';
import moment from 'moment';

import { Col, Container, Row, Dropdown, Button } from 'react-bootstrap';

import Section from '../Section';
import { UITimeline, UITimelineEvent } from './Timeline';

const TIME_FORMAT = 'MM-DD-YYYY HH:mm';
const DAY_FORMAT = 'MM-DD-YYYY';

/* Grabs all events */
const getEventsList = (events) => {
  if (typeof events !== 'object') {
    return [];
  }

  return events.allIds.map((id) => {
    const event = events.byId[id];
    return {
      ...event,
      id,
      key: id,
    };
  });
};

if (typeof window !== 'undefined') {
  window.addEventListener('mousemove', (event) => {
    const width = window.outerWidth;
    const height = window.outerHeight;
    const xOffset = 16;
    const yOffset = 3;
    const mouseXpercentage = (event.clientX / width) * 100; //Math.round(event.pageX / width * 100);
    const mouseYpercentage = (event.clientY / height) * 100 + yOffset; //Math.round(event.pageY / height * 100);
    document.getElementsByTagName('body')[0].style =
      'background: radial-gradient(at ' +
      mouseXpercentage +
      '% ' +
      mouseYpercentage +
      '%, #EF7B23, #ffffff)';
  });
}

/* */
const filterEvents = (events, day, type) => {
  if (!Array.isArray(events)) {
    return [];
  }

  return events
    .filter(({ displayInAgenda, time }) =>
      day
        ? moment(time.start, TIME_FORMAT).isSame(
            moment(day, DAY_FORMAT),
            'day'
          ) && displayInAgenda
        : true
    )
    .filter((event) => (type !== '' ? event.type === type : true))
    .sort((a, b) =>
      moment(a.time.start, TIME_FORMAT).isBefore(
        moment(b.time.start, TIME_FORMAT)
      )
        ? -1
        : 1
    );
};

const formatTime = (time) => {
  const start = moment(time.start, TIME_FORMAT).format('hh:mma');
  const end = moment(time.end, TIME_FORMAT).format('hh:mma');
  return `${start} - ${end}`;
};

const DayAgenda = ({ label, events }) => {
  if (!events || events.length === 0) {
    return null;
  }
  return (
    <Col xs={{ span: 10, offset: 1 }} sm={{ span: 8, offset: 2 }}>
      <UITimeline>
        <UITimeline.Title>{label}</UITimeline.Title>
        <UITimeline.Body>
          {events.map((event) => (
            <UITimelineEvent key={event.title}>
              <UITimelineEvent.Time>
                {formatTime(event.time)}
              </UITimelineEvent.Time>
              <UITimelineEvent.Body>
                {event.title}
                <br />
                <span style={{ fontWeight: 200 }}>{event.location}</span>
                {event.hasPage && (
                  <>
                    <br />
                    <a
                      href={`/events/?id=${event.id}`}
                      style={{ fontWeight: '400' }}
                    >
                      More Info &#8250;
                    </a>
                  </>
                )}
              </UITimelineEvent.Body>
            </UITimelineEvent>
          ))}
        </UITimeline.Body>
      </UITimeline>
    </Col>
  );
};

const Agenda = ({ events }) => {
  const allEvents = getEventsList(events);

  const [selectedType, setSelectedType] = useState('');
  const [selectedDate, setSelectedDate] = useState('09-20-2021');
  const [selectedDateWeek, setSelectedDateWeek] = useState('Monday Sep 20th');
  const [dropdownActive, setDropDownActive] = useState(false);

  const handleDropdown = () => {
    setDropDownActive(!dropdownActive);
  };

  return (
    <Section>
      <Section.Header>
        <Section.Title></Section.Title>
      </Section.Header>
      <Section.Body>
        <Container>
          <Row className="pb-4">
            <Col className="text-center">
              <Dropdown className="toggle" onClick={() => handleDropdown()}>
                <Dropdown.Toggle
                  variant="success"
                  id="dropdown-basic"
                  className="togglebar"
                >
                  {selectedDateWeek.substr(0, selectedDateWeek.indexOf(' '))}
                </Dropdown.Toggle>
                <Dropdown.Menu className="togglemenu">
                  <Dropdown.Item
                    className="toggleitem"
                    onClick={() => {
                      setSelectedDate('09-20-2021');
                      setSelectedDateWeek('Monday Sep 20th');
                    }}
                  >
                    Monday
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="toggleitem"
                    onClick={() => {
                      setSelectedDate('09-21-2021');
                      setSelectedDateWeek('Tuesday Sep 21th');
                    }}
                  >
                    Tuesday
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="toggleitem"
                    onClick={() => {
                      setSelectedDate('09-22-2021');
                      setSelectedDateWeek('Wednesday Sep 22th');
                    }}
                  >
                    Wednesday
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="toggleitem"
                    onClick={() => {
                      setSelectedDate('09-23-2021');
                      setSelectedDateWeek('Thursday Sep 23th');
                    }}
                  >
                    Thursday
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="toggleitem"
                    onClick={() => {
                      setSelectedDate('09-24-2021');
                      setSelectedDateWeek('Friday Sep 24th');
                    }}
                  >
                    Friday
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="toggleitem"
                    onClick={() => {
                      setSelectedDate('09-25-2021');
                      setSelectedDateWeek('Saturday Sep 25th');
                    }}
                  >
                    Saturday
                  </Dropdown.Item>
                  {/* <Dropdown.Item
                    className="toggleitem"
                    href="#/action-7"
                    onClick={() => {
                      setSelectedDate('09-22-2019');
                      setSelectedDateWeek('Sunday Sep 22th');
                    }}
                  >
                    Sunday
                  </Dropdown.Item> */}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
          <Row>
            <DayAgenda
              label={selectedDateWeek}
              events={filterEvents(allEvents, selectedDate, selectedType)}
            />
          </Row>
        </Container>
      </Section.Body>
    </Section>
  );
};

export default Agenda;
