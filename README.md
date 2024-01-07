+----------------------+     +----------------------+     +----------------------+
|        User          |     |      ChatRoom        |     |       Message        |
+----------------------+     +----------------------+     +----------------------+
| UserID (PK)          |     | RoomID (PK)          |     | MessageID (PK)       |
| Username             |     | RoomName             |     | Content              |
| Email                |     | Description          |     | SenderID (FK)        |
| Password             |     | CreatedAt            |     | RoomID (FK)          |
| ...                  |     | UpdatedAt            |     | Timestamp            |
+----------------------+     +----------------------+     +----------------------+
