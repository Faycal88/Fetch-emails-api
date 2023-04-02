var axios = require("axios");
var qs = require("qs");

class GmailAPI {
  accessToken = "";
  constructor() {
    this.accessToken = this.getAcceToken();
  }

  getAcceToken = async () => {
    var data = qs.stringify({
      client_id: process.env.client_id,
      client_secret: process.env.client_secret,
      refresh_token: process.env.refresh_token,
      grant_type: "refresh_token",
    });
    var config = {
      method: "post",
      url: "https://accounts.google.com/o/oauth2/token",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };

    let accessToken = "";

    await axios(config)
      .then(async function (response) {
        accessToken = await response.data.access_token;

        console.log("Access Token " + accessToken);
      })
      .catch(function (error) {
        console.log(error);
      });

    return accessToken;
  };

  searchGmail = async (searchItem) => {
    var config1 = {
      method: "get",
      url:
        "https://www.googleapis.com/gmail/v1/users/me/messages?q=is:unread " +
        searchItem,
      headers: {
        Authorization: `Bearer ${await this.accessToken} `,
      },
    };
    var threadId = "";

    await axios(config1)
      .then(async function (response) {
        if (response.data["messages"]) {
          threadId = await response.data["messages"][0].id;
          console.log(response.data["messages"]);
        }

        console.log("ThreadId = " + threadId);
      })
      .catch(function (error) {
        console.log(error);
      });

    return threadId;
  };

  readGmailContent = async (messageId) => {
    var config = {
      method: "get",
      url: `https://gmail.googleapis.com/gmail/v1/users/me/messages/${messageId}`,
      headers: {
        Authorization: `Bearer ${await this.accessToken}`,
      },
    };

    var data = {};

    await axios(config)
      .then(async function (response) {
        data = await response.data;
      })
      .catch(function (error) {
        console.log(error);
      });

    return data;
  };

  setAsRead = async (threadId) => {
    const url = `https://gmail.googleapis.com/gmail/v1/users/me/messages/${threadId}/modify`;
    const data = {
      removeLabelIds: ["UNREAD"],
    };
    const headers = {
      Authorization: `Bearer ${await this.accessToken}`,
    };

    axios
      .post(url, data, { headers })
      .then((response) => {
        console.log("Message marked as read:", response.data);
      })
      .catch((error) => {
        console.error(
          "Error marking message as read:",
          error.response.data.error
        );
      });
  };

  readInboxContent = async (searchText) => {
    const threadId = await this.searchGmail(searchText);
    if (threadId) {
      const message = await this.readGmailContent(threadId);
      const encodedMessage = await message.payload["parts"][0].body.data;
      const decodedStr = Buffer.from(encodedMessage, "base64").toString(
        "ascii"
      );
      // this.setAsRead(threadId);
      return decodedStr;
    } else {
      console.log("No new messages found!");
      return "No update";
    }
  };
}

module.exports = GmailAPI;
