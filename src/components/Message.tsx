import "../styles/Message.scss";

const Message = () => {
  return (
    <div className="message owner">
      <div className="messageInfo">
        <img src={"https://picsum.photos/200/300"} alt="" />
      </div>
      <div className="messageContent">
        <p>hello</p>
        <img src={"https://picsum.photos/200/300"} alt="" />
        <span style={{ textAlign: "right" }}>just now</span>
      </div>
    </div>
  );
};

export default Message;
