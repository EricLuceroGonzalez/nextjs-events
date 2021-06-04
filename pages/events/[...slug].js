import { getFilteredEvents } from "../../dummy-data";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import { Fragment } from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/user-interface/button";
import ErrorAlert from "../../components/user-interface/error-alert";
import { getFeaturedEvents } from "../../helpers/api-utils";
import useSWR from "swr";

function FilteredEvents(props) {
  const router = useRouter();
  const filterData = router.query.slug;
useSWR()
  // if (!filterData) {
  //   return <p className="center">Loading...</p>;
  // }

  // const filteredYear = filterData[0];
  // const filteredMonth = filterData[1];

  // // Transform String to Number
  // const numYear = +filteredYear;
  // const numMonth = +filteredMonth;

  // check if not a string
  if (props.hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }
  const filteredEvents = props.filtered;
  console.log(filteredEvents);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(props.date.year, props.date.month - 1);
  return (
    <Fragment>
      <h1>Some Filtered Events</h1>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

export async function getServerSideProps(context) {
  const { params } = context;

  const filterData = params.slug;

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];
  console.log(filterData);

  // Transform String to Number
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // check if not a string
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return { props: { hasError: true } };
  }

  const filteredEvents = await getFeaturedEvents({
    year: numYear,
    month: numMonth,
  });
  return {
    props: {
      filtered: filteredEvents,
      date: { year: numYear, month: numMonth },
    },
  };
}

export default FilteredEvents;
