import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";
import { Fragment } from "react";
import { useRouter } from "next/router";

function AllEventsPage(params) {
  const events = getAllEvents();
  const router = useRouter();

  function findEventsHandler(year, month) {
    router.push(`events/${year}/${month}`);
  }
  return (
    <Fragment>
      <h1>All Events</h1>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export default AllEventsPage;
