import Head from "next/head";
import { getEventById, getFeaturedEvents } from "../../helpers/api-utils";
import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/user-interface/error-alert";

function SingleEventPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  }
  return (
    <Fragment>
      <Head>
        <title>{event.title} | Events</title>
        <meta
          name="description"
          content="Find a lot of events you will be interested."
        />
      </Head>
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

export async function getStaticProps(context) {
  const eventId = context.params.eventid;
  const event = await getEventById(eventId);

  return { props: { selectedEvent: event } };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const paths = events.map((event) => ({ params: { eventid: event.id } }));
  return { paths: paths, fallback: true };
}

export default SingleEventPage;
