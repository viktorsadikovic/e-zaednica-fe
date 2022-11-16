import PermMediaIcon from "@mui/icons-material/PermMedia";
import { Grid, IconButton, Paper } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useChat } from "../../redux/chat";
import { useNotifications } from "../../redux/notification";
import { useResidentProfiles } from "../../redux/profiles";
import { CommentInput } from "../../ui/components/CommentInput/CommentInput";
import colors from "../../ui/utils/colors";
import { MessageLeft } from "./Message/MessageLeft";
import { MessageRight } from "./Message/MessageRight";

export const Chat = () => {
  const [message, setMessage] = useState("");
  const messagesContainerRef = useRef();
  const [{ activeProfile }] = useResidentProfiles();
  const [
    { chat, messages, isLoading, error },
    { getActiveChat, getMessagesByChat },
  ] = useChat();
  const [
    { chatNotifications },
    { markNotificationsAsRead, getChatNotifications },
  ] = useNotifications();

  const [socket, setSocket] = useState();

  const sendMessage = (text) => {
    socket?.emit("message", {
      resident: activeProfile._id,
      chat: chat?._id,
      text: text,
    });
  };

  useEffect(() => {
    const newSocket = io("http://localhost:3333");
    setSocket(newSocket);
  }, [setSocket]);

  useEffect(() => {
    getActiveChat().unwrap();
  }, [getActiveChat, chat?._id]);

  useEffect(() => {
    markNotificationsAsRead({ type: "CHAT" })
      .unwrap()
      .then(() => {
        getChatNotifications();
      });
  }, [markNotificationsAsRead, chatNotifications]);

  const messageListener = (message) => {
    getMessagesByChat({ id: chat?._id }).unwrap();
  };

  useEffect(() => {
    socket?.on(`message-${activeProfile?.houseCouncil._id}`, messageListener);
    return () =>
      socket?.off(
        `message-${activeProfile?.houseCouncil._id}`,
        messageListener
      );
  }, [messageListener, activeProfile?.houseCouncil]);

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  });

  useEffect(() => {
    getMessagesByChat({ id: chat?._id });
  }, [chat?._id]);

  const renderMessages = () => {
    return messages.map((message) => {
      if (message.resident._id === activeProfile?._id) {
        return <MessageRight key={message._id} message={message} />;
      } else {
        return <MessageLeft key={message._id} message={message} />;
      }
    });
  };

  return (
    <Grid container sx={{ marginTop: "0px" }}>
      <Grid
        item
        xs={12}
        md={6}
        sx={{
          margin: "auto",
          height: "85vh",
          boxShadow: "rgb(0 94 124 / 15%) 0px 0px 21px",
          border: "none",
          borderRadius: "5px",
          marginTop: 0,
        }}
      >
        <Grid
          container
          item
          xs={12}
          sx={{
            background: colors.primary.main,
            color: colors.textLight,
            fontSize: 20,
            padding: "0.75rem",
            borderTopRightRadius: "5px",
            borderTopLeftRadius: "5px",
          }}
        >
          Chat
        </Grid>
        <Paper
          sx={{
            width: "100%",
            height: "calc( 100% - 110px )",
            overflowY: "scroll",
            paddingTop: "1rem",
            boxShadow: "none",
          }}
        >
          {renderMessages()}
          <div ref={messagesContainerRef}></div>
        </Paper>
        <Grid container item xs={12}>
          <Grid item xs={1} sx={{ textAlign: "center", marginTop: "1rem" }}>
            <IconButton
              color="inherit"
              onClick={() => console.log("o")}
              edge="start"
              sx={{
                margin: "0px!important",
                padding: "0px!important",
              }}
            >
              <PermMediaIcon sx={{ color: "rgba(0, 0, 0, 0.54)!important" }} />
            </IconButton>
          </Grid>
          <Grid
            item
            xs={11}
            sx={{
              fontSize: 15,
              paddingY: "0.3rem",
              paddingRight: "1rem",
              marginBottom: "10px",
            }}
          >
            <CommentInput
              autoComplete="comment"
              name="comment"
              value={message}
              onChange={setMessage}
              label=""
              placeholder="Leave a message"
              onSubmit={() => {
                sendMessage(message);
                setMessage("");
              }}
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};
