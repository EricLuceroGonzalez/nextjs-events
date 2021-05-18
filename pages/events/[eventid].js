import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";
import { Fragment } from "react";
import EventSummary from "../../components/events/event-summary";
import EventLogistics from "../../components/events/event-logistics";
import EventContent from "../../components/events/event-content";

function SingleEventPage(params) {
  const router = useRouter();
  const thisEventId = router.query.eventid;
  console.log(router);
  
  const event = getEventById(thisEventId);
  
  if (!event) {
    return <p>No event found!</p>;
  }
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export default SingleEventPage;
