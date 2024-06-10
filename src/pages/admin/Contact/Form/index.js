import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TextareaInput from "../../../../components/Input/Textarea";
import axiosClient from "../../../../axios-client";
import SelectInput from "../../../../components/Input/SelectInput";
import { useStateContext } from "../../../../context/ContextProvider";

function ContactForm() {
  let { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [errors, setErrors] = useState(null);
  const { setNotification } = useStateContext();
  const [contact, setContact] = useState({
    id: null,
    name: "",
    email: "",
    phone: "",
    status: "",
    message: "",
  });
  const [contactReplys, setContactReplys] = useState({
    id: null,
    content: "",
    mail_form: "",
    created_at: "",
  });

  useEffect(() => {
    getContact(id);
  }, [id]);

  const getContact = (id) => {
    setLoading(true);
    axiosClient
      .get(`/admin/contact/reply/${id}`)
      .then(({ data }) => {
        setLoading(false);
        setContact(data.contact);
        setContactReplys(data.contact_reply);
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  function convertDateTime(isoString) {
    const date = new Date(isoString);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
    const year = date.getFullYear();

    return `${hours}:${minutes} ${day}/${month}/${year}`;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post(`/admin/contact/reply/${id}`, {
        reply,
        status: contact.status,
      })
      .then(({ data }) => {
        setErrors(null);
        setNotification({
          type: "success",
          data: "Phản hồi thành công",
        });
        navigate("/admin/contacts");
      })
      .catch((error) => {
        const { response } = error;
        if (response.status === 422) {
          setErrors(response.data.errors);
        }
      });
  };

  const statusList = [
    { id: 0, value: 0, title: "Chưa giả quyết" },
    { id: 1, value: 1, title: "Đã giải quyết" },
    { id: 2, value: 2, title: "Đang giải quyết" },
  ];

  return (
    <>
      <section className="section">
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <div
                  className="tab-pane fade profile-overview active show"
                  id="profile-overview"
                  role="tabpanel"
                >
                  <h5 className="card-title">Content liên hệ</h5>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label ">Name</div>
                    <div className="col-lg-9 col-md-8">{contact.name}</div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">emial</div>
                    <div className="col-lg-9 col-md-8">{contact.email}</div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">Số điện thoại</div>
                    <div className="col-lg-9 col-md-8">{contact.phone}</div>
                  </div>

                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">Content</div>
                    <div className="col-lg-9 col-md-8">{contact.content}</div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3 col-md-4 label">Thời gian gửi</div>
                    <div className="col-lg-9 col-md-8">
                      {convertDateTime(contact.created_at)}
                    </div>
                  </div>
                  <hr />
                  <h5 className="card-title">Content Phản hồi</h5>
                  <table className="table table-bordered border-primary">
                    <thead>
                      <tr>
                        <th scope="col" style={{ width: "10%" }}>
                          #
                        </th>
                        <th scope="col" style={{ width: "55%" }}>
                          Content
                        </th>
                        <th scope="col">Thời gian</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(contactReplys) &&
                        contactReplys.map((contactReply) => (
                          <tr key={contactReply.id}>
                            <th scope="row">{contactReply.id}</th>
                            <td style={{ whiteSpace: 'pre-line' }}>{contactReply.content}</td> 
                            <td>{convertDateTime(contactReply.created_at)}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Trả lời</h5>
                <form onSubmit={onSubmit}>
                  {errors && (
                    <div style={{ color: "red" }}>
                      {Object.keys(errors).map((key) => (
                        <p key={key}>{errors[key][0]}</p>
                      ))}
                    </div>
                  )}
                  <div className="text-center">
                    <TextareaInput
                      label="Content"
                      value={reply}
                      onChange={setReply}
                      placeholder="Nhập Content trả lời"
                    />
                    {!loading && (
                      <SelectInput
                        label="Chọn trạng thái"
                        id="floatingSelect"
                        options={statusList}
                        defaultOption="Chọn trạng thái"
                        onChange={(e) =>
                          setContact({ ...contact, status: e.target.value })
                        }
                        value={contact.status}
                      />
                    )}
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactForm;
