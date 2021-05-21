import { useRouter } from "next/router";
import { getEventById } from "../../dummy-data";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/user-interface/error-alert";

function SingleEventPage(params) {
  const router = useRouter();
  const thisEventId = router.query.eventid;
  console.log(router);
  
  const event = getEventById(thisEventId);
  
  if (!event) {
    return <ErrorAlert>
      <p>No event found!</p>
    </ErrorAlert>
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
