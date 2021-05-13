import moment from "moment"

const formatMessage = (username: string, text: string) => {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
}

export default formatMessage;
