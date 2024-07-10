import ArchiveAllButton from "../components/ArchiveAllButton";
import CallListings from "../components/CallListings";
import Navbar from "../components/Navbar";
import StickyButtons from "../components/StickyButtons";
import Title from "../components/Title";

const ActivityPage = () => {
  return (
    <div>
      <Navbar />
      <Title />
      <ArchiveAllButton />
      <CallListings />
      <StickyButtons />
    </div>
  );
};

export default ActivityPage;
