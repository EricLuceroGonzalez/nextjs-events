import { getFeaturedEvents } from "../dummy-data";
import EventList from "../components/events/event-list";

function HomePage(params) {
  const featuredEvents = getFeaturedEvents();
  return (
    <div>
      <EventList items = {featuredEvents} />
    </div>
  );
}

export default HomePage;
