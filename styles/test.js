<View
  style={
    status && status2
      ? chatScreensStyles.mmessageWrapper
      : [chatScreensStyles.mmessageWrapper, { alignItems: "flex-end" }]
  }
>
  <View style={{ flexDirection: "row", alignItems: "center" }}>
    {status && status2 ? (
      <>
        <Image
          source={{ uri: rootPath + item.id_author.avatarPath }}
          style={chatScreensStyles.mavatarYou}
        />
        <View style={chatScreensStyles.messageOther}>
          <Text style={genStyles.basicPurpleText}>{item.content}</Text>
          <Text
            style={[genStyles.basicPurpleText, chatScreensStyles.messageAuthor]}
          >
            Par: {messageCreator}
          </Text>
          <Text
            style={[genStyles.basicPurpleText, chatScreensStyles.messageDate]}
          >
            {formattedDate}
          </Text>
        </View>
      </>
    ) : (
      <>
        <View style={chatScreensStyles.messageCreator}>
          <Text style={genStyles.basicClearText}>{item.content}</Text>
          <Text
            style={[genStyles.basicClearText, chatScreensStyles.messageAuthor]}
          >
            Par: {messageCreator}
          </Text>
          <Text
            style={[genStyles.basicClearText, chatScreensStyles.messageDate]}
          >
            {formattedDate}
          </Text>
        </View>
        <Image
          source={{ uri: rootPath + item.id_author.avatarPath }}
          style={chatScreensStyles.mavatarMe}
        />
      </>
    )}
  </View>
</View>;
