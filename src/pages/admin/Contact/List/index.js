import { useEffect, useState } from "react";
import axiosClient from "../../../../axios-client";
import TableHeader from "../../../../components/Table/TableHeader";
import Loading from "../../../../components/Loading";
// import SearchInput from "../../../../components/Input/SearchInput";
// import PaginationComponent from "../../../../components/Pagination";
import ContactStatus from "../../../../components/Table/ContactStatus";
import { Link } from "react-router-dom";

function ContactList() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(10);
  const [search, setSearch] = useState("");
  const headers = [
    { label: "STT", width: "10%" },
    { label: "Name", width: "20%" },
    { label: "SĐT", width: "20%" },
    { label: "Trạng thái", width: "20%" },
    { label: "Active", width: "20%" },
  ];
  useEffect(() => {
    getContacts(currentPage);
  }, []);

  const getContacts = (page = currentPage, searchValue = null) => {
    let url = `/admin/contact?page=${page}`;
    if (searchValue) {
      url += `&search=${searchValue}`;
    }
    axiosClient
      .get(url)
      .then(({ data }) => {
        setLoading(false);
        setContacts(data.contacts.data);
        setPageCount(data.pagination.last_page);
        setCurrentPage(data.pagination.current_page);
      })
      .catch((error) => {});
  };

  return (
    <>
      <div>
        <div className="container">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">List Contact</h5>
              <div className="datatable-top">
                {/* Seach box */}
                {/* <SearchInput handleSearch={handleSearch} /> */}
                {/* Pagination  */}
                <div style={{ justifyContent: "right", alignItems: "center" }}>
                  {/* <PaginationComponent
                    pageCount={pageCount}
                    currentPage={currentPage - 1}
                    handlePageChange={handlePageChange}
                  /> */}
                </div>
              </div>
              <table className="table table-striped">
                <TableHeader headers={headers} />
                {loading && <Loading length={headers.length} />}
                {!loading && (
                  <>
                    <tbody>
                      {Array.isArray(contacts) &&
                        contacts.map((contact) => (
                          <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td>{contact.name}</td>
                            <td>{contact.phone}</td>
                            <td>
                              <ContactStatus status={contact.status} />
                            </td>
                            <td>
                            <Link
                                to={`/admin/contacts/${contact.id}`}
                                className="btn btn-outline-secondary"
                              >
                                Edit
                              </Link>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </>
                )}
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactList;
