import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventsSearch from "../../components/events/events-search";

function AllEventsPage(params) {
  const events = getAllEvents();
  return (
    <div>
      <h1>All Events</h1>
      <EventsSearch />
      <EventList items={events} />
      
    </div>
  );
}

export default AllEventsPage;
