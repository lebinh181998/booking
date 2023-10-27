import SearchListItem from "./SearchListItem";
import "./SearchList.css";

const SearchList = (props) => {
  const { hotels } = props;

  return (
    <div className="search-list">
      {/* hiển thị các kahcsh sạn trong search */}
      {hotels.length > 0 ? (
        hotels.map((data) => <SearchListItem key={data._id} data={data} />)
      ) : (
        <h2>No hotel you want.</h2>
      )}
    </div>
  );
};
export default SearchList;
