import Head from "next/head";
import { getFeaturedEvents } from "../helpers/api-utils";
import EventList from "../components/events/event-list";

function HomePage(params) {
  return (
    <div>
      <Head>
        <title>Nextjs events</title>
        <meta
          name="description"
          content="Find a lot of events you will be interested."
        />
      </Head>
      <EventList items={params.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return { props: { events: featuredEvents }, revalidate: 1800 };
}
export default HomePage;
