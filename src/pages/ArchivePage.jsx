import CallListings from "../components/CallListings";
import Navbar from "../components/Navbar";
import ResetButton from "../components/ResetButton";
import StickyButtons from "../components/StickyButtons";
import Title from "../components/Title";

const ArchivePage = () => {
  return (
    <div>
      <Navbar />
      <Title />
      <ResetButton />
      <CallListings />
      <StickyButtons />
    </div>
  );
};

export default ArchivePage;
