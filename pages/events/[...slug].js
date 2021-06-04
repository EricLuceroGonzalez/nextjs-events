import { getFilteredEvents } from "../../dummy-data";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import { Fragment, useState, useEffect } from "react";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/user-interface/button";
import ErrorAlert from "../../components/user-interface/error-alert";
import { getFeaturedEvents } from "../../helpers/api-utils";
import useSWR from "swr";
import Head from "next/head";

export default function FilteredEvents() {
  const [loadedEvents, setEvents] = useState();
  const router = useRouter();
  const filterData = router.query.slug;

  const { data, error } = useSWR(
    "https://nextjs-udemy-f70a6-default-rtdb.firebaseio.com/events.json"
  );

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setEvents(events);
    }
    return () => {};
  }, [data]);

  let pageHeadData = (
    <Head>
      <title>Filters | Events</title>
      <meta name="description" content="A List of some filtered events" />
    </Head>
  );
  if (!loadedEvents) {
    return (
      <Fragment>
        {pageHeadData}
        <p className="center">Loaading.....</p>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  // Transform String to Number
  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  // Header function
  pageHeadData = (
    <Head>
      <title>Filters | Events</title>
      <meta
        name="description"
        content={`All events for ${numMonth}/${numYear}}.`}
      />
    </Head>
  );

  // check if not a string
  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear < 2021 ||
    numYear > 2030 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>Invalid.Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }
  console.log(filteredEvents);

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        {pageHeadData}
        <ErrorAlert>
          <p>No events found for the chosen filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show all events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);
  return (
    <Fragment>
      {pageHeadData}
      <h1>Some Filtered Events</h1>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];
//   console.log(filterData);

//   // Transform String to Number
//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   // check if not a string
//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear < 2021 ||
//     numYear > 2030 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return { props: { hasError: true } };
//   }

//   const filteredEvents = await getFeaturedEvents({
//     year: numYear,
//     month: numMonth,
//   });
//   return {
//     props: {
//       filtered: filteredEvents,
//       date: { year: numYear, month: numMonth },
//     },
//   };
// }
