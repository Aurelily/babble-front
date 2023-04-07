import React from "react";
import { Image, TouchableOpacity } from "react-native";

import { profilScreenStyle } from "../../styles/profilScreenStyle";

export default function AvatarList({ rootPath, avatarPath, setAvatarPath }) {
  const numAvatars = 24;
  const avatars = [];

  for (let i = 0; i < numAvatars; i++) {
    avatars.push(
      <TouchableOpacity
        style={profilScreenStyle.miniAvatarsBtn}
        key={i}
        onPress={() => {
          setAvatarPath(`avatar-${i}.png`);
        }}
      >
        <Image
          key={i}
          source={{ uri: rootPath + `avatar-${i}.png` }}
          style={profilScreenStyle.miniAvatars}
        />
      </TouchableOpacity>
    );
  }

  return avatars;
}
