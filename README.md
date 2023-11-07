# Ken's Instant Chat Server
Welcome to Ken's Instant Chat Server - a robust and real-time chat server built with Node.js. This project leverages the power of Node.js to provide a multi-channel chat experience where users can engage in lively conversations across various topics. It's fast, it's real-time, and it supports multiple channels for a diverse chatting experience.

Whether you're looking to connect with friends, brainstorm with colleagues, or just meet new people, Ken's Instant Chat Server provides a seamless platform to chat instantly.

## Frontend Repository

The frontend for this chat server is a React application that can be found at the following repository: [react-chat-client](https://github.com/geeshow/react-chat-client).

## Features
- **Real-Time Messaging:** Enjoy live conversations with minimal latency.
- **Multi-Channel Support:** Join different chat channels, each dedicated to specific topics or groups.
- **Persistent Data:** With Redis integration, your messages stay saved even when the server restarts.
- **User Authentication:** Simple signup process to get you connected in no time.

## Getting Started
The chat server is currently live and can be accessed at https://chat.devken.kr/.

Feel like running it locally? Follow the steps below to set up the chat server in your local environment.

### type a. Running Locally with In-Memory Storage
To run the server using only your local memory, which means data will not persist after the server stops, simply install the dependencies and start the development server:

```bash
$ yarn install
$ yarn dev
```
This mode is perfect for development and testing purposes where persistent data is not critical.

### type b. Running with Redis
For persistent storage, the server can be configured to use Redis. This way, your data remains intact across server restarts. You'll need to set up a .env.redis file in the project root with the following Redis configuration variables:

```yaml
DB_DRIVER=REDIS
REDIS_HOST=<your-redis-host>
REDIS_PORT=<your-redis-port>
REDIS_PASSWORD=<your-redis-password>
REDIS_PREFIX=<your-redis-prefix> # Optional
REDIS_DB=<your-redis-db-index> # Optional
```
Replace the placeholder values with your actual Redis server details.

Once you have your `.env.redis` file configured, start the server:

```bash
$ yarn dev:redis
```
Enjoy chatting with persistent data storage!

## Contributing
Your contributions are what make the community great. We welcome contributions of all sizes - from fixing a typo to implementing a new feature. Feel free to fork the repository, make changes, and submit pull requests.

For major changes, please open an issue first to discuss what you would like to change.

## License
This project is open-sourced software licensed under the MIT license.

Happy chatting!

# Specifications
## Data Interface Specifications

### User DTO

| Field      | Type   | Description          |
|------------|--------|----------------------|
| `id`       | string | User's unique ID     |
| `emoji`    | string | Emoji representation |
| `nickname` | string | User's nickname      |
| `lastLogin`| Date   | Last login date      |

### Channel DTO

| Field        | Type     | Description             |
|--------------|----------|-------------------------|
| `id`         | string   | Channel's unique ID     |
| `channelName`| string   | Name of the channel     |
| `host`       | UserDto  | Channel's host user info|

### Message DTO

| Field      | Type        | Description               |
|------------|-------------|---------------------------|
| `id`       | string      | Message's unique ID       |
| `channelId`| string      | ID of the channel         |
| `type`     | MessageType | Type of the message       |
| `content`  | string      | Content of the message    |
| `userId`   | string      | ID of the user            |
| `date`     | Date        | Date when message was sent|

---

## Chat API Specification

### Signup

#### Request: `RequestSignup`
| Field     | Type   | Description        |
|-----------|--------|--------------------|
| `id`      | string | User's unique ID   |
| `password`| string | User's password    |

#### Response: `ResponseSignup`
| Field  | Type    | Description           |
|--------|---------|-----------------------|
| `token`| string  | Authentication token  |
| `user` | UserDto | User information      |

---

### Login

#### Request: `RequestLogin`
| Field     | Type   | Description        |
|-----------|--------|--------------------|
| `id`      | string | User's unique ID   |
| `password`| string | User's password    |

#### Response: `ResponseLogin`
| Field  | Type    | Description           |
|--------|---------|-----------------------|
| `token`| string  | Authentication token  |
| `user` | UserDto | User information      |

---

### Change User Info

#### Request: `RequestChangeUser`
| Field     | Type   | Description        |
|-----------|--------|--------------------|
| `emoji`   | string | New user emoji     |
| `nickname`| string | New user nickname  |

#### Response: `ResponseChangeUser`
| Field  | Type    | Description           |
|--------|---------|-----------------------|
| `user` | UserDto | Updated user information |

---

### Get My Info

#### Request: Not applicable for this operation

#### Response: `ResponseMyInfo`
| Field  | Type    | Description           |
|--------|---------|-----------------------|
| `user` | UserDto | Requesting user's information |

---

### Create Channel

#### Request: `RequestCreateChannel`
| Field        | Type   | Description              |
|--------------|--------|--------------------------|
| `channelName`| string | Name for the new channel |

#### Response: `ResponseCreateChannel`
| Field     | Type        | Description                   |
|-----------|-------------|-------------------------------|
| `channel` | ChannelDto  | Created channel information   |
| `message` | MessageDto  | Confirmation message          |

---

### View Channel

#### Request: `RequestViewChannel`
| Field      | Type   | Description                 |
|------------|--------|-----------------------------|
| `channelId`| string | ID of the channel to view   |

#### Response: `ResponseViewChannel`
| Field      | Type         | Description                   |
|------------|--------------|-------------------------------|
| `channel`  | ChannelDto   | Information of the channel    |
| `userList` | UserDto[]    | List of users in the channel  |

---

### Join Channel

#### Request: `RequestJoinChannel`
| Field      | Type   | Description                  |
|------------|--------|------------------------------|
| `channelId`| string | ID of the channel to join    |

#### Response: `ResponseJoinChannel`
| Field      | Type         | Description                       |
|------------|--------------|-----------------------------------|
| `channel`  | ChannelDto   | Information of the channel        |
| `userList` | UserDto[]    | List of users in the channel      |
| `message`  | MessageDto   | Confirmation message              |
| `user`     | UserDto      | Information of the joining user   |

---

### Leave Channel

#### Request: `RequestLeaveChannel`
| Field      | Type   | Description                   |
|------------|--------|-------------------------------|
| `channelId`| string | ID of the channel to leave    |

#### Response: `ResponseLeaveChannel`
| Field      | Type         | Description                       |
|------------|--------------|-----------------------------------|
| `channel`  | ChannelDto   | Information of the channel        |
| `userList` | UserDto[]    | Updated list of users in channel  |
| `message`  | MessageDto   | Confirmation message              |
| `user`     | UserDto      | Information of the leaving user   |

---

### Get Messages in Channel

#### Request: `RequestGetMessageChannel`
| Field      | Type   | Description                         |
|------------|--------|-------------------------------------|
| `channelId`| string | ID of the channel to get messages from |

#### Response: `ResponseGetMessageChannel`
| Field        | Type          | Description                    |
|--------------|---------------|--------------------------------|
| `messageList`| MessageDto[]  | List of messages in the channel|

---

### Get My Channel List

#### Request: Not applicable for this operation

#### Response: `ResponseMyChannelList`
| Field        | Type          | Description                    |
|--------------|---------------|--------------------------------|
| `channelList`| ChannelDto[]  | List of user's channels        |

---

### View My Channel

#### Request: `RequestMyChannelView`
| Field      | Type   | Description                     |
|------------|--------|---------------------------------|
| `channelId`| string | ID of the user's channel to view |

#### Response: `ResponseMyChannelView`
| Field        | Type          | Description                    |
|--------------|---------------|--------------------------------|
| `channel`    | ChannelDto    | Information of the channel     |
| `userList`   | UserDto[]     | List of users in the channel   |
| `messageList`| MessageDto[]  | List of messages in the channel|

---

### Send Message in Channel

#### Request: `RequestSendMessageChannel`
| Field      | Type   | Description                        |
|------------|--------|------------------------------------|
| `channelId`| string | ID of the channel to send message  |
| `message`  | string | The message content to be sent     |

#### Response: `ResponseSendMessageChannel`
| Field     | Type        | Description                        |
|-----------|-------------|------------------------------------|
| `message` | MessageDto  | Information of the sent message    |
| `user`    | UserDto     | Information of the user who sent the message |

